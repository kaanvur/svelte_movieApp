<script>
	import PopularTab from '$lib/components/popular-tab.svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import Slider from '$lib/components/slider.svelte';
</script>

<h1>What do you want to watch?</h1>
<SearchBox></SearchBox>
<Slider></Slider>
<PopularTab></PopularTab>

<style lang="scss">
	h1 {
		font-size: 18px;
		font-weight: 600;
		line-height: 27px;
	}
</style>
