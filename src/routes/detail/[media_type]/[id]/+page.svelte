<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { PUBLIC_API_KEY } from '$env/static/public';

	export let data;
	console.log(data);
	const releaseDate = data.first_air_date || data.release_date;
	let year: number | null = null;
	let isLoading = false;

	if (releaseDate) {
		year = new Date(releaseDate).getFullYear();
	}
	let selectedTab = 'about';

	let detail: { results: any; cast: any };

	async function fetchDetail() {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${PUBLIC_API_KEY}`
			}
		};

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/${data.media_type}/${data.id}/${selectedTab}?language=en-US`,
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
			if (tabName != 'about') {
				isLoading = true;
				await fetchDetail();
				isLoading = false;
			}
		}
	}
</script>

<Header></Header>
<div class="container-back_drop">

	<img class="img-back_drop" src={data.backdrop_path
									? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
									: `https://placehold.co/500x281/4b5563/fff/?text=${data.name || data.title}`}
									alt="" />
	<div class="vote">{data.vote_average}</div>
</div>
<section class="content-movie">
	<div class="content-top">
		<img
			class="img-poster"
			style="view-transition-name: poster-{data.id}"
			src="https://image.tmdb.org/t/p/w200{data.poster_path}"
			alt=""
		/>
		<h1>{data.name || data.title}</h1>
	</div>
	<div class="content-stats">
		<p>{year}</p>
		<p>{data.runtime || data.last_episode_to_air?.runtime || ''} Minutes</p>
		<p>
			{#each data.genres as genre, index}
				{genre.name}{index < data.genres.length - 1 ? ', ' : ''}
			{/each}
		</p>
	</div>

	<div class="button-container">
		<button class:selected={selectedTab === 'about'} on:click={() => changeTab('about')}>
			{data.media_type == 'tv' ? 'About Series' : 'About Movies'}
		</button>
		<button class:selected={selectedTab === 'reviews'} on:click={() => changeTab('reviews')}
			>Reviews</button
		>
		<button class:selected={selectedTab === 'credits'} on:click={() => changeTab('credits')}
			>Cast</button
		>
	</div>

	<div class="tab-content">
		{#if selectedTab === 'about'}
			<p>{data.overview}</p>
		{:else if selectedTab === 'reviews'}
			{#if isLoading}
				<p>Loading...</p>
			{:else}
			<div class="reviews">
				{#each detail.results as review}
					<div class="review">
						<div class="reviewer">
							<img
								src={review.author_details.avatar_path
									? `https://image.tmdb.org/t/p/w200/${review.author_details.avatar_path}`
									: 'https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg'}
								alt=""
							/>
							{review.author_details.rating || ''}
						</div>
						<div>
							<p>{review.author_details.username}</p>
							{@html review.content}
						</div>
					</div>
				{/each}
				</div>
			{/if}
		{:else if selectedTab === 'credits'}
			{#if isLoading}
				<p>Loading...</p>
			{:else}
			<div class="casts">
				{#each detail.cast as cast}
				<div class="cast">
					<img
						src={cast.profile_path
							? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
							: 'https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg'}
						alt=""
					/>
					<p>{cast.name}</p>
					</div>
				{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>

<style lang="scss">
	h1 {
		font-size: 18px;
		font-weight: 600;
	}
	.container-back_drop {
		position: relative;
	}
	.img-back_drop {
		border-radius: 0px 0px 16px 16px;
		width: 100%;
	}
	.vote {
		position: absolute;
		background: #25283652;
		color: #ff8700;
		border-radius: 10px;
		bottom: 6%;
		right: 5%;
		padding: 4px 8px;
	}
	.content-movie {
		margin-inline: 8%;
	}
	.img-poster {
		margin-top: -20%;
		width: 95px;
		border-radius: 20px;
	}
	.content-top {
		display: flex;
		align-items: flex-end;
		gap: 10px;
	}
	.content-stats {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		align-items: center;
		p {
			font-size: 12px;
			font-weight: 500;
			line-height: 15px;
			letter-spacing: 0.11999999731779099px;
			color: #92929d;

			margin-left: 12px;
			padding-right: 12px;
			&:not(:last-child) {
				border-right: 1px solid #696974;
				flex: 0 0 auto;
			}
		}
	}
	
	.reviews {
		display: grid;
		gap: 20px;
	}
	.review {
		display: grid;
		grid-template-columns: 10% 1fr;
		gap: 12px;
		.reviewer {
			text-align: center;
			img {
				margin-bottom: 10px;
			}
		}
	}
	.casts {
		display: grid;
		    grid-template-columns: 40% 40%;
    gap: 24px;
    justify-content: space-between;
		.cast {
			text-align: center;
			font-weight: 500;
		}
		img {
		border-radius: 50%;
		width:70%;
		aspect-ratio: 1;
		object-fit: cover;

	}
	}
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
			border-bottom: 4px solid #3a3f47;
		}
	}
</style>
