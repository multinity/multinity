<script lang="ts">
	import { siteConfig } from '#lib/config/site.js';

	let { type }: { type: 'copydrop' | 'wallet' } = $props();
</script>

{#if type === 'copydrop'}
	<div class="product-visual copydrop" aria-hidden="true">
		<div class="window-bar">
			<i></i><i></i><i></i><span>{siteConfig.productVisuals.copydrop.channelLabel}</span>
		</div>
		<div class="copy-body">
			<div class="device device-a">
				<span>{siteConfig.productVisuals.copydrop.devices[0].number}</span>
				<b>{siteConfig.productVisuals.copydrop.devices[0].name}</b>
				<i>{siteConfig.productVisuals.copydrop.devices[0].status}</i>
			</div>
			<div class="transfer-line">
				<i></i><span>{siteConfig.productVisuals.copydrop.transferLabel}</span>
			</div>
			<div class="device device-b">
				<span>{siteConfig.productVisuals.copydrop.devices[1].number}</span>
				<b>{siteConfig.productVisuals.copydrop.devices[1].name}</b>
				<i>{siteConfig.productVisuals.copydrop.devices[1].status}</i>
			</div>
		</div>
		<div class="message">
			<span>{siteConfig.productVisuals.copydrop.message}</span>
			<b>{siteConfig.productVisuals.copydrop.confirmation}</b>
		</div>
	</div>
{:else}
	<div class="product-visual wallet" aria-hidden="true">
		<div class="wallet-head">
			<span>{siteConfig.productVisuals.wallet.period}</span>
			<b>{siteConfig.productVisuals.wallet.menuLabel}</b>
		</div>
		<div class="balance">
			<small>{siteConfig.productVisuals.wallet.balanceLabel}</small>
			<strong>{siteConfig.productVisuals.wallet.balance}</strong>
			<span>{siteConfig.productVisuals.wallet.change}</span>
		</div>
		<div class="chart">
			{#each siteConfig.productVisuals.wallet.chart as height, index (index)}
				<i style={`--bar: ${height}%`}></i>
			{/each}
		</div>
		<div class="wallet-row">
			<span>{siteConfig.productVisuals.wallet.dateLabel}</span>
			<b>{siteConfig.productVisuals.wallet.transactionLabel}</b>
			<strong>{siteConfig.productVisuals.wallet.amount}</strong>
		</div>
	</div>
{/if}

<style>
	.product-visual {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-panel);
		position: relative;
		overflow: hidden;
		width: 100%;
		min-height: clamp(380px, 30vw, 420px);
		border: 1px solid color-mix(in srgb, currentColor 38%, transparent);
		background: var(--color-on-inverse);
		color: var(--color-inverse);
		transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.window-bar,
	.wallet-head,
	.wallet-row {
		display: flex;
		align-items: center;
		height: 56px;
		flex-shrink: 0;
		padding: 0 1.3rem;
		border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.window-bar i {
		width: 6px;
		height: 6px;
		margin-right: 5px;
		border: 1px solid currentColor;
		border-radius: 50%;
	}

	.window-bar span {
		margin-left: auto;
	}

	.copy-body {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.65fr) minmax(0, 1fr);
		align-items: center;
		padding: 1.5rem;
	}

	.device {
		border-radius: var(--radius-inset);
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 1.25rem;
		border: 1px solid currentColor;
	}

	.device span,
	.device i {
		font-size: 0.56rem;
		font-style: normal;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.device b {
		margin: 2.6rem 0 0.5rem;
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 600;
		letter-spacing: -0.04em;
	}

	.transfer-line {
		position: relative;
		display: flex;
		align-items: center;
		height: 1px;
		background: currentColor;
	}

	.transfer-line i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: currentColor;
		animation: transfer 2.8s ease-in-out infinite;
	}

	.transfer-line span {
		white-space: nowrap;
		position: absolute;
		top: -24px;
		left: 50%;
		font-size: 0.5rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transform: translateX(-50%);
	}

	.message {
		border-radius: var(--radius-inset);
		margin: 0 1.5rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid currentColor;
		font-size: 0.72rem;
	}

	.wallet-head {
		justify-content: space-between;
	}

	.balance {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
	}

	.balance small,
	.balance span {
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.balance strong {
		margin: 0.65rem 0;
		font-size: clamp(2.2rem, 5vw, 3rem);
		line-height: 1;
		font-weight: 500;
		letter-spacing: -0.07em;
	}

	.chart {
		display: flex;
		align-items: end;
		gap: clamp(6px, 1vw, 12px);
		height: 120px;
		padding: 0 1.5rem;
	}

	.chart i {
		border-radius: var(--radius-pill) var(--radius-pill) 0 0;
		flex: 1;
		height: var(--bar);
		border: 1px solid currentColor;
		border-bottom: 0;
		background: color-mix(in srgb, currentColor 12%, transparent);
	}

	.wallet-row {
		margin-top: auto;
		justify-content: space-between;
		border-top: 1px solid color-mix(in srgb, currentColor 18%, transparent);
		border-bottom: 0;
	}

	.wallet-row b {
		font-weight: 400;
		opacity: 0.6;
	}

	@keyframes transfer {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(calc(100% + 65px));
		}
	}

	@media (max-width: 560px) {
		.copy-body {
			grid-template-columns: minmax(0, 1fr) 45px minmax(0, 1fr);
		}

		.device {
			padding: 0.7rem;
		}

		.device b {
			margin-top: 1.8rem;
		}

		.wallet-row b {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.transfer-line i {
			animation: none;
		}
	}
</style>
