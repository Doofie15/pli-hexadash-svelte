<script>
	import {
		Card,
		CardHeader,
		CardBody
	} from 'sveltestrap';
	import scanData from '@demo-data/scanning-records.json';
	import Scanning from '@components/tables/Scanning.svelte';
	
	// Create filtered data sets based on scanning date year
	const currentYear = new Date().getFullYear();
	const fiveYearsAgo = currentYear - 5;
	
	const thisYearRecords = scanData.records.filter(record => {
		const scanYear = new Date(record.scanningDate).getFullYear();
		return scanYear === currentYear;
	});
	
	const fiveYearRecords = scanData.records.filter(record => {
		const scanYear = new Date(record.scanningDate).getFullYear();
		return scanYear >= fiveYearsAgo;
	});
	
	const allRecords = scanData.records;
	
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
		<h6>Scanning</h6>

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
		<Scanning {dataPeriod} />
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