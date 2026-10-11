export interface GyroTiltOptions {
	onTilt: (x: number, y: number) => void;
	onReset?: () => void;
	isActive?: () => boolean;
}

/**
 * Shared action for 3D interactive tilt responding to both:
 * 1. Global desktop mouse pointer movement across the viewport
 * 2. Mobile device gyroscope (DeviceOrientationEvent) with exponential low-pass filter
 */
export function gyroTilt(node: HTMLElement, options: GyroTiltOptions) {
	const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
	let baselineBeta: number | null = null;
	let baselineGamma: number | null = null;
	let gyroCleanup: (() => void) | null = null;
	let resizeObserver: ResizeObserver | null = null;
	let pointerFrame = 0;
	let pendingPointer: [number, number] | null = null;
	let bounds = node.getBoundingClientRect();
	let smoothX = 0;
	let smoothY = 0;
	const GYRO_ALPHA = 0.08;
	const GYRO_RANGE = 55;
	const updateBounds = () => {
		bounds = node.getBoundingClientRect();
	};

	function isEnabled() {
		if (motion.matches || document.hidden) return false;
		return options.isActive ? options.isActive() : true;
	}

	function handleGlobalMove(e: PointerEvent) {
		if (e.pointerType === 'touch' || !isEnabled()) return;
		const centerX = bounds.left + bounds.width / 2;
		const centerY = bounds.top + bounds.height / 2;
		const x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
		const y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));
		pendingPointer = [x, y];
		if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
	}

	function applyPointer() {
		pointerFrame = 0;
		if (!pendingPointer || !isEnabled()) return;
		options.onTilt(...pendingPointer);
		pendingPointer = null;
	}

	function handleGlobalLeave() {
		pendingPointer = null;
		cancelAnimationFrame(pointerFrame);
		pointerFrame = 0;
		options.onReset?.();
	}

	function startGyroListener() {
		const handleOrientation = (e: DeviceOrientationEvent) => {
			if (!isEnabled()) return;
			if (e.beta === null || e.gamma === null) return;

			if (baselineBeta === null) baselineBeta = e.beta;
			if (baselineGamma === null) baselineGamma = e.gamma;

			const angle = screen.orientation?.angle ?? 0;
			let rawX: number, rawY: number;
			if (angle === 90) {
				rawX = -(e.beta - baselineBeta);
				rawY = e.gamma - baselineGamma;
			} else if (angle === 270 || angle === -90) {
				rawX = e.beta - baselineBeta;
				rawY = -(e.gamma - baselineGamma);
			} else {
				// Portrait
				rawX = e.gamma - baselineGamma;
				rawY = e.beta - baselineBeta;
			}

			const targetX = Math.max(-1, Math.min(1, rawX / GYRO_RANGE));
			const targetY = Math.max(-1, Math.min(1, rawY / GYRO_RANGE));

			smoothX += GYRO_ALPHA * (targetX - smoothX);
			smoothY += GYRO_ALPHA * (targetY - smoothY);

			options.onTilt(smoothX, smoothY);
		};

		const handleOrientationChange = () => {
			baselineBeta = null;
			baselineGamma = null;
		};

		window.addEventListener('deviceorientation', handleOrientation);
		window.addEventListener('orientationchange', handleOrientationChange);
		gyroCleanup = () => {
			window.removeEventListener('deviceorientation', handleOrientation);
			window.removeEventListener('orientationchange', handleOrientationChange);
		};
	}

	async function setupGyro() {
		type DOEP = typeof DeviceOrientationEvent & {
			requestPermission?: () => Promise<'granted' | 'denied'>;
		};
		const DOEC = DeviceOrientationEvent as DOEP;

		if (typeof DOEC.requestPermission === 'function') {
			const requestOnFirstTouch = async () => {
				try {
					const result = await DOEC.requestPermission!();
					if (result === 'granted') startGyroListener();
				} catch {
					// Permission denied or not supported
				}
			};
			document.addEventListener('touchstart', requestOnFirstTouch, { once: true });
		} else {
			const isSecure =
				location.protocol === 'https:' ||
				location.hostname === 'localhost' ||
				location.hostname === '127.0.0.1';

			if (!isSecure) return;

			if ('permissions' in navigator) {
				try {
					const status = await (
						navigator.permissions as unknown as {
							query: (d: { name: string }) => Promise<{ state: string }>;
						}
					).query({ name: 'gyroscope' });
					if (status.state === 'denied') return;
				} catch {
					// Proceed anyway if permission name is not recognized
				}
			}

			startGyroListener();
		}
	}

	const handleVisibility = () => {
		if (!document.hidden) {
			baselineBeta = null;
			baselineGamma = null;
		}
	};

	document.addEventListener('pointermove', handleGlobalMove);
	document.addEventListener('pointerleave', handleGlobalLeave);
	document.addEventListener('visibilitychange', handleVisibility);
	window.addEventListener('scroll', updateBounds, { passive: true });
	if ('ResizeObserver' in window) {
		resizeObserver = new ResizeObserver(() => {
			updateBounds();
		});
		resizeObserver.observe(node);
	}

	const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
	if (isCoarsePointer && 'DeviceOrientationEvent' in window) {
		setupGyro();
	}

	return {
		update(newOptions: GyroTiltOptions) {
			options = newOptions;
		},
		recalibrate() {
			baselineBeta = null;
			baselineGamma = null;
		},
		destroy() {
			cancelAnimationFrame(pointerFrame);
			resizeObserver?.disconnect();
			document.removeEventListener('pointermove', handleGlobalMove);
			document.removeEventListener('pointerleave', handleGlobalLeave);
			document.removeEventListener('visibilitychange', handleVisibility);
			window.removeEventListener('scroll', updateBounds);
			gyroCleanup?.();
		}
	};
}
