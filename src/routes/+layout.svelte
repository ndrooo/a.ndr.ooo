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
		max-inline-size: 75ch;
		padding-block: var(--s1);
		padding-inline: clamp(var(--s0), 5vw, var(--s3));
	}
</style>
