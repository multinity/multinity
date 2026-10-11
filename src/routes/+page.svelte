<<<<<<< HEAD
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
=======
<script lang="ts">
	import Hero from '#lib/components/Hero.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { siteConfig } from '#lib/config/site.js';
</script>

<main id={siteConfig.anchors.main}>
	<Hero />
</main>

<SiteFooter />
>>>>>>> dev
