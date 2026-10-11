<script lang="ts">
	let {
		number,
		label,
		inverse = false
	}: { number: string; label: string; inverse?: boolean } = $props();
</script>

<div class:inverse class="section-label">
	<span>{number}</span>
	<span class="line"></span>
	<span>{label}</span>
</div>

<style>
	.section-label {
		display: grid;
		grid-template-columns: auto minmax(0, 72px) minmax(0, auto);
		align-items: center;
		gap: 0.8rem;
		width: max-content;
		max-width: 100%;
		color: var(--color-muted);
		font-size: 0.7rem;
		font-weight: 650;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.inverse {
		color: color-mix(in srgb, var(--color-on-inverse) 58%, transparent);
	}

	.line {
		height: 1px;
		background: currentColor;
	}
</style>
