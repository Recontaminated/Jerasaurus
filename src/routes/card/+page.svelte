<script>
    import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>

    <script src="https://kit.fontawesome.com/8f18523747.js" crossorigin="anonymous"></script>
</svelte:head>
<Header/>
<div class="card">
    <div class="image">
        <img src="https://images.duckarmada.com/dYyERPXpJOwK/direct.png" alt="me"/>
    </div>
    <div class="content">
        <h2 class="name">Jeremy Hsieh</h2>
    </div>
    <div class="social">

        <a class="fa fa-brands fa-discord"></a>
        <a class="fa fa-brands fa-github"></a>
    </div>
</div>

<style>

    .card {

        background: hsl(0, 0%, 5%);
        margin: auto;
        width: 90%;
        max-width: 500px;
        border-radius: 30px;
        height: 30rem;
        overflow: hidden;

    }

    /*center image*/
    img {

        width: 50%;
        overflow: hidden;
        border-radius: 50%;
        margin: auto;
        margin-top: 30px;
    }

    .image {
        margin-top: 10px;
    }

    .name {
        text-align: center;
        font-size: 2rem;
        margin-top: 1rem;
        color: #fff;
    }
    .social {
        box-sizing: unset;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    /*    font awesome*/
    /* Style all font awesome icons */
    .fa {
        position: relative;
        padding: 20px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
    }

    /*!* Add a hover effect if you want *!*/
    /*.fa:hover {*/
    /*    opacity: 0.7;*/
    /*}*/

    /* Set a specific color for each brand */
    .fa-discord {
        background: #7289da;
        color: white;
    }

</style>