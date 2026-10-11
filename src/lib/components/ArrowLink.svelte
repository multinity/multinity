<script lang="ts">
	import Icon from './Icon.svelte';
	let {
		href,
		label,
		external = false
	}: { href: string; label: string; external?: boolean } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	class="control-feedback"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noreferrer' : undefined}
>
	<span>{label}</span>
	<Icon name="arrow" />
</a>

<style>
	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		min-height: 48px;
		max-width: 100%;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-pill);
		background: var(--action-background, var(--color-ink));
		color: var(--action-foreground, var(--color-canvas));
		font-size: 0.875rem;
		font-weight: 650;
		text-decoration: none;
		letter-spacing: 0.02em;
	}
</style>
