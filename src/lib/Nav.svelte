<script lang="ts">
	import { page } from '$app/state';
</script>

<nav>
	<a href="/" aria-current={page.url.pathname == '/' ? 'page' : undefined}>go-home</a>
	<a href="https://github.com/ndrooo/a.ndr.ooo">view-source</a>
</nav>
