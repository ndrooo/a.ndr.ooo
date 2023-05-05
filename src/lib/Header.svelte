<script lang="ts">
    export let title: string;
    export let blurb = "";
</script>

<header>
    <h1>{title}</h1>
    {#if blurb}
        <p class="blurb">{blurb}</p>
    {/if}
    <nav>
        <slot/>
    </nav>
</header>

<style lang="scss">
    h1 {
        margin: 0;
    }

    p {
        color: var(--secondary);
        font-size: 1.5rem;
        margin: 0.5rem 0;
    }

    nav {
        display: flex;
        font-size: 1.5rem;
        gap: 1.5rem;
        margin: 18px 0;
    }
</style>