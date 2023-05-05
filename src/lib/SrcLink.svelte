<script lang="ts">
    import NavLink from "$lib/NavLink.svelte";

    export let filepath: string = "";

    const GH_REPO = "https://github.com/ndrooo/a.ndr.ooo";
    const GH_BASE = "https://github.com/ndrooo/a.ndr.ooo/tree/main";
    const re = /\/src\/pages\/.*$/;
    const ghPath = filepath ? GH_BASE + filepath.match(re) : GH_REPO;
</script>

<NavLink href={ghPath}>view source</NavLink>
