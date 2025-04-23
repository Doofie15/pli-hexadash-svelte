<script>
	import { Container, Row, Col } from 'sveltestrap';
	import BreadcrumbScanning from '@components/breadcrumbs/BreadcrumbScanning.svelte';
	import OverviewCards from '@components/cards/OverviewCards.svelte';
	import scanningOverviewData from '@demo-data/scanning-overview.js';
	import ScanChart from '@view/dashboard/scanning/ScanChart.svelte';
	import ScanTypeChart from '@view/dashboard/scanning/ScanTypeChart.svelte';
	import ScanTable from '@view/dashboard/scanning/ScanTable.svelte';

	// First row: Ewes Mated, Ewes Scanned, Ewes Pregnant, Dry Ewes
	const firstRowCards = scanningOverviewData.slice(0, 4);
	
	// Second row: Conception Ratio, Expected Lambs, Lambing % Scanned, Lambing % Mated
	const secondRowCards = scanningOverviewData.slice(4, 8);

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
				<BreadcrumbScanning {...breadcrumbData} />
			</Col>
			
			<!-- First Row of Overview Cards -->
			{#each firstRowCards as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			
			<!-- Second Row of Overview Cards -->
			{#each secondRowCards as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			
			<Col xxl={8} class="mb-25">
				<ScanChart />
			</Col>
			<Col xxl={4} class="mb-25">
				<ScanTypeChart />
			</Col>
			<Col xxl={12} class="mb-25">
				<ScanTable />
			</Col>
		</Row>
	</Container>
</div>
