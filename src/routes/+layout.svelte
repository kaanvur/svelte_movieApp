<script lang="ts">
	import ViewTransition from './navigation.svelte';
	import '../styles/reset.scss';
	import { page } from '$app/stores';
	import IcoHome from '$lib/images/Home.svg?component';
	import IcoSearch from '$lib/images/Search-nav.svg?component';
	import IconBookmark from '$lib/images/Bookmark.svg?component';
</script>

<ViewTransition />
<div class="app">
	<main class="container">
		<slot />
	</main>
	<nav>
		<a href="/" class:selected={$page.url.pathname == '/'}>
			<IcoHome stroke-width='2' stroke='var(--my-stroke-color)' fill='none'/>
			Home
		</a>
		<a href="/search" class:selected={$page.url.pathname === '/search'}>
			<IcoSearch stroke-width='2' stroke='var(--my-stroke-color)' fill='none'/>
			Search
		</a>
		<a href="/watch-list" class:selected={$page.url.pathname === '/watch-list'}>
			<IconBookmark stroke-width='2' stroke='var(--my-stroke-color)' fill='none'/>
			Watch list
		</a>
	</nav>
</div>

<style lang="scss">
	:root {
      --my-stroke-color: #67686D;
    }
	nav {
		view-transition-name: navbar;
		position: fixed;
		border-top: 1px solid #0296e5;
		background-color: #242a32;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: space-around;
		a {
			display: grid;
			justify-items: center;
			padding-block: 15px;
			text-decoration: none;
			&.selected {
				--my-stroke-color: #0296e5;
				color: #0296e5;
			}
		}
	}
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1%;
		margin-top: 10px;
	}
</style>
