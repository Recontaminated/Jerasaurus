<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/style.scss';
</script>

<!-- +layout.svelte -->


<main>
	<slot />
</main>
<svelte:head>
<!--	set title-->
	<title>Jerasaurus</title>
<!--	set meta tags-->
	<meta name="description" content="A personal website for Jeremy">
</svelte:head>
<style>

</style>