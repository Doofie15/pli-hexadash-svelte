<script>
	import { Container, Row, Col } from 'sveltestrap';
	import BreadcrumbThree from '@components/breadcrumbs/BreadcrumbThree.svelte';
	import BreedingTable from '@view/dashboard/breeding/BreedingTable.svelte';

	const breadcrumbData = {
		pageTitle: 'All Breeding',
		bcItem: 'Dashboard',
		bcItemActive: 'All Breeding'
	};
</script>

<svelte:head>
	<title>All Breeding Records</title>
</svelte:head>

<div class="demo2 mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbThree {...breadcrumbData} />
			</Col>
			<Col xxl={12} class="mb-25">
				<BreedingTable />
			</Col>
		</Row>
	</Container>
</div>
