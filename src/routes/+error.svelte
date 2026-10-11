<script lang="ts">
	import { page } from '$app/state';
	import RouteSignalVisual from '#lib/components/RouteSignalVisual.svelte';
	import ArrowLink from '#lib/components/ArrowLink.svelte';
	import { siteConfig } from '#lib/config/site.js';

	const isNotFound = $derived(page.status === 404);
	const content = $derived(isNotFound ? siteConfig.error.notFound : siteConfig.error.generic);
</script>

<svelte:head>
	<title
		>{isNotFound ? content.title : `${page.status} — ${content.title}`} | {siteConfig.name}</title
	>
	<meta name="description" content={content.description} />
	<meta name="robots" content="noindex" />
	<style>
		html,
		body {
			overflow: hidden !important;
			height: 100% !important;
			overscroll-behavior: none !important;
		}
	</style>
</svelte:head>

<main id={siteConfig.anchors.main} class="error-page">
	<section aria-labelledby="error-heading">
		<RouteSignalVisual label={content.visual.label} />

		<div class="error-copy">
			<h1 id="error-heading">{content.heading}</h1>
			<p>{content.message}</p>
			<ArrowLink href={siteConfig.error.homeHref} label={siteConfig.error.labels.returnHome} />
		</div>
	</section>
</main>

<style>
	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100svh;
		height: 100dvh;
		min-height: 100svh;
		min-height: 100dvh;
		overflow: hidden;
		padding-top: var(--header-height);
		padding-inline: var(--page-gutter);
		padding-bottom: 2rem;
		box-sizing: border-box;
		background: var(--color-canvas);
		color: var(--color-ink);
	}

	section {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: clamp(2rem, 4vw, 4rem);
		align-items: center;
		width: min(100%, 1280px);
	}

	section :global(.route-signal) {
		grid-column: 2;
		grid-row: 1;
	}

	.error-copy {
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		grid-column: 1;
		grid-row: 1;
	}

	h1 {
		margin: 0;
		font-size: clamp(3.2rem, 6vw, 6.2rem);
		font-weight: 550;
		line-height: 1;
		letter-spacing: -0.06em;
	}

	p {
		max-width: 46ch;
		margin: 1.25rem 0 2rem;
		color: var(--color-muted);
		font-size: 1rem;
		line-height: 1.65;
	}

	@media (max-width: 760px) {
		.error-page {
			padding-top: calc(var(--header-height) + 1rem);
			padding-bottom: 1.5rem;
		}

		section {
			grid-template-columns: minmax(0, 1fr);
			gap: 1.5rem;
		}

		.error-copy {
			grid-column: 1;
			grid-row: 2;
			align-items: center;
			text-align: center;
		}

		section :global(.route-signal) {
			grid-column: 1;
			grid-row: 1;
		}

		h1 {
			font-size: clamp(2.4rem, 8vw, 3.5rem);
		}

		p {
			max-width: 36ch;
			margin: 0.85rem 0 1.5rem;
			font-size: 0.95rem;
		}
	}
</style>
