<script lang="ts">
	import ViewTransition from './navigation.svelte';
	import '../styles/reset.scss';
</script>
<ViewTransition/>
<div class="app">

<main class="container">
	<slot />
</main>
<nav>
	<a href="/">Home</a>
	<a href="/search">Search</a>
	<a href="/watch-list">Watch list</a>
</nav>
</div>

<style lang="scss">
	nav {
		position: fixed;
		border-top: 1px solid #0296e5;
		background-color: #242a32;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: space-around;
	}
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1%;
	}
</style>
