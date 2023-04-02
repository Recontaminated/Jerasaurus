<script lang="ts">
    import "$lib/styles/style.scss"
    import Header from "$lib/components/Header.svelte";
    import {onMount} from "svelte";
    import Prism from 'prismjs';

    import { env } from '$env/dynamic/public';
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
    <p id="pageDate">Updated: {(data.json.data[0].attributes.updatedAt).slice(0,10)} </p>
    {#if data.json.data[0].attributes.blogArt.data != null}
        <img id="blog-art" src={env.PUBLIC_STRAPI_HOST + data.json.data[0].attributes.blogArt.data?.attributes.url} alt="blog image">
    {/if}
    <div style="padding-bottom: 2rem">{@html data.content}</div>
    <hr style="border-top: 1px solid var(--fontColorBase);padding-bottom: 1rem ">
</div>
<style lang="scss">

    /*@use "$lib/styles/blogStyles.scss"*/
    .content-container {
      --content-width: 900px;
      #blog-art {
        width: 100%;
        height: auto;
        padding-bottom: 1rem;
        //center it
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

    :global(h1) {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--fontColorBase);
        margin-bottom: 1rem;
    }
    #pageDate {
      font-family: apple-system, Inter, sans-serif, sans-serif;
      text-align: center;
        font-size: 0.8rem;
        font-weight: 200;
        color: var(--fontColorBase);
    }
    .blog-title {
      text-align: center;
        font-family: Inter, sans-serif;
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 0;
    }

    :global(body) {
        color: var(--fontColorBase);
    }

    :global(h1) {
        font-family: Arial, Inter, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        padding-bottom: 0.7rem;

    }

    :global(h2) {
        font-family: Arial, Inter, sans-serif;
        font-size: 2rem;
        font-weight: 600;
        padding-bottom: 0.7rem;
    }

    :global(p) {
        padding-bottom: 0.7rem;

    }

    }
</style>