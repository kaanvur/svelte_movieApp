<script lang="ts">
	import ViewTransition from './navigation.svelte';
	import '../styles/reset.scss';
	import { page } from '$app/stores';
</script>
<ViewTransition/>
<div class="app">

<main class="container">
	<slot />
</main>
<nav>
	<a href="/" class:selected={$page.url.pathname == '/'}>
		<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5246 21H13.7818H6.34876H4.60596C2.86861 21 1.46021 19.4607 1.46021 17.5618V8.84736C1.4669 8.09967 1.78834 7.39702 2.3316 6.94256L8.26584 1.6853C9.31003 0.771566 10.7944 0.771566 11.8386 1.6853L17.799 6.93303C18.3402 7.38935 18.6611 8.09083 18.6704 8.83784V17.5618C18.6704 19.4607 17.2619 21 15.5246 21Z" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

		Home
	</a>
	<a href="/search" class:selected={$page.url.pathname === '/search'}>
		<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="9.78854" cy="10.7666" rx="8.14181" ry="8.98856" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.4513 17.4851L18.6433 21" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

		Search
	</a>
	<a href="/watch-list" class:selected={$page.url.pathname === '/watch-list'}>
		<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6963 18.6316L5.32373 21.881C4.89477 22.1271 4.3663 21.9529 4.12982 21.4874V21.4874C4.0614 21.3432 4.02449 21.1834 4.02203 21.0206V6.62244C4.02203 3.87644 5.7217 2.77805 8.16756 2.77805H13.9133C16.2845 2.77805 18.0588 3.80322 18.0588 6.43937V21.0206C18.0588 21.2804 17.9653 21.5295 17.7989 21.7132C17.6326 21.8968 17.4069 22 17.1716 22C17.0216 21.9974 16.874 21.9567 16.7405 21.881L11.3347 18.6316C11.1355 18.5128 10.8955 18.5128 10.6963 18.6316Z" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

		Watch list
	</a>
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
		a {
			display: grid;
			justify-items: center;
			padding-block: 15px;
			text-decoration: none;
			&.selected {
				color: #0296e5;
				svg {
					path,ellipse {
						stroke: #0296e5;
					}
				}
			}
		}
	}
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1%;
	}
</style>
