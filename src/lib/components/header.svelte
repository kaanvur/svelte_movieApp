<script lang="ts">
	export let pageTitle: string = 'Title';
	export let accountState: { watchlist: any } = { watchlist: [] };
	export let movieId: any = 0;
	export let mediaType: string = 'movie';

	import imgBack from '$lib/images/arrow-left.svg';
	const icoref = pageTitle.toLowerCase().replace(/\s+/g, '-');
	const imageFolder = '/src/lib/images/';
	const toggleWatchlist = () => {
		accountState.watchlist = !accountState.watchlist;
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVlYzkyYWNiZTNjMzRhYjEzMTYyMTdhZWI5MzRiNyIsInN1YiI6IjY1ZDc2NDQwZTZkM2NjMDE2MmMwYmI0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hnCU5v9EpHEJLW4i5fc0p1tE8o48mkaq2W2leV7hYVg'
			},
			body: JSON.stringify({
				media_type: `${mediaType}`,
				media_id: movieId,
				watchlist: accountState.watchlist
			})
		};

		fetch('https://api.themoviedb.org/3/account/21024833/watchlist', options)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
	};
</script>

<header>
	<a href="/"> <img src={imgBack} alt="" srcset="" /> </a>
	<p class="page-title">{pageTitle}</p>
	{#if pageTitle == 'Detail'}
		<button on:click={toggleWatchlist} title="Add & Remove Watch list">
			<img
				src={accountState?.watchlist
					? `${imageFolder}watch-list.svg`
					: `${imageFolder}${icoref}.svg`}
				alt=""
			/>
		</button>
	{:else}
		<img src="{imageFolder}{icoref}.svg" alt="" />
	{/if}
</header>

<style lang="scss">
	header {
		display: flex;
		font-size: 16px;
		font-weight: 600;
		align-items: center;
		margin-bottom: 10px;
		a {
			display: grid;
		}
		.page-title {
			margin-inline: auto;
		}
		button {
			background: transparent;
			border: 0;
			cursor: pointer;
		}
	}
</style>
