<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchMovies } from '$lib/dataStore';

	let movies: any;
	let loading = false;

	async function fetchData() {
		try {
			loading = true;
			const moviesUrl = 'https://api.themoviedb.org/3/trending/all/day?language=en-EN';
			movies = await fetchMovies(moviesUrl);
			loading = false;
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	}
	onMount(fetchData);
</script>

{#if loading}
	Loading...
{:else if movies}
	<div class="slider">
		{#each movies as movie, index}
			<div class="slide">
				<a href="/detail/{movie.media_type}/{movie.id}">
					<img src="https://image.tmdb.org/t/p/w500/{movie.poster_path}" alt="" />
					<span class="number">{index + 1}</span>
				</a>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.slider {
		display: flex;
		width: 100%;
		overflow: auto;
		gap: 10%;
		padding-inline: 2%;
		scroll-snap-type: x mandatory;
		padding-bottom: 5%;
		overflow-x: scroll;
		overflow-y: hidden;

		.slide {
			position: relative;
			scroll-snap-align: center;

			a {
				text-decoration: none;
			}
			img {
				border-radius: 20px;
			}
			flex: 1 0 40%;
			.number {
				color: #242a32;
				font-size: 96px;
				font-weight: 600;
				line-height: 1;
				background-color: #000000;

				color: transparent;
				text-shadow:
					0px 1px 3px #242a32,
					0px 4px 4px #00000040;
				-webkit-text-stroke-width: 0.5px;
				-webkit-text-stroke-color: #0296e5;
				-webkit-background-clip: text;
				-moz-background-clip: text;
				background-clip: text;
				position: absolute;
				bottom: -8%;
				left: -5%;
			}
		}
	}
</style>
