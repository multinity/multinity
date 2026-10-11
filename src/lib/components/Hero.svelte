<script lang="ts">
	import { reveal } from '#lib/actions/reveal.js';
	import { scrollDrift } from '#lib/actions/scrollDrift.js';
	import { motionConfig } from '#lib/config/motion.js';
	import InfinitySculpture from './InfinitySculpture.svelte';
	import { siteConfig } from '#lib/config/site.js';
</script>

<section id={siteConfig.anchors.top} class="hero">
	<div class="hero-inner site-container">
		<div class="hero-title">
			<h1>
				<span use:reveal={{ delay: motionConfig.hero.titleDelay }}>{siteConfig.hero.title}</span>
				<em use:reveal={{ delay: motionConfig.hero.titleDelay + motionConfig.stagger }}
					>{siteConfig.hero.emphasis}</em
				>
			</h1>
		</div>

		<div class="hero-art" use:scrollDrift>
			<div
				use:reveal={{
					delay: motionConfig.hero.artDelay,
					duration: motionConfig.hero.artDuration,
					scale: motionConfig.hero.artScale
				}}
			>
				<InfinitySculpture />
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100svh;
		padding-top: var(--header-height);
		background: var(--color-canvas);
		color: var(--color-ink);
	}

	.hero-inner {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
		align-items: center;
		min-height: calc(100svh - var(--header-height));
		padding-block: var(--layout-gap);
	}

	.hero-title {
		min-width: 0;
		container-type: inline-size;
	}

	.hero-art {
		min-width: 0;
		translate: 0 var(--scroll-drift, 0px);
	}

	h1 > span {
		display: block;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 14.5cqi, 7.6rem);
		font-weight: 650;
		line-height: 0.95;
		letter-spacing: -0.065em;
		text-transform: uppercase;
	}

	h1 em {
		display: block;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.16em;
		font-weight: 400;
		letter-spacing: -0.075em;
		text-transform: none;
	}

	@media (max-width: 760px) {
		.hero-inner {
			grid-template-columns: minmax(0, 1fr);
			align-content: center;
			gap: var(--layout-gap);
		}

		.hero-title {
			width: min(100%, 540px);
			justify-self: center;
			text-align: center;
		}
	}
</style>
