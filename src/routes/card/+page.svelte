<script>
    import Header from "$lib/components/Header.svelte";
</script>

<Header />
<h1 class="text-center">Heres how to contact me</h1>

<div class="card">
    <div class="image">
        <img src="https://images.duckarmada.com/dYyERPXpJOwK/direct.png" alt="me" />
    </div>
    <div class="content">
        <h2>My name is <span class="name">Duck Armada</span></h2>
        <p>My email is <span class="email">
        </span>
        </p>
    </div>
</div>

<style>
.card {

    background: hsl(0, 0%, 5%);
    margin: auto;
    width: 30%;
    border-radius: 30px;
    height: 30rem;


    }
    /*center image*/
    .image {
        width: 18rem;
        height: 18rem;
        background-color: #000;
        overflow: hidden;
        margin: 0 auto;
        border-radius: 50%;
    }

</style>