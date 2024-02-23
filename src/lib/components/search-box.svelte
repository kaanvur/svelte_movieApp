<script lang="ts">
	let userInput = '';
	let searchResults: any[] = [];
	import { PUBLIC_API_KEY } from '$env/static/public';
	import { onMount } from 'svelte';

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${PUBLIC_API_KEY}`
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
	let inputElement: HTMLElement;
	onMount(() => {
		inputElement.focus();
	});
</script>

<input
	type="text"
	bind:value={userInput}
	on:input={searchMovies}
	bind:this={inputElement}
	placeholder="Search"
/>

<ul>
	{#each searchResults as result}
		<li>
			<a href="detail/{result.media_type}/{result.id}"
				><img
					style="view-transition-name: poster-{result.id}"
					src={result.poster_path
						? `https://image.tmdb.org/t/p/w200${result.poster_path}`
						: `https://placehold.co/200x294/4b5563/fff/?text=${result.name || result.title}`}
					alt=""
				/>
				<div>{result.title || result.name}</div>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
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
		display: grid;
		grid-template-columns: 20% 1fr;
		gap: 20px;
		> img {
			border-radius: 20px;
		}
	}
</style>
