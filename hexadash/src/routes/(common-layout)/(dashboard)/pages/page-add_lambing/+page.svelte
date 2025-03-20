<script>
	import AddLambingRecord from '../../../../../lib/view/dashboard/lambing/AddLambingRecord.svelte';
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
				<AddLambingRecord></AddLambingRecord>
			</Col>
		</Row>
	</Container>
</div>
