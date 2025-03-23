<script>
	import { onMount } from 'svelte';
	import { Table, Badge, ButtonGroup, Button } from 'sveltestrap';
	import groups from '@demo-data/groups.json';

	// Props from parent component
	export let timeFilter = 'This Year';
	export let searchTerm = '';

	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}

	// Filter by production year and search term
	const currentYear = new Date().getFullYear();
	
	$: filteredGroups = groups.filter(group => {
		// First filter by time period
		let timeFilterPassed = true;
		if (timeFilter === 'This Year') {
			timeFilterPassed = group.productionYear === currentYear;
		} else if (timeFilter === '5 Years') {
			timeFilterPassed = group.productionYear >= currentYear - 5;
		}
		
		// Then filter by search term if provided
		let searchFilterPassed = true;
		if (searchTerm && searchTerm.trim() !== '') {
			const term = searchTerm.toLowerCase();
			searchFilterPassed = 
				group.name.toLowerCase().includes(term) || 
				group.code.toLowerCase().includes(term) || 
				(group.matingType && group.matingType.toLowerCase().includes(term)) ||
				(group.status && group.status.toLowerCase().includes(term));
		}
		
		return timeFilterPassed && searchFilterPassed;
	});
</script>

<div class="d-flex justify-content-between align-items-center mb-3">
	<div>
		<h5 class="mb-0">Group Records</h5>
	</div>
</div>

<div class="table-responsive">
	<Table class="mb-0" borderless>
		<thead>
			<tr class="Datatable-header">
				<th>
					<div class="d-flex align-items-center">
						<div class="custom-checkbox check-all">
							<input class="checkbox" type="checkbox" id="check-all" on:click={toggleCheck} />
							<label for="check-all">Code</label>
						</div>
					</div>
				</th>
				<th>
					<span class="Datatable-title">Name</span>
				</th>
				<th>
					<span class="Datatable-title">Mating Type</span>
				</th>
				<th>
					<span class="Datatable-title">Mating Start</span>
				</th>
				<th>
					<span class="Datatable-title">Mating End</span>
				</th>
				<th>
					<span class="Datatable-title">Lambing Start</span>
				</th>
				<th>
					<span class="Datatable-title">Lambing End</span>
				</th>
				<th>
					<span class="Datatable-title">Status</span>
				</th>
				<th>
					<span class="Datatable-title float-end">Action</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredGroups as data, i}
				<tr>
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
												id="check-grp-content-{i}"
												{checked}
											/>
											<label for="check-grp-content-{i}" />
										</div>
									</div>
								</div>
								<div class="orderDatatable-title">{data.code}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="orderDatatable-title">{data.name}</div>
					</td>
					<td>
						<div class="groupDatatable-content d-inline-block">
							<Badge pill
								color={data.matingType === 'Natural Mating'
									? 'success'
									: data.matingType === 'Cervical AI'
									? 'info'
									: data.matingType === 'Laparoscopic AI'
									? 'info'
									: 'warning'}
								class="bg-{data.matingType === 'Natural Mating'
									? 'success'
									: data.matingType === 'Cervical AI'
									? 'info'
									: 'warning'}"
								>{data.matingType}
							</Badge>
						</div>
					</td>
					<td>
						<div class="Datatable-title">{data.matingStart}</div>
					</td>
					<td>
						<div class="Datatable-title">{data.matingEnd}</div>
					</td>
					<td>
						<div class="Datatable-title">{data.lambingStart}</div>
					</td>
					<td>
						<div class="Datatable-title">{data.lambingEnd}</div>
					</td>
					<td>
						<div class="groupDatatable-content d-inline-block">
							<Badge
								pill
								color={data.status === 'Active'
									? 'Success'
									: data.status === 'In Active'
									? 'danger'
									: 'warning'}
								class="bg-{data.status === 'Active'
									? 'success'
									: data.status === 'In Active'
									? 'danger'
									: 'danger'}"
								>{data.status}
							</Badge>
						</div>
					</td>
					<td>
						<ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
							<li>
								<a href={'#'} class="view">
									<i class="uil uil-eye" />
								</a>
							</li>
							<li>
								<a href={'#'} class="edit">
									<i class="uil uil-edit" />
								</a>
							</li>
							<li>
								<a href={'#'} class="remove">
									<i class="uil uil-trash-alt" />
								</a>
							</li>
						</ul>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="9" class="text-center py-4">
						<div class="empty-state">
							<p class="mb-0">No groups found matching your criteria</p>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</div>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/_table';
	}
</style>
