<script lang="ts">
	import Hero from '#lib/components/Hero.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { siteConfig } from '#lib/config/site.js';
</script>

<main id={siteConfig.anchors.main}>
	<Hero />
</main>

<SiteFooter />
