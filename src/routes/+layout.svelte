<script lang="ts">
	import '@fontsource-variable/atkinson-hyperlegible-mono';
	import '@fontsource-variable/atkinson-hyperlegible-next';
	import '@fontsource-variable/besley';
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children } = $props();
</script>

<div class="sidebar-wrapper">
	<Header class="sidebar"/>
	<div class="sidebar-content">
		<div class="content text-container">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.content {
		margin-inline: auto;
		max-inline-size: 60ch;
		padding: var(--s1) 3rem;
		box-shadow:
			26px 26px 52px #040507,
			-26px -26px 52px #12151d;
	}
</style>
