<script lang="ts">
	import { fetchMovies } from '$lib/dataStore';
	import { onMount } from 'svelte';
	let movies: Movie[] = [];
	let userInput = '';

	let loading = false;
	interface Movie {
		media_type?: string;
		id?: string;
		poster_path?: string;
		name?: string;
		title?: string;
		vote_average?: number;
		first_air_date?: Date;
		release_date?: Date;
	}

	async function fetchData() {
		try {
			loading = true
			const moviesUrl = `https://api.themoviedb.org/3/search/multi?query=${userInput}&include_adult=false&language=en-EN&page=1`;
			movies = (await fetchMovies(moviesUrl)) as Movie[];
			loading = false
			movies = movies.filter((movie: Movie) => {
				return movie.media_type !== 'person';
			});
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	}

	let inputElement: HTMLElement;
	onMount(() => {
		inputElement.focus();
	});
	function getYear(date: Date | undefined) {
		return date ? new Date(date).getFullYear() : '';
	}
</script>

<div class="search-holder">
	<input
		type="text"
		bind:value={userInput}
		on:input={fetchData}
		bind:this={inputElement}
		placeholder="Search"
	/>
	<img src="/src/lib/images/Search.svg" alt="" />
</div>
{#if loading}
	Loading...
{:else if movies}
	<ul>
		{#each movies as result}
			<li>
				<a href="detail/{result.media_type}/{result.id}"
					><img
						style="view-transition-name: poster-{result.id}"
						src={result.poster_path
							? `https://image.tmdb.org/t/p/w200${result.poster_path}`
							: `https://placehold.co/200x294/4b5563/fff/?text=${result.name || result.title}`}
						alt=""
					/>
					<div>
						<h4>{result.title || result.name}</h4>
						<div class="vote">
							{Math.round((result.vote_average || 0) * 10) / 10}
						</div> 

						{getYear(result.first_air_date || result.release_date)}
					</div>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.search-holder {
		display: flex;
		img {
			margin-left: -30px;
			pointer-events: none;
		}
	}
	input {
		border: 0;
		background: #3a3f47;
		color: #67686d;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px 15px;
		width: 100%;
		margin-block: 10px;
	}
	ul {
		display: grid;
		gap: 20px;
	}
	a {
		h4 {
			font-size: 16px;
			font-weight: 400;
			margin-bottom: 14px;
		}
		display: grid;
		grid-template-columns: 20% 1fr;
		gap: 20px;
		text-decoration: none;
		.vote {
			color: #ff8700;
			font-weight: 600;
		}
		> img {
			border-radius: 20px;
		}
	}
</style>
