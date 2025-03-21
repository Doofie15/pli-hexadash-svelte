<script>
	import { onMount } from 'svelte';
	import { Table, Badge } from 'sveltestrap';
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
					<span class="userDatatable-title">Ewes</span>
				</th>
				<th>
					<span class="userDatatable-title">Rams</span>
				</th>
				<th>
					<span class="userDatatable-title">Start Date</span>
				</th>
				<th>
					<span class="userDatatable-title">End Date</span>
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
							<div class="userDatatable-title">{formatDate(record.startDate)}</div>
						</td>
						<td>
							<div class="userDatatable-title">{formatDate(record.endDate)}</div>
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
				{/if}
			{/each}
		</tbody>
	</Table>
</div>

<style>
	/* Table styles are imported from the parent component */
</style>
