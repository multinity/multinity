<script lang="ts">
	import Hero from '#lib/components/Hero.svelte';
	import Services from '#lib/components/Services.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { siteConfig } from '#lib/config/site.js';
</script>

<main id={siteConfig.anchors.main}>
	<Hero />
	<Services />
</main>

<SiteFooter />
