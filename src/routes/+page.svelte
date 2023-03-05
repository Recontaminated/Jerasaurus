<script lang="ts">

    import Header from '$lib/components/Header.svelte';
    import '$lib/styles/homepage.scss';
</script>
<Header></Header>
<!--TODO: make this more device freindly-->
<div class="main-content">
    <div class="content-container">
        <div class="hero-wrapper">
            <header class="hero-index hero">
                <h1>Hey, I'm Jeremy!</h1>
            </header>
           <p class="hero-description">
               Welcome to my digital archive 🗃️
               <br><br>
                I'm a software developer who sometimes plays drums. I work on open source projects to try and automate boring things.  I like birds, space, and Blink-182.

           </p>
        </div>
    </div>
</div>

<style>
    .main-content{
        padding-top: 4rem;
    }


</style>
<svelte:head>
    <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">
</svelte:head>