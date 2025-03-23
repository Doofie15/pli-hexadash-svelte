<script>
	import PaginationBasic from '@components/paginations/PaginationBasic.svelte';
	import { Container, Row, Col, Card, CardBody } from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import GroupsTable from '@lib/view/dashboard/Groups/GroupsTable.svelte';
	import TableToolbox from '@components/toolbox/TableToolboxgroups.svelte';
	
	let timeFilter = 'This Year';
	let searchTerm = '';

	function handleFilterChange(event) {
		timeFilter = event.detail.timeFilter;
	}

	function handleSearch(event) {
		searchTerm = event.detail.searchTerm;
	}

	const breadcrumbData = {
		pageTitle: 'Groups / Lambing Seasons',
		bcItem: 'Groups',
		bcItemActive: 'All Seasons & Groups'
	};
</script>

<svelte:head>
	<title>Groups / Lambing Seasons</title>
</svelte:head>

<div class="component-page mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbOne {...breadcrumbData} />
			</Col>
			<Col lg={12}>
				<Card>
					<CardBody>
						<TableToolbox 
							filtering={true} 
							buttonText="Group" 
							{timeFilter}
							on:filterChange={handleFilterChange}
							on:search={handleSearch}
						/>
						<GroupsTable {timeFilter} {searchTerm}></GroupsTable>
					</CardBody>
				</Card>
			</Col>
			<Col lg={12} >
				<PaginationBasic class="mt-20"></PaginationBasic>
			</Col>
		</Row>
	</Container>
</div>


<style lang="scss">
	:global {
		@import './../../../../assets/sass/mixins/functions';
		@import './../../../../assets/sass/mixins/rfs';
		@import './../../../../assets/sass/mixins/media-queries';
		@import './../../../../assets/sass/components/table';
		@import './../../../../assets/sass/components/cart';
	}
</style>
