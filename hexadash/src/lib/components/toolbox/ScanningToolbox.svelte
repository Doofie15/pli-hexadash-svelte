<script>
	import { SearchIcon } from 'svelte-feather-icons';
	import { Input } from 'sveltestrap';
	import { selectedBreedingRows } from '$lib/stores/breedingStore';
	import { createEventDispatcher } from 'svelte';

	export let buttonText;
	
	const dispatch = createEventDispatcher();
	let searchTerm = '';

	function handleSearch(event) {
		searchTerm = event.target.value;
		dispatch('search', { searchTerm });
	}

	function exportToCSV() {
		if ($selectedBreedingRows.length === 0) {
			alert('Please select at least one row to export');
			return;
		}

		const headers = [
			'Group Name',
			'Mating Type',
			'Status',
			'Ewes',
			'Rams',
			'Ram/Ewe Ratio %',
			'Start Date',
			'End Date',
			'Days',
			'Lambing Start',
			'Lambing End',
			'Mating Weight (kg)',
			'Production Year',
			'Notes'
		];

		const csvContent = [
			headers.join(','),
			...$selectedBreedingRows.map(record => [
				record.groupName,
				record.matingType,
				record.status,
				record.ewes,
				record.rams,
				record.ramEweRatio,
				record.startDate,
				record.endDate,
				record.days,
				record.lambingStartDate,
				record.lambingEndDate,
				record.averageMatingWeight,
				record.productionYear,
				`"${record.notes.replace(/"/g, '""')}"`
			].join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `breeding_records_${new Date().toISOString().split('T')[0]}.csv`);
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
			<div class="order-tab">
				<p>Mating Type :</p>
				<div class="data-filter-wrap">
					<ul class="nav px-1 data-filter-box">
						<li>
							<a class="active" href="#all">All</a>
						</li>
						<li>
							<a href="#natural">Natural Mating</a>
						</li>
						<li>
							<a href="#cervical">Cervical AI</a>
						</li>
						<li>
							<a href="#laparoscopic">Laparoscopic AI</a>
						</li>
					</ul>
				</div>
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
					on:click={() => window.location.href = "/pages/page-add_breeding"}
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
