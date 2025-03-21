<script>
import BreadcrumbOne from '$lib/components/breadcrumbs/BreadcrumbOne.svelte';
import PaginationBasic from '$lib/components/pagination/PaginationBasic.svelte';
import { Container, Row, Col } from 'sveltestrap';
import BreedingTable from '$lib/view/breeding/BreedingTable.svelte';
import BreedingTableToolbox from '$lib/components/toolbox/BreedingTableToolbox.svelte';
import OverviewCards from '$lib/components/cards/OverviewCards.svelte';
import breedingData from '@demo-data/breeding-records.json';
import { onMount } from 'svelte';

const breadcrumbData = {
	pageTitle: 'All Breeding',
	bcItem: 'Breeding',
	bcItemActive: 'All Breeding'
};

// Calculate overview statistics
$: totalEwesMated = breedingData.records.reduce((sum, record) => sum + record.ewes, 0);
$: totalRamsUsed = breedingData.records.reduce((sum, record) => sum + record.rams, 0);
$: averageMatingDays = Math.round(breedingData.records.reduce((sum, record) => sum + record.days, 0) / breedingData.records.length);
$: totalMatingGroups = breedingData.records.length;

// Calculate growth rates (example values - these should be calculated from historical data)
const lastYearEwes = 95;
const lastYearRams = 96;
const lastYearDays = 31;
const lastYearGroups = 2;

$: ewesGrowthRate = Math.round(((totalEwesMated - lastYearEwes) / lastYearEwes) * 100);
$: ramsGrowthRate = Math.round(((totalRamsUsed - lastYearRams) / lastYearRams) * 100);
$: daysGrowthRate = Math.round(((averageMatingDays - lastYearDays) / lastYearDays) * 100);
$: groupsGrowthRate = Math.round(((totalMatingGroups - lastYearGroups) / lastYearGroups) * 100);
</script>

<svelte:head>
	<title>All Breeding Records</title>
</svelte:head>

<Container fluid>
	<Row>
		<Col lg={12}>
			<BreadcrumbOne {...breadcrumbData} />
		</Col>
	</Row>
</Container>

<Container fluid>
	<Row>
		<Col xxl={3} md={6} sm={6}>
			<OverviewCards
				type="primary"
				icon="users"
				total={totalEwesMated}
				label="Ewes Mated"
				growth={ewesGrowthRate >= 0 ? 'upward' : 'downward'}
				growthRate={Math.abs(ewesGrowthRate)}
				dataPeriod="Since Last Year"
				cardStyle="overview-card-shape"
			/>
		</Col>
		<Col xxl={3} md={6} sm={6}>
			<OverviewCards
				type="secondary"
				icon="user"
				total={totalRamsUsed}
				label="Rams Used"
				growth={ramsGrowthRate >= 0 ? 'upward' : 'downward'}
				growthRate={Math.abs(ramsGrowthRate)}
				dataPeriod="Since Last Year"
				cardStyle="overview-card-shape"
			/>
		</Col>
		<Col xxl={3} md={6} sm={6}>
			<OverviewCards
				type="success"
				icon="calendar-alt"
				total={averageMatingDays}
				suffix=" Days"
				label="Avg Mating Days"
				growth={daysGrowthRate >= 0 ? 'upward' : 'downward'}
				growthRate={Math.abs(daysGrowthRate)}
				dataPeriod="Since Last Year"
				cardStyle="overview-card-shape"
			/>
		</Col>
		<Col xxl={3} md={6} sm={6}>
			<OverviewCards
				type="warning"
				icon="layer-group"
				total={totalMatingGroups}
				label="# Mating Groups"
				growth={groupsGrowthRate >= 0 ? 'upward' : 'downward'}
				growthRate={Math.abs(groupsGrowthRate)}
				dataPeriod="Since Last Year"
				cardStyle="overview-card-shape"
			/>
		</Col>
	</Row>
</Container>

<Container fluid>
	<div class="orderPage mb-30">
		<Row>
			<Col lg={12}>
				<div class="orderDatatable py-30 px-sm-30 px-20 radius-xl w-100 mb-30 border-0 bg-white shadow-regular">
					<BreedingTableToolbox buttonText="Breeding" />
					<BreedingTable />
					<PaginationBasic pageDropdown={true} />
				</div>
			</Col>
		</Row>
	</div>
</Container>

<style lang="scss">
	:global {
		@import '../../../../../assets/sass/mixins/functions';
		@import '../../../../../assets/sass/mixins/rfs';
		@import '../../../../../assets/sass/mixins/media-queries';
		@import '../../../../../assets/sass/components/table';
		@import '../../../../../assets/sass/components/cart';
	}
</style>
