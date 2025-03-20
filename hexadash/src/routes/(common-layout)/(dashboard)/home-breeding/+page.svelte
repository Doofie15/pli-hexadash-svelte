<script>
	import { Container, Row, Col,Button} from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import OverviewCards from '@components/cards/OverviewCards.svelte';
	import overviewCardData from '@data/broverviewCard.json';
	import BreedingChart from '@view/dashboard/Breeding/BreedingChart.svelte';
	import BreedingTypeCart from '@view/dashboard/Breeding/BreedingTypeChart.svelte';
	import BreedingTable from '@view/dashboard/breeding/BreedingTable.svelte';
	import BreadcrumbThree from '../../../../lib/components/breadcrumbs/BreadcrumbThree.svelte';

	const overviewDataSorted = overviewCardData.slice(0, 4);

	const breadcrumbData = {
		pageTitle: 'Breeding',
		bcItem: 'Dashboard',
		bcItemActive: 'Breeding'
	};
	let cardStyle = 'overview-card-shape';
</script>

<svelte:head>
	<title>Breeding</title>
</svelte:head>



<div class="demo2 mb-25">
	<Container fluid>
		<Row>
			<Col lg={12}>
				<BreadcrumbThree {...breadcrumbData} />
			</Col>
			{#each overviewDataSorted as item}
				<Col xxl={3} sm={6} ssm={12} class="mb-25">
					<OverviewCards {...item} {cardStyle} />
				</Col>
			{/each}
			<Col xxl={6} class="mb-25">
				<BreedingChart />
			</Col>
			<Col xxl={6} class="mb-25">
				<BreedingTypeCart />
			</Col>
				<Col xxl={12} class="mb-25">
				<BreedingTable />
			</Col>
		</Row>
	</Container>
</div>
