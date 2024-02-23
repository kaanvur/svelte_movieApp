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

<input type="text" bind:value={userInput} on:input={searchMovies} placeholder="Search" />

<ul>
	{#each searchResults as result}
		<li>
			<a href="detail/{result.media_type}/{result.id}"
				><img style="view-transition-name: poster-{result.id}" src="https://image.tmdb.org/t/p/w200/{result.poster_path}" alt="" />
				{result.title || result.name}
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	input {
		border: 0;
		background: #3A3F47;
		color: #67686D;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px 15px;
		width: 100%;
		margin-block: 10px;
	}
</style>