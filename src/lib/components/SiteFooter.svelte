<script lang="ts">
	import BrandMark from './BrandMark.svelte';
	import Icon from './Icon.svelte';
	import { reveal } from '#lib/actions/reveal.js';
	import { motionConfig } from '#lib/config/motion.js';
	import { siteConfig } from '#lib/config/site.js';

	let subscribed = $state(false);
	let email = $state('');

	function subscribe(event: SubmitEvent) {
		event.preventDefault();
		if (email) subscribed = true;
	}
</script>

<footer>
	<div class="footer-shell site-container">
		<div class="footer-top">
			<div class="footer-pitch" use:reveal>
				<BrandMark inverse />
				<h2>{siteConfig.footer.title}<br />{siteConfig.footer.titleLineTwo}</h2>
			</div>

			<div class="subscribe" use:reveal={{ delay: motionConfig.stagger }}>
				<p>{siteConfig.footer.subscribeDescription}</p>
				{#if subscribed}
					<div class="success" role="status">{siteConfig.footer.successMessage}</div>
				{:else}
					<form onsubmit={subscribe}>
						<label for="email">{siteConfig.footer.subscribeLabel}</label>
						<div class="input-row">
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder={siteConfig.footer.emailPlaceholder}
								required
							/>
							<button type="submit" aria-label={siteConfig.footer.submitLabel}>
								<Icon name="arrow" />
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>

		<div class="footer-bottom" use:reveal>
			<span>{siteConfig.footer.copyright}</span>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={siteConfig.footer.backToTopHref}>{siteConfig.footer.backToTopLabel}</a>
		</div>
	</div>
</footer>

<style>
	footer {
		--control-focus-color: var(--color-on-inverse);
		background: var(--color-inverse);
		color: var(--color-on-inverse);
	}

	.footer-shell {
		padding-block: var(--section-space) 2rem;
	}

	.footer-top {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
		gap: var(--layout-gap);
		padding-bottom: var(--section-space);
	}

	h2 {
		margin: 2rem 0 0;
		font-size: clamp(3.4rem, 7vw, 8rem);
		font-weight: 550;
		line-height: 0.86;
		letter-spacing: -0.075em;
	}

	.subscribe {
		min-width: 0;
		align-self: end;
		width: min(100%, 450px);
		justify-self: end;
	}

	.subscribe p {
		max-width: 36ch;
		margin: 0 0 2rem;
		color: color-mix(in srgb, var(--color-on-inverse) 64%, transparent);
		line-height: 1.55;
	}

	label {
		display: block;
		margin-bottom: 0.8rem;
		font-size: 0.66rem;
		font-weight: 650;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.input-row {
		display: flex;
		align-items: center;
		padding: 4px;
		border: 1px solid color-mix(in srgb, var(--color-on-inverse) 55%, transparent);
		border-radius: var(--radius-pill);
	}

	.input-row:focus-within {
		outline: 2px solid currentColor;
		outline-offset: 1px;
	}

	input {
		flex: 1;
		min-width: 0;
		height: 44px;
		padding: 0 0.75rem;
		border-radius: var(--radius-pill);
		border: 0;
		outline: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 1.1rem;
	}

	input::placeholder {
		color: color-mix(in srgb, var(--color-on-inverse) 45%, transparent);
	}

	button {
		display: grid;
		place-items: center;
		padding: 0;
		flex-shrink: 0;
		border-radius: var(--radius-pill);
		width: 44px;
		height: 44px;
		border: 0;
		background: var(--color-on-inverse);
		color: var(--color-inverse);
		cursor: pointer;
	}

	.success {
		padding: 1rem 1.25rem;
		border: 1px solid color-mix(in srgb, var(--color-on-inverse) 55%, transparent);
		border-radius: var(--radius-inset);
	}

	.footer-bottom {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid color-mix(in srgb, var(--color-on-inverse) 22%, transparent);
		color: color-mix(in srgb, var(--color-on-inverse) 55%, transparent);
		font-size: 0.65rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.footer-bottom a {
		justify-self: end;
		color: inherit;
		text-decoration: none;
	}

	.footer-bottom a:hover {
		opacity: 0.6;
	}

	@media (max-width: 760px) {
		.footer-top {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--layout-gap);
		}

		.subscribe {
			justify-self: start;
		}

		.footer-bottom {
			grid-template-columns: minmax(0, 1fr) auto;
			line-height: 1.5;
		}

		.footer-bottom span:nth-child(2) {
			display: none;
		}
	}

	@media (max-width: 400px) {
		h2 {
			font-size: clamp(2.5rem, 12vw, 3.4rem);
		}
	}
</style>
