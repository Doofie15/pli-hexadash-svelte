<script>
	import {
		Button,
		Col
	} from 'sveltestrap';
	import { goto } from '$app/navigation';

	export let pageTitle = 'Dashboard';
	export let bcItem = 'Dashboard';
	export let bcItem2 = '';
	export let bcItemActive = '';

	const navigateToAddBreeding = () => {
		goto('/pages/page-add_breeding');
	};
</script>

<div class="breadcrumb-main">
	<h3 class="text-capitalize breadcrumb-title">{pageTitle}</h3>
	<div class="breadcrumb-action justify-content-center flex-wrap">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/"><i class="uil uil-estate" />{bcItem}</a></li>
				{#if bcItem2 !== ''}
					<li class="breadcrumb-item"><a href="/">{bcItem2}</a></li>
				{/if}
				<li class="breadcrumb-item active" aria-current="page">{bcItemActive}</li>
			</ol>
		</nav>
	</div>
</div>

<div class="breadcrumb-main">
	<div class="action-btn">
		<Button color="primary" class="px-15" on:click={navigateToAddBreeding}>
			<i class="uil uil-plus fs-16" /> Add Breeding
		</Button>
	</div>
</div>

<style lang="scss">
	:global {
		.breadcrumb-main {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}
	}
</style>
