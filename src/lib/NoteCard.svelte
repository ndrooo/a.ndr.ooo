<script lang="ts">
  export let title: string;
  export let href: string;
  export let blurb = '';
  export let date = '';
</script>

<a {href}>
  <h3>{title}</h3>
  {#if blurb}
    <p class="blurb">{blurb}</p>
  {/if}
  {#if date}
    <p>Updated {date}</p>
  {/if}
</a>

<style lang="scss">
  a {
    background-color: var(--alt-bg);
    border: 3px solid var(--primary);
    color: var(--fg);
    display: block;
    padding: 0 1rem;
    line-height: 1rem;
    text-decoration: none;

    & h3 {
      color: var(--primary);
    }

    & .blurb {
      color: var(--secondary);
    }
  }

  a:is(:focus-visible, :hover) {
    background-color: var(--primary);
    color: var(--bg);
    outline: none;

    & h3 {
      color: var(--bg);
    }

    & .blurb {
      color: var(--bg);
    }
  }

  a:focus-visible:hover h3 {
    text-decoration: underline 3px var(--bg);
  }
</style>
