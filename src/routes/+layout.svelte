<script lang="ts">
	import '@fontsource-variable/atkinson-hyperlegible-mono';
	import '@fontsource-variable/atkinson-hyperlegible-next';
	import '../app.css';
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();
</script>

<div class="content">
	<Nav />
	{@render children()}
</div>

<style>
	.content {
		margin-inline: auto;
		max-inline-size: 80ch;
		padding: var(--s1) var(--s3);
	}
</style>
