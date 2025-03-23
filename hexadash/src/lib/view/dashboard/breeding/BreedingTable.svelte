<script>
	import {
		Card,
		CardHeader,
		CardBody
	} from 'sveltestrap';
	import breedingData from '@demo-data/breeding-records.json';
	import Breeding from '@components/tables/Breeding.svelte';
	
	// Create filtered data sets based on production year
	const currentYear = new Date().getFullYear();
	const fiveYearsAgo = currentYear - 5;
	
	const thisYearRecords = breedingData.records.filter(record => {
		const productionYear = new Date(record.lambingStartDate).getFullYear();
		return productionYear === currentYear;
	});
	
	const fiveYearRecords = breedingData.records.filter(record => {
		const productionYear = new Date(record.lambingStartDate).getFullYear();
		return productionYear >= fiveYearsAgo;
	});
	
	const allRecords = breedingData.records;
	
	// Create a data structure similar to what the component expects
	const periodData = {
		'today': thisYearRecords,
		'week': fiveYearRecords,
		'month': allRecords
	};
	
	let period = 'today';
	let currentTab = 'today';
	let dataPeriod = periodData[period];

	function changeData(data) {
		dataPeriod = periodData[data];
		currentTab = data;
	}
</script>

<Card class="border-0 px-25 best-sellers">
	<CardHeader class="px-0 border-0">
		<h6>Breeding</h6>

		<div class="card-extra">
			<ul class="card-tab-links nav">
				<li>
					<a on:click|preventDefault={()=> {
						changeData('today');
						}}
						href={'#'}
						class={currentTab === 'today' ? 'active' : ''}>This Year</a>
				</li>
				<li>
					<a on:click|preventDefault={()=> {
						changeData('week');
						}}
						href={'#'}
						class={currentTab === 'week' ? 'active' : ''}>5 Years</a>
				</li>
				<li>
					<a on:click|preventDefault={()=> {
						changeData('month');
						}}
						href={'#'}
						class={currentTab === 'month' ? 'active' : ''}>All</a>
				</li>
			</ul>
		</div>
	</CardHeader>
	<CardBody class="p-0">
		<Breeding {dataPeriod} />
	</CardBody>
</Card>

<style lang="scss">
	:global {
		.best-sellers {
			table.table--default {
				tr {
					td {
						&:last-child {
							padding-right: 15px !important;
						}
					}
				}
			}
		}
	}

	;
</style>