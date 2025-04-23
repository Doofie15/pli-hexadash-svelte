<script>
	import { SearchIcon } from 'svelte-feather-icons';
	import { Input } from 'sveltestrap';
	import { selectedScanningRows } from '$lib/stores/scanningStore';
	import { createEventDispatcher } from 'svelte';

	export let buttonText;
	
	const dispatch = createEventDispatcher();
	let searchTerm = '';
	function handleSearch(event) {
		searchTerm = event.target.value;
		dispatch('search', { searchTerm });
	}

	function exportToCSV() {
		if ($selectedScanningRows.length === 0) {
			alert('Please select at least one row to export');
			return;
		}

		const headers = [
			'Group Name',
			'Scanning Date',
			'Scanning Agency',
			'Ewes Mated',
			'Ewes Scanned',
			'Ewes Pregnant',
			'Dry Ewes',
			'Conception %',
			'Singles',
			'Twins',
			'Triplets',
			'Expected Fetuses',
			'Lambing % (Pregnant)',
			'Lambing % (Scanned)',
			'Lambing % (Mated)',
			'Notes'
		];

		const csvContent = [
			headers.join(','),
			...$selectedScanningRows.map(record => [
				record.groupName,
				record.scanningDate,
				`"${(record.scanningAgency || '').replace(/"/g, '""')}"`,
				record.ewesMated || '',
				record.ewesScanned,
				record.ewesPregnant,
				record.dryEwes,
				record.conceptionRatio ? (record.conceptionRatio.toFixed(1) + '%') : '',
				record.ewesWithSingles,
				record.ewesWithTwins,
				record.ewesWithTrips,
				record.expFetuses,
				record.ewesPregnant > 0 ? (((record.expFetuses / record.ewesPregnant) * 100).toFixed(1) + '%') : '0%',
				record.expLambingPercentScanned ? (record.expLambingPercentScanned.toFixed(1) + '%') : '',
				record.expLambingPercentMated ? (record.expLambingPercentMated.toFixed(1) + '%') : '',
				`"${(record.notes || '').replace(/"/g, '""')}"`
			].join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `scanning_records_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="table-top-toolbox-wrap d-flex justify-content-between flex-wrap mb-25 mt-n10">
	<div class="toolbox-search global-shadow">
		<div class="toolbox-search__left">
			<div class="toolbox-search__form">
				<SearchIcon />
				<Input
					class="me-sm-2 border-0 box-shadow-none"
					type="Search"
					placeholder="Filter by keyword"
					bind:value={searchTerm}
					on:input={handleSearch}
				/>
			</div>
		</div>

		<div class="content-center mt-10">
			<div class="button-group m-0 mt-xl-0 mt-sm-10 order-button-group">
				<button 
					class="order-bg-opacity-secondary radius-md btn btn-sm color-secondary"
					on:click={exportToCSV}
				>
					Export
				</button>
				<button 
					class="btn-primary radius-md btn btn-sm"
					on:click={() => window.location.href = "/pages/page-add_scanning"}
				>
					<i class="la la-plus"></i> Add {buttonText}
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	:global {
		.selected {
			background-color: rgba(95, 99, 242, 0.1);
		}
	}
</style>
