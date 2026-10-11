<script lang="ts">
	import { reveal } from '#lib/actions/reveal.js';
	import { motionConfig } from '#lib/config/motion.js';
	import { siteConfig } from '#lib/config/site.js';
	import SectionLabel from './SectionLabel.svelte';
</script>

<section id={siteConfig.anchors.services} class="services" aria-labelledby="services-title">
	<div class="services-shell site-container">
		<div class="services-intro" use:reveal>
			<SectionLabel number="02" label="Services" />
			<h2 id="services-title">Technology that helps people move forward.</h2>
			<p>
				From finding information to protecting it, we create clear digital systems for the work that
				matters.
			</p>
		</div>

		<div class="service-grid">
			{#each siteConfig.services as service, index (service.number)}
				<article use:reveal={{ delay: index * motionConfig.stagger }}>
					<div class="service-top">
						<span>{service.number}</span>
						<span class="service-mark" aria-hidden="true">↗</span>
					</div>
					<h3>{service.name}</h3>
					<p>{service.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.services {
		background: var(--color-canvas);
		color: var(--color-ink);
	}

	.services-shell {
		padding-block: var(--section-space);
	}

	.services-intro {
		display: grid;
		grid-template-columns: minmax(0, 0.7fr) minmax(0, 2fr);
		column-gap: 2rem;
		padding-bottom: var(--section-space);
	}

	.services-intro :global(.section-label) {
		align-self: start;
	}

	h2 {
		max-width: 12ch;
		margin: 0;
		font-size: clamp(3rem, 7vw, 7.4rem);
		font-weight: 550;
		line-height: 0.88;
		letter-spacing: -0.075em;
	}

	.services-intro p {
		grid-column: 2;
		max-width: 38ch;
		margin: 2rem 0 0;
		color: var(--color-muted);
		font-size: 1rem;
		line-height: 1.55;
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-top: 1px solid var(--color-hairline);
	}

	article {
		min-height: 250px;
		padding: 1.25rem 1.25rem 1.5rem 0;
		border-bottom: 1px solid var(--color-hairline);
	}

	article:not(:nth-child(3n + 1)) {
		padding-left: 1.25rem;
		border-left: 1px solid var(--color-hairline);
	}

	.service-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 3rem;
		font-size: 0.66rem;
		font-weight: 650;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.service-mark {
		font-size: 1rem;
		letter-spacing: 0;
	}

	h3 {
		max-width: 12ch;
		margin: 0 0 1rem;
		font-size: clamp(1.5rem, 2.8vw, 2.6rem);
		font-weight: 550;
		line-height: 0.95;
		letter-spacing: -0.06em;
	}

	article p {
		max-width: 32ch;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	@media (max-width: 760px) {
		.services-intro {
			grid-template-columns: minmax(0, 1fr);
			row-gap: 2rem;
		}

		.services-intro p {
			grid-column: auto;
			margin-top: 0;
		}

		.service-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		article {
			min-height: 230px;
		}

		article:not(:nth-child(3n + 1)) {
			padding-left: 0;
			border-left: 0;
		}

		article:nth-child(even) {
			padding-left: 1rem;
			border-left: 1px solid var(--color-hairline);
		}
	}

	@media (max-width: 500px) {
		.service-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		article,
		article:not(:nth-child(3n + 1)),
		article:nth-child(even) {
			min-height: 0;
			padding: 1.25rem 0 1.5rem;
			border-left: 0;
		}
	}
</style>
