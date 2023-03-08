<script>
    import Header from "$lib/components/Header.svelte";
</script>


<Header/>
<div class="card">
    <div class="image">
        <img src="https://images.duckarmada.com/dYyERPXpJOwK/direct.png" alt="me"/>
    </div>
    <div class="content">
        <h2 class="name">Jeremy Hsieh</h2>
    </div>
    <div class="social">

        <a href="https://discord.com/channels/397986807607721985" class="fa fa-brands fa-discord"></a>
        <a href="https://github.com/Recontaminated" class="fa fa-brands fa-github"></a>
    </div>

    <a href= "https://images.duckarmada.com/OBzaxWzmFtMN/direct?download=yes" class="m-6 content-center fa fa-address-book"> </a>
</div>

<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css');

    .card {
        text-align: center;
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
        padding: 5px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        border-radius: 10%;
    }

    /* Add a hover effect if you want */
    .fa:hover {
        opacity: 0.7;
    }

    /* Set a specific color for each brand */
    .fa-discord {
        background: #7289da;
        color: white;
        width: fit-content;
    }

    .fa-github {
        background: #333;
        color: white;
        width: fit-content;
    }

    .fa-address-book {
        background: #44403c;
        border-radius: 10px;
        width: 50%
    }

</style>