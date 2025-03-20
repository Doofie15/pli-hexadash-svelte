<script>
	import { Container, Row, Col, Card, CardBody } from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import AddBreedingRecord from '../../../../../lib/view/dashboard/breeding/AddBreedingRecord.svelte';

	const breadcrumbData = {
		pageTitle: '',
		bcItem: 'Pages',
		bcItemActive: 'Starter'
	};
</script>

<svelte:head>
	<title></title>
</svelte:head>

<div class="component-page mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbOne {...breadcrumbData} />
			</Col>
			<Col lg={12}>
				<AddBreedingRecord></AddBreedingRecord>
			</Col>
		</Row>
	</Container>
</div>
