<script lang="ts">
    import "$lib/styles/style.scss"
    import Header from "$lib/components/Header.svelte";
    import {onMount} from "svelte";
    import Prism from 'prismjs';

    export let data = {
        content: ''
    };
    //call code on the browser
    onMount(() => {

        Prism.highlightAll();
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-atom-dark.min.css"
          integrity="sha512-GZPS1oCebjx8g/ZkrTTvWirW+4wDkzIsilUQPXcZzuDpDzoH5brM2AojiFjo6ObIWeM68ZDostvdjaS9MNYCTg=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
</svelte:head>


<Header/>
<div class="content-container">
    <h1 class="blog-title">{data.json.data[0].attributes.title}</h1>
    <div style="padding-bottom: 2rem">{@html data.content}</div>
    <hr style="border-top: 1px solid var(--fontColorBase);padding-bottom: 1rem ">
    <p>Last Updated {(data.json.data[0].attributes.updatedAt).slice(0,10)} </p>
</div>
<style>
    .blog-title {
        font-family: Inter, sans-serif;
        font-size: 3rem;
        font-weight: 700;
        padding-bottom: 1rem;
        padding-top: 2rem;
    }
    body{
        color: var(--fontColorBase);
    }
    h1 {
        font-family: Arial, Inter, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        padding-bottom: 1rem;

    }

    h2{
        font-family: Arial, Inter, sans-serif;
        font-size: 2rem;
        font-weight: 600;
        padding-bottom: 1rem;
    }

    p {
        padding-bottom: 1rem;

    }
</style>