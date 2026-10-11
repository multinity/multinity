<script lang="ts">
	import { siteConfig } from '#lib/config/site.js';

	let open = $state(false);
	let buttonEl: HTMLButtonElement;

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
			buttonEl?.focus();
		}
	}

	const products = siteConfig.portfolio.products;

	// Emoji/icon map per product type (purely decorative, aria-hidden)
	const iconMap: Record<string, string> = {
		copydrop: '⇄',
		wallet: '₹'
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Click-outside overlay -->
{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="overlay" onclick={close} aria-hidden="true"></div>
{/if}

<div class="app-grid-wrap">
	<button
		bind:this={buttonEl}
		type="button"
		id="app-grid-button"
		class="app-grid-button"
		class:active={open}
		onclick={toggle}
		aria-label={open ? 'Close products menu' : 'Open products menu'}
		aria-expanded={open}
		aria-haspopup="menu"
	>
		<span class="dots-grid" aria-hidden="true">
			{#each Array(9) as _, i (i)}
				<span class="dot" style="--i: {i}"></span>
			{/each}
		</span>
	</button>

	{#if open}
		<div
			class="app-panel"
			role="menu"
			aria-label="Products"
			aria-labelledby="app-grid-button"
		>
			<p class="panel-heading">Products</p>
			<ul class="product-list">
				{#each products as product (product.key)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<li role="none">
						<a
							href={product.href}
							class="product-item control-feedback"
							role="menuitem"
							onclick={close}
						>
							<span class="product-icon" aria-hidden="true">{iconMap[product.type] ?? '○'}</span>
							<span class="product-meta">
								<span class="product-name">{product.name}</span>
								<span class="product-status">
									<span class="status-dot" aria-hidden="true"></span>
									{product.statusLabel}
								</span>
							</span>
							<span class="product-arrow" aria-hidden="true">↗</span>
						</a>
					</li>
				{/each}

				<li role="none">
					<a
						href={siteConfig.navigation.items[0].href}
						class="product-item product-item--all control-feedback"
						role="menuitem"
						onclick={close}
					>
						<span class="product-icon" aria-hidden="true">⊞</span>
						<span class="product-meta">
							<span class="product-name">All products</span>
							<span class="product-sub">View full portfolio</span>
						</span>
						<span class="product-arrow" aria-hidden="true">↗</span>
					</a>
				</li>
			</ul>
		</div>
	{/if}
</div>

<style>
	.app-grid-wrap {
		position: relative;
	}

	/* ── Button ─────────────────────────────────────────── */
	.app-grid-button {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		flex: 0 0 44px;
		padding: 0;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-pill);
		background: transparent;
		color: inherit;
		cursor: pointer;
		transition:
			background-color 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease;
	}

	.app-grid-button.active,
	.app-grid-button:hover {
		background: color-mix(in srgb, var(--color-ink) 6%, transparent);
		border-color: color-mix(in srgb, var(--color-ink) 28%, transparent);
	}

	/* ── 9-dot grid ─────────────────────────────────────── */
	.dots-grid {
		display: grid;
		grid-template-columns: repeat(3, 4px);
		grid-template-rows: repeat(3, 4px);
		gap: 3px;
	}

	.dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: currentColor;
		opacity: 0.65;
		transition:
			opacity 200ms ease calc(var(--i) * 18ms),
			transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 18ms);
	}

	.active .dot {
		opacity: 1;
		transform: scale(1.25);
	}

	/* ── Overlay ─────────────────────────────────────────── */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 98;
	}

	/* ── Panel ───────────────────────────────────────────── */
	.app-panel {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		z-index: 99;
		min-width: 240px;
		padding: 0.5rem;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-panel);
		background: color-mix(in srgb, var(--color-canvas) 92%, transparent);
		backdrop-filter: blur(22px);
		box-shadow:
			0 4px 6px -1px color-mix(in srgb, var(--color-ink) 8%, transparent),
			0 16px 32px -8px color-mix(in srgb, var(--color-ink) 12%, transparent);
		animation: panel-in 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
		transform-origin: top right;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(-6px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.panel-heading {
		margin: 0 0 0.25rem;
		padding: 0.4rem 0.75rem 0.5rem;
		border-bottom: 1px solid var(--color-hairline);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-ink) 48%, transparent);
	}

	.product-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	/* ── Product row ─────────────────────────────────────── */
	.product-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem;
		border-radius: calc(var(--radius-panel) - 4px);
		text-decoration: none;
		color: var(--color-ink);
		transition:
			background-color 140ms ease,
			translate var(--control-duration) var(--control-easing);
	}

	.product-item:hover {
		background: color-mix(in srgb, var(--color-ink) 7%, transparent);
		translate: 0 0 !important; /* override layout.css lift */
	}

	.product-icon {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		flex-shrink: 0;
		border-radius: 8px;
		border: 1px solid var(--color-hairline);
		background: color-mix(in srgb, var(--color-ink) 5%, transparent);
		font-size: 1rem;
		line-height: 1;
	}

	.product-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.product-name {
		font-size: 0.85rem;
		font-weight: 580;
		letter-spacing: -0.02em;
		color: var(--color-ink);
		line-height: 1.2;
	}

	.product-status,
	.product-sub {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.68rem;
		letter-spacing: 0.01em;
		color: color-mix(in srgb, var(--color-ink) 52%, transparent);
	}

	.status-dot {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
		animation: pulse 1.8s ease-in-out infinite;
	}

	.product-arrow {
		font-size: 0.8rem;
		opacity: 0;
		transform: translateX(-4px);
		transition:
			opacity 160ms ease,
			transform 160ms ease;
		color: color-mix(in srgb, var(--color-ink) 52%, transparent);
		flex-shrink: 0;
	}

	.product-item:hover .product-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	/* "All products" separator row */
	.product-item--all {
		margin-top: 4px;
		border-top: 1px solid var(--color-hairline);
		border-radius: 0 0 calc(var(--radius-panel) - 4px) calc(var(--radius-panel) - 4px);
		padding-top: 0.75rem;
	}

	@keyframes pulse {
		50% {
			opacity: 0.28;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			transition: none;
		}
		.app-panel {
			animation: none;
		}
		.status-dot {
			animation: none;
		}
		.product-arrow {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
