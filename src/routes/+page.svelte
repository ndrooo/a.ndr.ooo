<script lang="ts">
  import Header from '$lib/Header.svelte';
  import NavLink from '$lib/NavLink.svelte';
  import SrcLink from '$lib/SrcLink.svelte';
  import { onMount } from 'svelte';

  let emailPrefix = 'a';
  let prefixes = [
    'a',
    'i-dont-understa',
    'on-the-other-ha',
    'in-dema',
    'protected-wetla',
    'a-bit-bla',
    'land-and-expa',
    'pituitary-gla',
    'death-stra',
    'i-cant-sta',
    'aint-it-gra',
    'cobra-comma',
    'ampersa',
    'wayla',
    'fools-erra',
    'were-an-american-ba',
    'inline-spa'
  ];

  onMount(() => {
    emailPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  });
</script>

<svelte:head>
  <title>a.ndr.ooo</title>
</svelte:head>

<Header title="a.ndr.ooo" blurb="This is my website">
  <NavLink href="https://github.com/ndrooo">github</NavLink>
  <SrcLink />
</Header>
<p>
  I am Andrew and I am a software developer writing web code, focusing on
  frontend and accessibility. All my work is proprietary so I don't have a lot
  to put here or in my Github. I also like game development, fooling around with
  unix tools, and building my <a href="https://github.com/ndrooo/nix"
    >NixOS configuration</a
  >. I live in New York City and I think birds are cool. You can email me at
  <a href="mailto:{emailPrefix}@ndr.ooo">{emailPrefix}@ndr.ooo</a>.
</p>
