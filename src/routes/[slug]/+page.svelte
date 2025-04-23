<script lang="ts">
  const { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.title} />
</svelte:head>

<h1>{data.title}</h1>

<data.content />