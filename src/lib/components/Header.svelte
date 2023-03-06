

<header>
    <section class="navigation">
        <div class="content-container">
            <div class="nav-wrapper">
                <a href="/" class="brand">Jerasaurus</a>
                <nav>
                    <ul>
                        <li><a href="/about" class="effect-3">About</a></li>

                        <li><a href="/blog" class="effect-3">Blog</a></li>
                        <li><a href="/projects" class="effect-3">Projects</a></li>
                        <li><a href="https://github.com/recontaminated" class="effect-3">GitHub</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</header>
<script>
    import '$lib/styles/hoverEffects.scss';
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    onMount(()=>{
        //get all links in nav
        let links = document.querySelectorAll('nav a');
        //set active link
        console.log($page)
        links.forEach(link => {

            console.log("active link: " + link.href + " " + $page.url.href)
            if (link.href === $page.url.href) {
                link.classList.add('active');
                // link.classList.remove('effect-3');
            }
        });
    })


</script>


<style>
    .brand {
        font-family:Inter, Roboto, sans-serif;
        font-weight: 700;
        color: white;
        padding-bottom: 20px;

    }

    nav {
        /*padding-top: 15px;*/
        font-size: 0.9rem;
        font-family: apple-system,Inter, sans-serif;
        font-weight: 300;
    }

    header {
        /* background: lightskyblue; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    ul {
        margin: 0;
        list-style-type: none;
        display: flex;
        gap: 2rem;
    }

    .nav-wrapper {
        /*font-size: 1.2rem;*/
        font-size: 1.3rem;
        height: 80px;
    }

    a {
        text-decoration: none;
        color: #bbb;

    }

</style>
