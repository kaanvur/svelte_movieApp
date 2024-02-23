<script lang="ts">
	import { onMount } from 'svelte';
import { PUBLIC_API_KEY } from '$env/static/public';

	let isLoading = true;

	let selectedTab = '';

	let detail: { results: any };

	async function fetchDetail() {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					`Bearer ${PUBLIC_API_KEY}`
			}
		};

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${selectedTab}?language=en-US&page=1`,
				options
			);
			detail = await response.json();
		} catch (err) {
			console.error(err);
		}
	}
	async function changeTab(tabName: string) {
		if (selectedTab != tabName) {
			selectedTab = tabName;
			isLoading = true;
			await fetchDetail();
			isLoading = false;
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
	{#if isLoading}
		<p>Loading...</p>
	{:else}
		{#each detail.results as item}
			<a href="/detail/movie/{item.id}">
				<img style="view-transition-name: poster-{item.id}" src="https://image.tmdb.org/t/p/w200/{item.poster_path}" alt="" />
			</a>
		{/each}
	{/if}
</div>
<style lang="scss">
	.button-container {
		display: flex;
		    justify-content: space-around;
			margin-block: 20px;
	}
	button {
		background: none;
		border: 0;
		font-size: 14px;
		padding-block: 10px;
		border-bottom: 4px solid transparent;
		&.selected {
		border-bottom: 4px solid #3A3F47;

		}
	}
	.tab-content {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap:18px 13px;
		img {
			border-radius: 20px;
		}
	}
</style>