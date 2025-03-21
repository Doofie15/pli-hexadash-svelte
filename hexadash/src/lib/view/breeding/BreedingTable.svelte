<script>
	import { onMount } from 'svelte';
	import { Table, Badge, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'sveltestrap';
	import breedingData from '@demo-data/breeding-records.json';

	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}

	let matingType = 'All';
	$: matingType;
	
	function formatDate(dateString) {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			month: 'long', 
			day: 'numeric', 
			year: 'numeric' 
		});
	}
	
	function getStatusColor(type) {
		if (type === 'Natural Mating') return 'success';
		if (type === 'Cervical AI') return 'warning';
		if (type === 'Laparoscopic AI') return 'info';
		return 'danger';
	}
	
	onMount(() => {
		let sortLinks = document.querySelectorAll('.data-filter-box a');
		sortLinks.forEach((item) => {
			item.addEventListener('click', function () {
				matingType = this.innerText;
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
							<input class="checkbox" type="checkbox" id="check-all" on:click={toggleCheck} />
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
