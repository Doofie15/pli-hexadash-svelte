<script>
	import { Container, Row, Col,Button} from 'sveltestrap';
	import BreadcrumbWeaning  from '@components/breadcrumbs/BreadcrumbWeaning.svelte';
	import OverviewCards from '@components/cards/OverviewCards.svelte';
	import overviewCardData from '@data/PLIDATA/WeaningoverviewCard.json';
	import LambingChart from '@view/dashboard/lambing/LambingChart.svelte';
	import WeaningTypeCart from '@view/dashboard/weaning/WeaningTypeChart.svelte';
	import WeaningTable from '@view/dashboard/weaning/WeaningTable.svelte';
	

	const overviewDataSorted = overviewCardData.slice(0, 8);

	const breadcrumbData = {
		pageTitle: 'Weaning',
		bcItem: 'Dashboard',
		bcItemActive: 'Weaning'
	};

	let cardStyle = 'overview-card-shape';
</script>

<svelte:head>
	<title>Weaning</title>
</svelte:head>

<div class="demo2 mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbWeaning {...breadcrumbData} />
			</Col>
			{#each overviewDataSorted as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			<Col xxl={6} class="mb-25">
				<LambingChart />
			</Col>
		
			<Col xxl={6} class="mb-25">
				<WeaningTypeCart />
			</Col>
			<Col xxl={12} class="mb-25">
				<WeaningTable />
			</Col>
		</Row>
	</Container>
</div>

