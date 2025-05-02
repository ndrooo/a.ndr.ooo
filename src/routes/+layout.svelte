<script lang="ts">
	import '@fontsource-variable/atkinson-hyperlegible-mono';
	import '@fontsource-variable/atkinson-hyperlegible-next';
	import '../app.css';
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();
</script>

<div class="content-box">
	<Nav />
	<main>
		{@render children()}
	</main>
</div>
