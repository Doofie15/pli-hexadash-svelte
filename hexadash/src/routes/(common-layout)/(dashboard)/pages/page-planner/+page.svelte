<script>
	import { Container, Row, Col, Card, CardBody, CardHeader } from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import PlannerTable from '@components/planner/planner.svelte'

	const breadcrumbData = {
		pageTitle: 'Planner',
		bcItem: 'Planner',
		bcItemActive: 'Add New Plan '
	};
</script>

<svelte:head>
	<title>Planner</title>
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
						<PlannerTable></PlannerTable>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>
