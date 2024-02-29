<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchMovies } from '$lib/dataStore';
	import { fade } from 'svelte/transition';

	let selectedTab = '';
	let movies: any = [];
	let loading = false;

	async function fetchData() {
		try {
			loading = true;
			const moviesUrl = `https://api.themoviedb.org/3/movie/${selectedTab}?language=en-US&page=1`;
			movies = await fetchMovies(moviesUrl);
			loading = false;
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	}

	async function changeTab(tabName: string) {
		if (selectedTab !== tabName) {
			selectedTab = tabName;
			await fetchData();
		}
	}

	onMount(() => {
		changeTab('now_playing');
	});
</script>

<div class="button-container">
	<button class:selected={selectedTab === 'now_playing'} on:click={() => changeTab('now_playing')}
		>Now playing</button
	>
	<button class:selected={selectedTab === 'upcoming'} on:click={() => changeTab('upcoming')}
		>Upcoming</button
	>
	<button class:selected={selectedTab === 'top_rated'} on:click={() => changeTab('top_rated')}
		>Top rated</button
	>
	<button class:selected={selectedTab === 'popular'} on:click={() => changeTab('popular')}
		>Popular</button
	>
</div>

<div class="tab-content">
	{#if loading}
		<p>Loading...</p>
	{:else}
		<transition in:fade out:fade>
			{#each movies as item}
				<a href="/detail/movie/{item.id}">
					<img
						style="view-transition-name: poster-{item.id}"
						src="https://image.tmdb.org/t/p/w200/{item.poster_path}"
						alt=""
					/>
					<div class="overview">
						<h5>{item.title}</h5>
						<p>{item.overview}</p>
					</div>
				</a>
			{/each}
		</transition>
	{/if}
</div>

<style lang="scss">
	.button-container {
		display: flex;
		justify-content: space-around;
		margin-block: 20px;
		view-transition-name: tab-button;
	}
	button {
		background: none;
		border: 0;
		font-size: 14px;
		padding-block: 10px;
		border-bottom: 4px solid transparent;
		&.selected {
			border-bottom: 4px solid #3a3f47;
		}
	}
	.overview {
		h5 {
			font-size: 16px;
			font-weight: 800;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			white-space: pre-wrap;
			overflow: hidden;
		}
		position: absolute;
		height: 100%;
		bottom: 0;
		text-overflow: clip;
		overflow: hidden;
		padding: 5px;
		background: radial-gradient(circle, rgba(43, 43, 43, 0.5) 0%, rgba(2, 150, 229, 1) 100%);
		border-radius: 20px;
		transition: all 0.6s ease;
		opacity: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.tab-content transition {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 18px 13px;
		a {
			text-decoration: none;
			position: relative;
			overflow: hidden;
			transition: all 0.4s ease;
			display: grid;
			&:hover {
				transform: scale(1.1);
				.overview {
					opacity: 1;
				}
			}
		}
		img {
			border-radius: 20px;
		}
		p {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 7;
			white-space: pre-wrap;
			overflow: hidden;
		}
	}
</style>
