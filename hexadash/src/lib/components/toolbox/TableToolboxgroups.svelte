<script>
	import { SearchIcon } from 'svelte-feather-icons';
	import { Input } from 'sveltestrap';
	import { Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Label } from 'sveltestrap';

	export let filtering;
	export let buttonText;

	let showModal = false; // This variable will control the visibility of the modal

  // Function to open the modal
  function openModal() {
    showModal = true;
  }

  // Function to close the modal
  function closeModal() {
    showModal = false;
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
				/>
			</div>
			{#if filtering === true}
				<div class="order-tab">
					<p>Status :</p>
					<div class="data-filter-wrap">
						<ul class="nav px-1 data-filter-box">
							<li>
								<a class="active" href="#all">All</a>
							</li>
							<li>
								<a href="#active">Active</a>
							</li>
							<li>
								<a href="#inactive">Inactive</a>
							</li>
							<li>
								<a href="#compliant">Compliant</a>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div class="content-center mt-10">
			<div class="button-group m-0 mt-xl-0 mt-sm-10 order-button-group">
				<button class="order-bg-opacity-secondary radius-md btn btn-sm color-primary">
					Export
				</button>
				<button class="btn-primary radius-md btn btn-sm" on:click={openModal}>
					<i class="la la-plus"></i> Add {buttonText}
				  </button>
				  
				  {#if showModal} <!-- This conditionally renders the modal based on `showModal` -->
					<Modal isOpen={showModal} toggle={closeModal}>
					  <ModalHeader toggle={closeModal}>Add New Group / Lambing Season</ModalHeader>
					  <ModalBody>
						<div class="new-member-modal">
							<FormGroup class="mb-20">
								<Label>Code</Label>
								<Input type="abbreviation" class="form-control" placeholder="Eg. 2024-01" />
							</FormGroup>
							<FormGroup class="mb-20">
								<Label>Name</Label>
								<Input type="name" class="form-control" placeholder="Please Enter a Name Eg. Somer 2024" />
							</FormGroup>
						</div>
					  </ModalBody>
					  		
					  <ModalFooter>
						<button class="btn btn-secondary" on:click={closeModal}>Close</button>
						<button class="btn btn-primary" on:click={closeModal} >Save changes</button>
					  </ModalFooter>
					</Modal>
				  {/if}
			</div>
		</div>
	</div>
</div>
