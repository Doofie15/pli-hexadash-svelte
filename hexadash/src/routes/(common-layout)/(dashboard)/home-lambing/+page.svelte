<script>
	import { Container, Row, Col,Button} from 'sveltestrap';
	import BreadcrumbLambing from '@components/breadcrumbs/BreadcrumbLambing.svelte';
	import OverviewCards from '@components/cards/OverviewCards.svelte';
	import overviewCardData from '@data/PLIDATA/LambingoverviewCard.json';
	import LambingChart from '@view/dashboard/lambing/LambingChart.svelte';
	import LambingTypeCart from '@view/dashboard/lambing/LambingTypeChart.svelte';
	import LambingTable from '@view/dashboard/lambing/LambingTable.svelte';
	import AddLambingChart from '@view/dashboard/lambing/LambingPrefChart.svelte';

	const overviewDataSorted = overviewCardData.slice(0, 8);

	const breadcrumbData = {
		pageTitle: 'Lambing',
		bcItem: 'Dashboard',
		bcItemActive: 'Lambing'
	};

	let cardStyle = 'overview-card-shape';
</script>

<svelte:head>
	<title>Lambing</title>
</svelte:head>

<div class="demo2 mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbLambing {...breadcrumbData} />
			</Col>
			{#each overviewDataSorted as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			<Col xxl={12} class="mb-25">
				<LambingChart />
			</Col>
		</Row>
		<Row>
			<Col xxl={6} class="mb-25">
				<LambingTypeCart />
			</Col>
			<Col xxl={6} class="mb-25">
				<AddLambingChart />
			</Col>
				<Col xxl={12} class="mb-25">
				<LambingTable />
			</Col>
		</Row>
	</Container>
</div>

