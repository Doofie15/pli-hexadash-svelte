<script>
	import { onMount } from 'svelte';
	import { Table, Badge } from 'sveltestrap';
	import groups from '@data/groups.json';

	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}

	let tableType = 'All';
	$: tableType;
	onMount(() => {
		let sortLinks = document.querySelectorAll('.data-filter-box a');
		sortLinks.forEach((item) => {
			item.addEventListener('click', function () {
				tableType = this.innerText;
				item
					.closest('.data-filter-box')
					.querySelectorAll('a')
					.forEach((elm) => {
						elm.classList.remove('Active');
					});
				this.classList.add('Active');
			});
		});
	});
</script>

<div class="table-responsive">
	<Table class="mb-0" borderless>
		<thead>
			<tr class="Datatable-header">
				<th>
					<div class="d-flex align-items-center">
						<div class="custom-checkbox  check-all">
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
			{#each groups as data, i}
				{#if data.matingtype === tableType}
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
									<div class="orderDatatable-title">{data.id}
									</div>
								</div>
							</div>
						</td>
						<td>
							<div class="orderDatatable-title">{data.customers}</div>
						</td>
						<td>
							<div class="Datatable-title">{data.matingstart}</div>
						</td>
						<td>
							<div class="Datatable-title">{data.date}</div>
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
				{:else if tableType === 'All'}
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
									color={data.matingtype === 'Natural Mating'
										? 'success'
										: data.matingtype === 'Cervical AI'
										? 'info'
										: data.matingtype === 'Laparoscopic AI'
										? 'info'
										: 'warning'}
									class="bg-{data.matingtype === 'Natural Mating'
										? 'success'
										: data.matingtype === 'Cervical AI'
										? 'info'
										: 'warning'}"
									>{data.matingtype}
								</Badge>
						</td>
						<td>
							<div class="Datatable-title">{data.matingstart}</div>
						</td>
						<td>
							<div class="Datatable-title">{data.matingend}</div>
						</td>
						<td>
							<div class="Datatable-title">{data.lambingstart}</div>
						</td>
						<td>
							<div class="Datatable-title">{data.lambingend}</div>
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
				{/if}
			{/each}
		</tbody>
	</Table>
</div>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/_table';
	}
</style>
