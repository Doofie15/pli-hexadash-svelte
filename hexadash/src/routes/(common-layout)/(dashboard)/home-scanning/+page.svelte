<script>
	import { Container, Row, Col } from 'sveltestrap';
	import BreadcrumbFour from '@components/breadcrumbs/BreadcrumbFour.svelte';
	import OverviewCards from '@components/cards/OverviewCards.svelte';
	import scoverviewCardData from '@data/scoverviewCard.json';
	import ScanChart from '@view/dashboard/scanning/ScanChart.svelte';
	import RevenueGenerated from '@view/dashboard/scanning/Scanmakeup.svelte';
	import DashTable from '@view/dashboard/scanning/ScanTable.svelte';

	const overviewDataSorted = scoverviewCardData.slice(0, 8);

	const breadcrumbData = {
		pageTitle: 'Scanning',
		bcItem: 'Dashboard',
		bcItemActive: 'Scanning'
	};
	let cardStyle = 'overview-card-shape';
</script>

<svelte:head>
	<title>Scanning</title>
</svelte:head>

<div class="demo2 mb-25">
	
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbFour {...breadcrumbData} />
			</Col>
			{#each overviewDataSorted as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			<Col xxl={6} class="mb-25">
				<ScanChart />
			</Col>
			<Col xxl={6} class="mb-25">
				<RevenueGenerated />
			</Col>
			<Col xxl={12} class="mb-25">
				<DashTable />
			</Col>
		</Row>
	</Container>
</div>
