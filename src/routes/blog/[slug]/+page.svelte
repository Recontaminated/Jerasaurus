<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import {onMount} from "svelte";
    import Prism from 'prismjs';

    import {env} from '$env/dynamic/public';

    export let data = {
        content: '',
        json: {
            data: undefined,
            blogArt: {
                data: {
                    attributes:{
                        width: 0,
                        height: 0
                    }
                }
            }
        }
    };
    //call code on the browser
    onMount(() => {

        Prism.highlightAll();
    })

    let artAR;
    // this is so dumb
    if (data.json.blogArt.data != null) {
        artAR = data.json.blogArt.data?.attributes.width / data.json.blogArt.data?.attributes.height * 100;
    }

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-atom-dark.min.css"
          integrity="sha512-GZPS1oCebjx8g/ZkrTTvWirW+4wDkzIsilUQPXcZzuDpDzoH5brM2AojiFjo6ObIWeM68ZDostvdjaS9MNYCTg=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
</svelte:head>


<Header/>
<div class="content-container">
    <h1 class="blog-title">{data.json.title}</h1>
    <p id="pageDate">Updated: {(data.json.updated)} </p>
    {#if data.json.blogArt.data != null}
        <div
                class="dynamic-aspect-ratio-box"
                style={`padding-bottom: ${artAR}%`}
        >
            <img id="blog-art" src={env.PUBLIC_STRAPI_HOST + data.json.blogArt.data?.attributes.url} alt="blog image">
        </div>
    {/if}
    <div style="padding-bottom: 2rem">{@html data.content}</div>
    <hr style="border-top: 1px solid var(--fontColorBase);padding-bottom: 1rem ">
</div>
<style lang="scss">
  .dynamic-aspect-ratio-box {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-bottom: 1.6rem;
  }

  .dynamic-aspect-ratio-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // Use 'cover' or 'contain' depending on your design needs
  }

  /*@use "$lib/styles/blogStyles.scss"*/
  .content-container {
    --content-width: 900px;

    #blog-art {
      width: 100%;
      height: auto;
      //center it
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    h1 {
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

    // we have to do this or else styles dont apply to the content
    :global(body) {
      color: var(--fontColorBase);
    }

    :global(h1) {
      font-family: Arial, Inter, sans-serif;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.7rem;

    }

    :global(h2) {
      font-family: Arial, Inter, sans-serif;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.7rem;
    }

    :global(p) {
      margin-bottom: 0.7rem;

    }

    :global(strong) {
      background-color: rgb(255, 178, 62);
      background-image: linear-gradient(90deg, #c74677, #d65372, #e2616e, #ec716a, #f38168, #f99267, #fda468, #ffb56b);
      background-size: 100%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    :global(a) {
      color: var(--accentColor);

    }

    :global(a:hover) {
      border-bottom: 1px solid var(--accentColor);
    }

    :global(img) {
      margin-left: auto;
      margin-right: auto;
      max-width: var(--content-width);
    }
  }

</style>