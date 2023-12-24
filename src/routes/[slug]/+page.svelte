<script lang="ts">
  import Header from '$lib/Header.svelte';
  import NavLink from '$lib/NavLink.svelte';
  import SrcLink from '$lib/SrcLink.svelte';

  export let data;
  const { blurb, content, title } = data;
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
</svelte:head>

<Header {title} {blurb}>
  <NavLink href="/">home</NavLink>
  <SrcLink />
</Header>

<svelte:component this={content} />
