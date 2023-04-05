<script lang="ts">

    import Header from '$lib/components/Header.svelte';
    import '$lib/styles/homepage.scss';
</script>
<Header></Header>
<!--TODO: make this more device freindly-->
<div class="main-content">
    <div class="content-container">
        <div class="hero-wrapper">
            <header class="hero-index">
                <h1 class="hero">Hey, I'm Jeremy!</h1>
                <p class="hero-description">
                    Enjoy your stay here ️🌱
                    <br><br>
                    I'm a software developer who sometimes plays drums. I work on open source projects to try and automate boring things.  I like birds, space, and Blink-182.

                </p>
            </header>

            <div class="cool-image">
                <img src="https://images.duckarmada.com/Ot2dnnNVqcKh/direct.png" alt="me">
            </div>
        </div>
    </div>
</div>

<style>
    .main-content{
        padding-top: 4rem;
    }
    .hero-wrapper{
        display:grid;
        align-items: center;
        grid-template-columns: 3fr 2fr;
        gap: 1rem
    }
    .cool-image{
    /*    make image circle*/
        border-radius: 50%;
        overflow: hidden;
        width: 300px;
        height: 300px;

    }



</style>
<svelte:head>
<!--   <link rel="preconnect" href="https://fonts.googleapis.com">-->
<!--    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>-->
    <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">
</svelte:head>