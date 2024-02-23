<script>
	import PopularTab from '$lib/components/popular-tab.svelte';
	import Slider from '$lib/components/slider.svelte';
	import { goto } from '$app/navigation';
</script>

<h1>What do you want to watch?</h1>
<input type="text" on:focus={() => goto('/search')}  placeholder="Search" />
<Slider></Slider>
<PopularTab></PopularTab>

<style lang="scss">
	h1 {
		font-size: 18px;
		font-weight: 600;
		line-height: 27px;
	}
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
