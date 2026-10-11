<script lang="ts">
	import blackLogo from '#lib/assets/multinity.black.svg';
	import whiteLogo from '#lib/assets/multinity.white.svg';

	let {
		inverse = false,
		class: className = ''
	}: {
		inverse?: boolean;
		class?: string;
	} = $props();
</script>

<span class:inverse class={`official-logo ${className}`} aria-hidden="true">
	<img class="logo-black" src={blackLogo} alt="" />
	<img class="logo-white" src={whiteLogo} alt="" />
</span>

<style>
	.official-logo {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 2 / 1;
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		opacity: 0;
		transition: opacity 350ms ease;
	}

	:global(.app-shell[data-theme='light']) .official-logo:not(.inverse) .logo-black,
	:global(.app-shell[data-theme='dark']) .official-logo:not(.inverse) .logo-white,
	:global(.app-shell[data-theme='light']) .official-logo.inverse .logo-white,
	:global(.app-shell[data-theme='dark']) .official-logo.inverse .logo-black {
		opacity: 1;
	}
</style>
