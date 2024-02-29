<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { fetchMovies, watchlistNeedFetchStore } from '$lib/dataStore';
	import { onMount } from 'svelte';
	let detail: { results: any };
	let combinedResults: any[] = [];
	let movies: any = [];
	let series: any = [];
	let loading = false;


	async function fetchData() {
		try {
			loading = true;
			const moviesUrl = `https://api.themoviedb.org/3//account/21024833/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;
			movies = await fetchMovies(moviesUrl);
			const seriesUrl = `https://api.themoviedb.org/3//account/21024833/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc`;
			series = await fetchMovies(seriesUrl);
			const detail = {
				movies,
				series
			};
			detail.movies.forEach((movie: any) => {
				movie.media_type = 'movie';
				combinedResults.push(movie);
			});

			detail.series.forEach((series: any) => {
				series.media_type = 'tv';
				combinedResults.push(series);
			});
			loading = false
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<Header pageTitle="Watch list" />
{#if loading}
	Loading...
{:else}
	<div class="watch-list">
		{#each combinedResults as item}
			<a href="/detail/{item.media_type}/{item.id}">
				<img
					style="view-transition-name: poster-{item.id}"
					src="https://image.tmdb.org/t/p/w200/{item.poster_path}"
					alt=""
				/>
			</a>
		{/each}
	</div>
{/if}

<style lang="scss">
	.watch-list {
		display: grid;
		grid-template-columns: auto auto;
		gap: 18px;
		justify-content: space-between;
		img {
			border-radius: 20px;
		}
	}
</style>
