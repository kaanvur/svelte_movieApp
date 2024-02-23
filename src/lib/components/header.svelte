<script lang="ts">
	export let pageTitle: string = 'Title';
	import imgBack from '$lib/images/arrow-left.svg';
	const icoref = pageTitle.toLowerCase().replace(/\s+/g, '-');
	const imageFolder = '/src/lib/images/';
</script>

<header>
	<a href="/"> <img src={imgBack} alt="" srcset="" /> </a>
	<p class="page-title">{pageTitle}</p>
	<img src="{imageFolder}{icoref}.svg" alt="" />
</header>

<style lang="scss">
	header {
		display: flex;
		font-size: 16px;
		font-weight: 600;
		.page-title {
			margin-inline: auto;
		}
	}
</style>
