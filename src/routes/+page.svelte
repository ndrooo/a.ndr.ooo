<script lang="ts">
  import Header from '$lib/Header.svelte';
  import NavLink from '$lib/NavLink.svelte';
  import { onMount } from 'svelte';
  import { emailPrefixes } from '$lib/consts.js';

  let emailPrefix = 'a';

  export let data;

  onMount(() => {
    emailPrefix =
      emailPrefixes[Math.floor(Math.random() * emailPrefixes.length)];
  });
</script>

<svelte:head>
  <title>a.ndr.ooo</title>
</svelte:head>

<Header title="a.ndr.ooo" blurb="This is my website">
  <NavLink href="https://github.com/ndrooo">github</NavLink>
  <NavLink href="https://www.instagram.com/a.ndr.ooo">photography</NavLink>
</Header>
<p>
  I am Andrew! I am a software developer and curious person living in New York
  City. For work I build websites and I am particularly focused on making them
  accessible. When I feel like writing software for fun I dabble in game
  development, mess around with various things in Unix-world, and continuously
  improve my <a href="https://github.com/ndrooo/nix">NixOS configuration</a>.
</p>
<p>
  Sometimes I rebuild
  <a href="https://github.com/ndrooo/a.ndr.ooo"
    >the website you're currently on</a
  >
  unnecessarily. Do I need to have a website in the first place? Probably not.
  But it's fun to have a website! It's built in
  <a href="https://kit.svelte.dev/">SvelteKit</a>.
</p>
<p>
  I'm a gardener too, and a birder. I'm interested in ecology, in the complex
  interactions that make up nature, and in how human beings can take care of and
  even enrich that world. I like making things and have messed a bit with
  electronics and fabrication. I have a physics background which sort of helps
  with that. I'm very interested in home electrification, and in how we can
  reduce the waste that comes with the way we live.
</p>
<p>
  You can email me at <a href="mailto:{emailPrefix}@ndr.ooo"
    >{emailPrefix}@ndr.ooo</a
  >.
</p>
