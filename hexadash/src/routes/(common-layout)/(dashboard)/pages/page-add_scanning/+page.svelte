<script>
	import { Container, Row, Col, Card, CardBody } from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import AddScanningRecord from '../../../../../lib/view/dashboard/scanning/AddScanningRecord.svelte';

	const breadcrumbData = {
		pageTitle: '',
		bcItem: 'Scanning',
		bcItemActive: 'Add Scanning'
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
				<AddScanningRecord></AddScanningRecord>
			</Col>
		</Row>
	</Container>
</div>
