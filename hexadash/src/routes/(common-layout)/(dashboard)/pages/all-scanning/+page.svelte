<script>
	import { Row, Col, Container } from 'sveltestrap';
	import BreadcrumbOne from '$lib/components/breadcrumbs/BreadcrumbOne.svelte';
	import ScanningTableToolbox from '$lib/components/toolbox/ScanningTableToolbox.svelte';
	import ScanningTable from '$lib/view/scanning/ScanningTable.svelte';
	import PaginationBasic from '$lib/components/pagination/PaginationBasic.svelte';
	import { selectedScanningRows } from '$lib/stores/scanningStore';
	import { onDestroy } from 'svelte';

	let searchTerm = '';

	function handleSearch(event) {
		searchTerm = event.detail.searchTerm;
	}

	// Clear selected rows when navigating away from the page
	onDestroy(() => {
		$selectedScanningRows = [];
	});
</script>

<svelte:head>
	<title>All Scanning Records</title>
</svelte:head>

<Container fluid>
	<Row>
		<Col lg={12}>
			<BreadcrumbOne
				pageTitle="All Scanning"
				parentPageTitle="Scanning"
				parentPageUrl="/home-scanning"
			/>
		</Col>
	</Row>
</Container>

<Container fluid>
	<div class="orderPage mb-30">
		<Row>
			<Col lg={12}>
				<div class="orderDatatable py-30 px-sm-30 px-20 radius-xl w-100 mb-30 border-0 bg-white shadow-regular">
					<ScanningTableToolbox 
						buttonText="Scanning" 
						on:search={handleSearch}
					/>
					<ScanningTable />
					<PaginationBasic pageDropdown={true} />
				</div>
			</Col>
		</Row>
	</div>
</Container>

<style lang="scss">
	:global {
		@import '../../../../../assets/sass/mixins/functions';
		@import '../../../../../assets/sass/mixins/rfs';
		@import '../../../../../assets/sass/mixins/media-queries';
		@import '../../../../../assets/sass/components/table';
		@import '../../../../../assets/sass/components/cart';
	}
</style>
