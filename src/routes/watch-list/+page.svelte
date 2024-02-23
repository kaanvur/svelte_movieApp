<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { PUBLIC_API_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	let detail: { results: any };
	let isLoading = true;
	let combinedResults: any[] = [];

	async function fetchDetail() {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${PUBLIC_API_KEY}`
			}
		};

		try {
			const response1 = await fetch(
				`https://api.themoviedb.org/3//account/21024833/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
				options
			);
			const response2 = await fetch(
				`https://api.themoviedb.org/3//account/21024833/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc`,
				options
			);
			const dataMovie = await response1.json();
			const dataSeries = await response2.json();
			const detail = {
				dataMovie,
				dataSeries
			};
			detail.dataMovie.results.forEach((movie: any) => {
				movie.media_type = 'movie';
				combinedResults.push(movie);
			});

			detail.dataSeries.results.forEach((series: any) => {
				series.media_type = 'tv';
				combinedResults.push(series);
			});
			combinedResults = detail.dataMovie.results.concat(detail.dataSeries.results);
			isLoading = false;
		} catch (err) {
			console.error(err);
		}
	}
	onMount(fetchDetail);
</script>

<Header pageTitle="Watch list" />

{#if isLoading}
	<p>Loading...</p>
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
