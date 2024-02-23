<script lang="ts">
	let userInput = '';
	let searchResults: any[] = [];
	import { PUBLIC_API_KEY } from '$env/static/public';


	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				`Bearer ${PUBLIC_API_KEY}`
		}
	};

	function searchMovies() {
		fetch(
			`https://api.themoviedb.org/3/search/multi?query=${userInput}&include_adult=false&language=en-EN&page=1`,
			options
		)
			.then((response) => response.json())
			.then((data) => {
				searchResults = data.results.filter(
					(result: { media_type: string }) => result.media_type !== 'person'
				);
			})
			.catch((err) => console.error(err));
	}
</script>

<input type="text" bind:value={userInput} on:input={searchMovies} />

<ul>
	{#each searchResults as result}
		<li>
			<a href="detail/{result.media_type}/{result.id}"
				><img src="https://image.tmdb.org/t/p/w200/{result.poster_path}" alt="" />
				{result.title || result.name}
			</a>
		</li>
	{/each}
</ul>
