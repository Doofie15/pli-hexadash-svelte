<script>
	import { onMount } from 'svelte';
	import { Table, Badge, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'sveltestrap';
	
	// Props
	export let tableData = { records: [] };
	export let selectedRows = [];
	export let allRowsSelected = false;
	export let tableColumns = [];
	export let primaryKeyField = 'id';
	export let labelField = 'name';
	export let onRowSelectionChange = () => {};
	export let onAllRowsSelectionChange = () => {};
	
	// Local state
	let checked = false;
	
	// Toggle all rows selection
	function toggleCheck() {
		checked = !checked;
		if (checked) {
			selectedRows = [...tableData.records];
		} else {
			selectedRows = [];
		}
		allRowsSelected = checked;
		onAllRowsSelectionChange(checked);
	}

	// Toggle single row selection
	function toggleRowSelection(record) {
		if (selectedRows.find(r => r[primaryKeyField] === record[primaryKeyField])) {
			selectedRows = selectedRows.filter(r => r[primaryKeyField] !== record[primaryKeyField]);
		} else {
			selectedRows = [...selectedRows, record];
		}
		const visibleRecords = tableData.records;
		checked = selectedRows.length === visibleRecords.length;
		allRowsSelected = checked;
		onRowSelectionChange(selectedRows);
	}

	// Check if a row is selected
	$: isRowSelected = (record) => selectedRows.some(r => r[primaryKeyField] === record[primaryKeyField]);
	
	// Utility functions
	function formatDate(dateStr) {
		if (!dateStr) return '-';
		return new Date(dateStr).toLocaleDateString('en-GB');
	}

	function formatPercentage(value) {
		if (value === undefined || value === null || isNaN(value)) return '0.0%';
		return value.toFixed(1) + '%';
	}
	
	function getStatusColor(value, thresholds) {
		if (!value) return thresholds.default || 'danger';
		
		for (const threshold of thresholds.levels) {
			if (value >= threshold.value) {
				return threshold.color;
			}
		}
		
		return thresholds.default || 'danger';
	}
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
							<label for="check-all">{tableColumns[0]?.title || 'Name'}</label>
						</div>
					</div>
				</th>
				{#each tableColumns.slice(1) as column, i}
					<th>
						<span class="userDatatable-title {column.align || 'text-center'}">{column.title}</span>
					</th>
				{/each}
				<th>
					<span class="userDatatable-title text-end">Action</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData.records as record, i}
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
												id="checkbox-{record[primaryKeyField]}"
												checked={isRowSelected(record)}
												on:change={() => toggleRowSelection(record)}
											/>
											<label for="checkbox-{record[primaryKeyField]}" />
										</div>
									</div>
								</div>
								<div class="orderDatatable-title">
									<p class="d-block mb-0">{record[labelField]}</p>
								</div>
							</div>
						</div>
					</td>
					{#each tableColumns.slice(1) as column, i}
						<td class="{column.align || 'text-center'}">
							{#if column.type === 'date'}
								<div class="userDatatable-title">{formatDate(record[column.field])}</div>
							{:else if column.type === 'percentage'}
								<div class="userDatatable-title">{formatPercentage(record[column.field])}</div>
							{:else if column.type === 'badge'}
								<div class="userDatatable-content d-inline-block">
									<Badge
										pill
										color={getStatusColor(record[column.field], column.thresholds)}
										class="badge-transparent {column.textColorClass ? column.textColorClass(record[column.field]) : ''}"
									>
										{column.format ? column.format(record[column.field]) : record[column.field] || '-'}
									</Badge>
								</div>
							{:else}
								<div class="userDatatable-title">{record[column.field] || '-'}</div>
							{/if}
						</td>
					{/each}
					<td>
						<div class="card-extra">
							<Dropdown nav>
								<DropdownToggle nav>
									<img class="svg" alt="" src="/img/svg/more-horizontal.svg" />
								</DropdownToggle>
								<DropdownMenu end>
									<DropdownItem href={`#/view/${record[primaryKeyField]}`}>View</DropdownItem>
									<DropdownItem href={`#/edit/${record[primaryKeyField]}`}>Edit</DropdownItem>
									<DropdownItem href={'#'}>Delete</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
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
	}
</style>
