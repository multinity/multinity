<script lang="ts">
	import SectionLabel from './SectionLabel.svelte';
	import ProductCard from './ProductCard.svelte';
	import { reveal } from '#lib/actions/reveal.js';
	import { motionConfig } from '#lib/config/motion.js';
	import { siteConfig } from '#lib/config/site.js';
</script>

<section id={siteConfig.anchors.portfolio} class="portfolio">
	<div class="section-shell site-container">
		<div class="portfolio-head">
			<div use:reveal>
				<SectionLabel
					number={siteConfig.portfolio.section.number}
					label={siteConfig.portfolio.section.label}
					inverse
				/>
			</div>
			<div use:reveal={{ delay: motionConfig.stagger }}>
				<h2>{siteConfig.portfolio.title}<br />{siteConfig.portfolio.titleLineTwo}</h2>
				<p>{siteConfig.portfolio.description}</p>
			</div>
		</div>

		<div class="product-grid">
			{#each siteConfig.portfolio.products as product, index (product.key)}
				<ProductCard
					entranceDelay={index * motionConfig.stagger}
					number={product.number}
					name={product.name}
					description={product.description}
					href={product.href}
					type={product.type}
					statusLabel={product.statusLabel}
					actionLabel={product.actionLabel}
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	.portfolio {
		background: var(--color-inverse);
		color: var(--color-on-inverse);
	}

	.section-shell {
		padding-block: var(--section-space);
	}

	.portfolio-head {
		display: grid;
		grid-template-columns: minmax(0, 0.7fr) minmax(0, 2fr);
		gap: 2rem;
		margin-bottom: var(--section-space);
	}

	h2 {
		margin: 0;
		font-size: clamp(3.1rem, 7.5vw, 7.6rem);
		font-weight: 550;
		line-height: 0.88;
		letter-spacing: -0.075em;
	}

	.portfolio-head p {
		margin: 2rem 0 0;
		color: color-mix(in srgb, var(--color-on-inverse) 60%, transparent);
		font-size: 1rem;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--layout-gap);
	}

	@media (max-width: 760px) {
		.portfolio-head {
			grid-template-columns: minmax(0, 1fr);
			gap: 3rem;
		}

		.product-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--section-space);
		}
	}

	@media (max-width: 400px) {
		h2 {
			font-size: clamp(2.3rem, 11.5vw, 3.1rem);
		}
	}
</style>
