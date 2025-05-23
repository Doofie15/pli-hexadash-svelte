<script>
	import { onMount } from 'svelte';
	import { Table, Badge, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'sveltestrap';
	import scanningData from '@demo-data/scanning-records.json';
	import { selectedScanningRows, allScanningRowsSelected } from '$lib/stores/scanningStore';

	// Ensure we always have 10 rows for consistent table height
	const MIN_ROWS = 10;
	$: displayRecords = [...scanningData.records];
	$: emptyRowsNeeded = Math.max(0, MIN_ROWS - displayRecords.length);
	$: emptyRows = Array(emptyRowsNeeded).fill().map((_, i) => ({ 
		id: `empty-${i}`, 
		isEmpty: true,
		groupName: '',
		scanningDate: '',
		ewesMated: '',
		ewesScanned: '',
		ewesPregnant: '',
		dryEwes: '',
		conceptionRatio: '',
		ewesWithSingles: '',
		ewesWithTwins: '',
		ewesWithTrips: '',
		expFetuses: '',
		scanningAgency: ''
	}));

	$: checked = false;
	function toggleCheck() {
		checked = !checked;
		if (checked) {
			$selectedScanningRows = scanningData.records;
		} else {
			$selectedScanningRows = [];
		}
		$allScanningRowsSelected = checked;
	}

	function toggleRowSelection(record) {
		if ($selectedScanningRows.find(r => r.id === record.id)) {
			$selectedScanningRows = $selectedScanningRows.filter(r => r.id !== record.id);
		} else {
			$selectedScanningRows = [...$selectedScanningRows, record];
		}
		const visibleRecords = scanningData.records;
		checked = $selectedScanningRows.length === visibleRecords.length;
		$allScanningRowsSelected = checked;
	}

	$: isRowSelected = (record) => $selectedScanningRows.some(r => r.id === record.id);



	function getStatusColor(percentage) {
		if (!percentage) return 'danger';
		if (percentage >= 170) return 'success';
		if (percentage >= 150) return 'info';
		if (percentage >= 130) return 'warning';
		return 'danger';
	}
	
	function getLambingTextColor(percentage) {
		if (!percentage || percentage < 100) return 'text-danger';
		if (percentage >= 100 && percentage < 120) return 'text-warning';
		return 'text-success';
	}
	
	function getLambingPregnantTextColor(percentage) {
		if (!percentage || percentage < 120) return 'text-danger';
		if (percentage >= 120 && percentage < 160) return 'text-warning';
		return 'text-success';
	}

	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-GB');
	}

	function formatPercentage(value) {
		if (value === undefined || value === null || isNaN(value)) return '0.0%';
		return value.toFixed(1) + '%';
	}

	function getProductionYear(dateStr) {
		return new Date(dateStr).getFullYear();
	}


</script>

<div class="table-responsive">
	<Table hover class="table table-borderless compact-table">
		<thead>
			<tr class="userDatatable-header">
				<th>
					<div class="d-flex align-items-center">
						<div class="custom-checkbox check-all">
							<input 
								class="checkbox" 
								type="checkbox" 
								id="check-all" 
								on:click={toggleCheck}
								bind:checked={checked}
							/>
							<label for="check-all">Group Name</label>
						</div>
					</div>
				</th>
				<th>
					<span class="userDatatable-title">Scan Date</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Ewes Mated</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Ewes Scanned</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Ewes Pregnant</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Dry Ewes</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Conception %</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Singles</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Twins</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Triplets</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Exp. Fetuses</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Lambing % (Ewes Mated)</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Lambing % (Ewes Pregnant)</span>
				</th>
				<th>
					<span class="userDatatable-title text-center">Scanning Agency</span>
				</th>
				<th>
					<span class="userDatatable-title text-end">Action</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each [...displayRecords, ...emptyRows] as record, i}
					<tr class:selected={!record.isEmpty && isRowSelected(record)} class:empty-row={record.isEmpty}>
						<td>
							{#if !record.isEmpty}
							<div class="d-flex align-items-center">
								<div class="me-2 d-flex align-items-center">
									<div class="checkbox-group-wrapper">
										<div class="checkbox-group d-flex">
											<div
												class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
											>
												<input
													class="checkbox"
													type="checkbox"
													id="checkbox-{record.id}"
													checked={isRowSelected(record)}
													on:change={() => toggleRowSelection(record)}
												/>
												<label for="checkbox-{record.id}" />
											</div>
										</div>
									</div>
									<div class="orderDatatable-title">
										<p class="d-block mb-0">{record.groupName}</p>
									</div>
								</div>
							</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{formatDate(record.scanningDate)}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesMated || '-'}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesScanned}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesPregnant}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.dryEwes}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{formatPercentage(record.conceptionRatio)}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesWithSingles}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesWithTwins}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.ewesWithTrips}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.expFetuses}</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-content d-inline-block">
								<Badge
									pill
									color={getStatusColor(record.expLambingPercentMated)}
									class="badge-transparent {getLambingTextColor(record.ewesMated > 0 ? (record.expFetuses / record.ewesMated * 100) : 0)}"
								>
									{record.ewesMated > 0 ? formatPercentage(record.expFetuses / record.ewesMated * 100) : '0.0%'}
								</Badge>
							</div>
							{/if}
						</td>
						<td class="text-center">
							{#if !record.isEmpty}
							<div class="userDatatable-content d-inline-block">
								<Badge
									pill
									color={getStatusColor(record.ewesPregnant > 0 ? (record.expFetuses / record.ewesPregnant) * 100 : 0)}
									class="badge-transparent {getLambingPregnantTextColor(record.ewesPregnant > 0 ? (record.expFetuses / record.ewesPregnant) * 100 : 0)}"
								>
									{record.ewesPregnant > 0 ? formatPercentage((record.expFetuses / record.ewesPregnant) * 100) : '0.0%'}
								</Badge>
							</div>
							{/if}
						</td>
						<td class="text-end">
							{#if !record.isEmpty}
							<div class="userDatatable-title">{record.scanningAgency || '-'}</div>
							{/if}
						</td>
						<td>
							{#if !record.isEmpty}
							<div class="card-extra">
								<Dropdown nav>
									<DropdownToggle nav>
										<img class="svg" alt="" src="/img/svg/more-horizontal.svg" />
									</DropdownToggle>
									<DropdownMenu end>
										<DropdownItem href={'#'}>View</DropdownItem>
										<DropdownItem href={'#'}>Edit</DropdownItem>
										<DropdownItem href={'#'}>Delete</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
							{/if}
						</td>
					</tr>

			{/each}
		</tbody>
	</Table>
</div>

<style lang="scss">
	:global {
		.selected {
			background-color: rgba(95, 99, 242, 0.1);
		}
		
		.empty-row {
			height: 45px; /* Match the height of BreedingTable rows */
		}
		
		/* Make table more compact like BreedingTable */
		.compact-table {
			margin-bottom: 0;
			
			th, td {
				padding: 0.4rem 0.5rem;
				font-size: 14px;
				vertical-align: middle;
			}
			
			.userDatatable-title, .userDatatable-content {
				font-size: 14px;
				margin-bottom: 0;
			}
			
			.badge {
				padding: 0.25rem 0.5rem;
				font-size: 12px;
			}
		}
	}
	
	/* Card extra styles for action buttons */
	.card-extra {
		:global {
			.nav-link {
				padding: 0;
				svg {
					outline: 0;
				}
			}
		}
	}
</style>
