<script>
	import AddWeaningRecord from './../../../../../lib/view/dashboard/weaning/AddWeaningRecord.svelte';
	import { Container, Row, Col, Card, CardBody } from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';


	const breadcrumbData = {
		pageTitle: '',
		bcItem: 'Weaning',
		bcItemActive: 'Add Weaning'
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
				<AddWeaningRecord></AddWeaningRecord>
			</Col>
		</Row>
	</Container>
</div>
