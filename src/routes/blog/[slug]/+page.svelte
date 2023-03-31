<script lang="ts">
    import "$lib/styles/style.scss"
    import Header from "$lib/components/Header.svelte";
    // import "$lib/styles/blogStyles.scss"
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-atom-dark.min.css" integrity="sha512-GZPS1oCebjx8g/ZkrTTvWirW+4wDkzIsilUQPXcZzuDpDzoH5brM2AojiFjo6ObIWeM68ZDostvdjaS9MNYCTg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<Header />
<div class="content-container">
    <div class="blog-title">
<!--        <h1>{data.title}</h1>-->
<!--        <p>{data.date}</p>-->
    </div>
<div style="padding-top: 6rem">{@html data.content}</div>
</div>
