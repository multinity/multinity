export const motionConfig = {
	sculpture: {
		travel: 12,
		lift: 8,
		scale: 1.025,
		response: 180,
		sheenDuration: 8000
	},
	themeSwitch: {
		duration: 420,
		rotation: 360,
		pageDuration: 650,
		easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
	},
	interaction: {
		duration: 180,
		pressDuration: 100,
		easing: 'cubic-bezier(0.2, 0, 0, 1)',
		hoverLift: '-1px',
		hoverOpacity: 0.88,
		pressScale: 0.98
	},
	reveal: {
		duration: 950,
		distance: 28,
		delay: 0,
		scale: 1,
		easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
		viewportInset: 32
	},
	stagger: 110,
	hero: {
		titleDelay: 80,
		artDelay: 180,
		artDuration: 1300,
		artScale: 0.94,
		drift: 60,
		mobileDrift: 20,
		settleTime: 120
	},
	card: { duration: 1100, distance: 40, scale: 0.98 }
} as const;

const interaction = motionConfig.interaction;
export const interactionVariables = [
	`--control-duration: ${interaction.duration}ms`,
	`--control-press-duration: ${interaction.pressDuration}ms`,
	`--control-easing: ${interaction.easing}`,
	`--control-hover-lift: ${interaction.hoverLift}`,
	`--control-hover-opacity: ${interaction.hoverOpacity}`,
	`--control-press-scale: ${interaction.pressScale}`
].join('; ');
