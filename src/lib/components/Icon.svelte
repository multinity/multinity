<script lang="ts">
	let { name, active = false }: { name: 'sun' | 'moon' | 'arrow' | 'menu'; active?: boolean } =
		$props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
	class:active
>
	{#if name === 'sun'}
		<circle cx="12" cy="12" r="3.75" />
		<path
			d="M12 2.5v2m0 15v2M2.5 12h2m15 0h2M5.28 5.28l1.41 1.41m10.62 10.62 1.41 1.41M5.28 18.72l1.41-1.41M17.31 6.69l1.41-1.41"
		/>
	{:else if name === 'moon'}
		<path d="M20.5 13.4A8.7 8.7 0 0 1 10.6 3.5a8.6 8.6 0 1 0 9.9 9.9Z" />
	{:else if name === 'arrow'}
		<path d="M4.5 12h15m-6-6 6 6-6 6" />
	{:else}
		<path class="menu-top" d="M4 8.5h16" />
		<path class="menu-bottom" d="M4 15.5h16" />
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}
	.menu-top,
	.menu-bottom {
		transform-origin: 12px 12px;
		transition: transform var(--control-duration) var(--control-easing);
	}
	.active .menu-top {
		transform: rotate(45deg) translateY(3.5px);
	}
	.active .menu-bottom {
		transform: rotate(-45deg) translateY(-3.5px);
	}
</style>
