<script lang="ts">
	import Header from '$lib/Header.svelte';
	import NavLink from '../lib/NavLink.svelte';
	import SrcLink from '../lib/SrcLink.svelte';
</script>

<Header title="a.ndr.ooo" blurb="This is my website">
	<NavLink href="https://github.com/ndrooo">github</NavLink>
	<SrcLink />
</Header>
<p>
	I am Andrew and I am a software developer writing web code, focusing on
	frontend and accessibility. All my work is proprietary so none of it is here
	or in my github, sorry. I also like playing around with unix and building my
	<a href="https://github.com/ndrooo/dot">NixOS configuration</a>. I live in New York City and I think birds are cool. You
	can email me at <code>^[\w-\.]+@ndr\.ooo$</code>.
</p>
