<script>
    import Header from "$lib/components/Header.svelte";
</script>


<Header/>
<div class="card">
    <div class="image">
        <img src="https://images.duckarmada.com/Ot2dnnNVqcKh/direct.png" alt="me"/>
    </div>
    <div class="content">
        <h2 class="name">Jerasaurus</h2>
    </div>
    <br>
    <a class="text-center"> Hey! You can contact me at jerasaurus342 at gmail dot com </a>
    <br>
    <a>If you wish to use secure messaging, here is my PGP key</a>
    <br>

    <a href= "https://images.duckarmada.com/BuKVX1DFqrPv/direct?download=yes" class="save-link content-center">My PGP key</a>
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
        height: 60vh;
        overflow: hidden;
        position: relative;
        display: block;
        margin-top: 2rem;

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
        font-size: 40px;
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
    .save-link{
        display: block;
        background: #767dd6;
        width: 50%;
        margin: auto;
        margin-top: 1rem;
        padding: 8px;
        border-radius: 10px;
    }

</style>et