<header>
	<section class = "navigation">
	<div class="content-container">
		<a href="/" class="brand">Jeremy Hsieh</a>
		<nav>
			<ul>
				<li><a href="/about">About</a></li>
				<li><a href="/projects">Projects</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</nav>
	</div>
	</section>
</header>

<style>
	.brand{
		font-family: var(--font-family-base);
		font-weight: 700;
		color:white;

	}
	nav {
		padding-top: 10px;
	}
	header {
		padding: 1rem;
		/* background: lightskyblue; */
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	ul {
		margin: 0;
		list-style-type: none; 
		display: flex;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
