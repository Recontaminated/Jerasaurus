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
    /*@import url('https://fonts.googleapis.com/css?family=Inter');*/


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
    @media (max-width: 900px) {
        .hero-wrapper{
            grid-template-columns: 1fr;
            gap: 1rem

        }
        .cool-image{
            max-width: 300px;
            width: 100%;
            height: 100%;

        }
    /*    align image center*/
        .hero-wrapper{
            justify-items: center;
        }
    }


</style>
<!--<svelte:head>-->
<!--&lt;!&ndash;   <link rel="preconnect" href="https://fonts.googleapis.com">&ndash;&gt;-->
<!--&lt;!&ndash;    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>&ndash;&gt;-->
<!--    <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">-->
<!--</svelte:head>-->
