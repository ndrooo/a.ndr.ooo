<script lang="ts">
  export let href: string;
</script>

<a {href}>
  <slot />
</a>

<style lang="scss">
  a {
    background-color: var(--alt-bg);
    border: 3px solid var(--primary);
    outline: none;
    padding: 0.5rem;
    text-decoration: none;
    text-transform: lowercase;

    &:is(:focus-within, :hover) {
      color: var(--bg);
      background-color: var(--primary);
      outline: none;
    }

    &:focus-within:hover {
      text-decoration: underline 3px;
    }
  }
</style>
