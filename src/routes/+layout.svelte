<script>
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/style.scss';
	import '../app.css';
</script>

<!-- +layout.svelte -->
<Header>Hi, I'm a header</Header>


<main>
	<slot />
</main>

<footer>Hello, I'm the footer.</footer>
