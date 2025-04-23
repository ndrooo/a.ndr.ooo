<script lang="ts">
	import { CodeXml, Github, House } from '@lucide/svelte';

	let props = $props();
</script>

<nav style=display:contents>
	<ul {...props}>
		<li>
			<a href="/">
				<House />
				<span>Home</span>
			</a>
		</li>
		<li>
			<a href="https://github.com/ndrooo">
				<Github />
				<span>GitHub</span>
			</a>
		</li>
		<li>
			<a href="https://github.com/ndrooo/a.ndr.ooo">
				<CodeXml />
				<span>Source</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	ul {
        align-content: start;
        margin: 0;
		padding: 0;
		z-index: 1;

        &::before {
            content: "";
            padding: 0.9rem;
        }
	}

	li {
		list-style-type: none;
	}

	a {
		background: none;
		display: flex;
		gap: 1rem;
		padding: 1rem;
	}

	a span {
		visibility: hidden;
		display: none;
	}

	a:focus-visible span {
		visibility: visible;
	}
</style>
