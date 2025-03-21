<script>
	import { onMount } from 'svelte';
	import { Table, Badge, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'sveltestrap';
	import breedingData from '@demo-data/breeding-records.json';
	import { selectedBreedingRows, allRowsSelected } from '$lib/stores/breedingStore';

	$: checked = false;
	function toggleCheck() {
		checked = !checked;
		if (checked) {
			$selectedBreedingRows = breedingData.records.filter(record => 
				record.matingType === matingType || matingType === 'All'
			);
		} else {
			$selectedBreedingRows = [];
		}
		$allRowsSelected = checked;
	}

	function toggleRowSelection(record) {
		if ($selectedBreedingRows.find(r => r.id === record.id)) {
			$selectedBreedingRows = $selectedBreedingRows.filter(r => r.id !== record.id);
		} else {
			$selectedBreedingRows = [...$selectedBreedingRows, record];
		}
		const visibleRecords = breedingData.records.filter(record => 
			record.matingType === matingType || matingType === 'All'
		);
		checked = $selectedBreedingRows.length === visibleRecords.length;
		$allRowsSelected = checked;
	}

	$: isRowSelected = (record) => $selectedBreedingRows.some(r => r.id === record.id);

	let matingType = 'All';
	$: matingType;
	
	function getStatusColor(type) {
		if (type === 'Natural Mating') return 'success';
		if (type === 'Cervical AI') return 'warning';
		if (type === 'Laparoscopic AI') return 'info';
		return 'danger';
	}

	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-GB');
	}

	onMount(() => {
		let sortLinks = document.querySelectorAll('.data-filter-box a');
		sortLinks.forEach((item) => {
			item.addEventListener('click', function () {
				matingType = this.innerText;
				$selectedBreedingRows = []; // Clear selection when filter changes
				checked = false;
				item
					.closest('.data-filter-box')
					.querySelectorAll('a')
					.forEach((elm) => {
						elm.classList.remove('active');
					});
				this.classList.add('active');
			});
		});
	});
</script>

<div class="table-responsive">
	<Table class="mb-0" borderless>
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
					<span class="userDatatable-title">Mating Type</span>
				</th>
				<th>
					<span class="userDatatable-title">Ewes Mated</span>
				</th>
				<th>
					<span class="userDatatable-title">Rams Used</span>
				</th>
				<th>
					<span class="userDatatable-title">Ram/Ewe Ratio %</span>
				</th>
				<th>
					<span class="userDatatable-title">Mating Start</span>
				</th>
				<th>
					<span class="userDatatable-title">Mating End</span>
				</th>
				<th>
					<span class="userDatatable-title">Days</span>
				</th>
				<th>
					<span class="userDatatable-title">Lambing Start</span>
				</th>
				<th>
					<span class="userDatatable-title">Lambing End</span>
				</th>
				<th>
					<span class="userDatatable-title">Mating Weight</span>
				</th>
				<th>
					<span class="userDatatable-title float-end">Action</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each breedingData.records as record, i}
				{#if record.matingType === matingType || matingType === 'All'}
					<tr class:selected={isRowSelected(record)}>
						<td>
							<div class="d-flex align-items-center">
								<div class="me-3 d-flex align-items-center">
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
						</td>
						<td>
							<div class="userDatatable-content d-inline-block">
								<Badge
									pill
									color={getStatusColor(record.matingType)}
									class="badge-transparent badge-{getStatusColor(record.matingType)}"
								>
									{record.matingType}
								</Badge>
							</div>
						</td>
						<td>
							<div class="userDatatable-title">{record.ewes}</div>
						</td>
						<td>
							<div class="userDatatable-title">{record.rams}</div>
						</td>
						<td>
							<div class="userDatatable-title">{record.ramEweRatio}</div>
						</td>
						<td>
							<div class="userDatatable-title">{formatDate(record.startDate)}</div>
						</td>
						<td>
							<div class="userDatatable-title">{formatDate(record.endDate)}</div>
						</td>
						<td>
							<div class="userDatatable-title">{record.days}</div>
						</td>
						<td>
							<div class="userDatatable-title">{formatDate(record.lambingStartDate)}</div>
						</td>
						<td>
							<div class="userDatatable-title">{formatDate(record.lambingEndDate)}</div>
						</td>
						<td>
							<div class="userDatatable-title">{record.averageMatingWeight} kg</div>
						</td>
						<td>
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
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</Table>
</div>

<style lang="scss">
	/* Table styles are imported from the parent component */
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
