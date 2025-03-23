<script>
	import { SearchIcon } from 'svelte-feather-icons';
	import { Input } from 'sveltestrap';
	import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'sveltestrap';
	import { createEventDispatcher } from 'svelte';

	export let filtering = true;
	export let buttonText = "Group";
	export let timeFilter = 'This Year';

	const dispatch = createEventDispatcher();

	let showModal = false; // This variable will control the visibility of the modal
	let searchTerm = '';

	// Function to open the modal
	function openModal() {
		showModal = true;
	}

	// Function to close the modal
	function closeModal() {
		showModal = false;
	}

	function handleSearch(event) {
		searchTerm = event.target.value;
		dispatch('search', { searchTerm });
	}

	function handleTimeFilterClick(event, filter) {
		event.preventDefault();
		timeFilter = filter;
		dispatch('filterChange', { timeFilter });
	}

	function exportToCSV() {
		// Placeholder for export functionality
		alert('Export functionality will be implemented here');
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
					value={searchTerm}
					on:input={handleSearch}
				/>
			</div>
			{#if filtering === true}
				<div class="order-tab">
					<p>Time Period :</p>
					<div class="data-filter-wrap">
						<ul class="nav px-1 data-filter-box">
							<li>
								<a class={timeFilter === 'This Year' ? 'active' : ''} href="#thisyear" on:click={(e) => handleTimeFilterClick(e, 'This Year')}>This Year</a>
							</li>
							<li>
								<a class={timeFilter === '5 Years' ? 'active' : ''} href="#5years" on:click={(e) => handleTimeFilterClick(e, '5 Years')}>5 Years</a>
							</li>
							<li>
								<a class={timeFilter === 'All' ? 'active' : ''} href="#all" on:click={(e) => handleTimeFilterClick(e, 'All')}>All</a>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div class="content-center mt-10">
			<div class="button-group m-0 mt-xl-0 mt-sm-10 order-button-group">
				<button 
					class="order-bg-opacity-secondary radius-md btn btn-sm color-secondary"
					on:click={exportToCSV}
				>
					Export
				</button>
				<button class="btn-primary radius-md btn btn-sm" on:click={openModal}>
					<i class="la la-plus"></i> Add {buttonText}
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal for adding a new group -->
<Modal isOpen={showModal} toggle={closeModal} size="lg">
	<ModalHeader toggle={closeModal}>Add New {buttonText}</ModalHeader>
	<ModalBody>
		<FormGroup>
			<Label for="groupName">Group Name</Label>
			<Input type="text" name="groupName" id="groupName" placeholder="Enter group name" />
		</FormGroup>
		<FormGroup>
			<Label for="groupDescription">Description</Label>
			<Input type="textarea" name="groupDescription" id="groupDescription" placeholder="Enter description" />
		</FormGroup>
		<FormGroup>
			<Label for="matingType">Mating Type</Label>
			<Input type="select" name="matingType" id="matingType">
				<option>Natural Mating</option>
				<option>Cervical AI</option>
				<option>Laparoscopic AI</option>
			</Input>
		</FormGroup>
		<div class="row">
			<div class="col-md-6">
				<FormGroup>
					<Label for="matingStart">Mating Start Date</Label>
					<Input type="date" name="matingStart" id="matingStart" />
				</FormGroup>
			</div>
			<div class="col-md-6">
				<FormGroup>
					<Label for="matingEnd">Mating End Date</Label>
					<Input type="date" name="matingEnd" id="matingEnd" />
				</FormGroup>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<FormGroup>
					<Label for="lambingStart">Expected Lambing Start</Label>
					<Input type="date" name="lambingStart" id="lambingStart" />
				</FormGroup>
			</div>
			<div class="col-md-6">
				<FormGroup>
					<Label for="lambingEnd">Expected Lambing End</Label>
					<Input type="date" name="lambingEnd" id="lambingEnd" />
				</FormGroup>
			</div>
		</div>
	</ModalBody>
	<ModalFooter>
		<button class="btn btn-secondary" on:click={closeModal}>Cancel</button>
		<button class="btn btn-primary" on:click={closeModal}>Save changes</button>
	</ModalFooter>
</Modal>
