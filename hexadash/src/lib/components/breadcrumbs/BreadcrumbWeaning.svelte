<script>
	import {
		Form,
		FormGroup,
		Input,
		Label,
		Button,
		Modal,
		ModalBody,
		ModalHeader,
	} from 'sveltestrap';
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';

	export let pageTitle = 'Dashboard';
	export let pageLabel = 'Weaning';
	export let bcItem = 'Dashboard';
	export let bcItem2 = '';
	export let bcItemActive = '';

	let open = false;
	let today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

	const toggle = () => (open = !open);

	</script>

<div class="breadcrumb-main">
	<h3 class="text-capitalize breadcrumb-title">{pageTitle}</h3>
	<div class="breadcrumb-action justify-content-center flex-wrap">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/"><i class="uil uil-estate" />{bcItem}</a></li>
				{#if bcItem2 !== ''}
					<li class="breadcrumb-item"><a href="/">{bcItem2}</a></li>
				{/if}
				<li class="breadcrumb-item active" aria-current="page">{bcItemActive}</li>
			</ol>
		</nav>
	</div>
</div>


<div class="breadcrumb-main">
	<div class="action-btn">
		<Button color="primary" class="px-15" on:click={toggle}>
			<i class="uil uil-plus fs-16" /> Add Weaning
		</Button>
		<Modal  isOpen={open} {toggle} class="new-member modal-dialog-auto">
			<ModalHeader {toggle}>
				<h6 class="modal-title fw-500">Create Weaning Record</h6>
			</ModalHeader>
			<ModalBody>
				<div class="new-member-modal">

					<form on:submit|preventDefault={toggle}>

						<div class="d-flex new-member-calendar custom-date-ranger custom-date-ranger__sm">
						<FormGroup class="w-100 form-group-calender">
								<Label for="datepicker2">Weaning Date</Label>
									<div class="custom-date-picker custom-date-picker__bottom custom-date-picker__lg">
   							 			<DatePicker bind:value={today} format="DD MMMM YYYY" />
    										<a href={'#'}> <img class="svg" alt="" src={'/img/svg/chevron-right.svg'} /></a>
									</div>
							</FormGroup>
						</div>
						
						<FormGroup class="mb-20">
							<Label>Group Name</Label>
							<Input type="select" class="js-example-basic-single js-states form-control" placeholder="Please Select">
								<option disabled selected value="">Please Select...</option>
								<option value="Group 1">Winter 2020</option>
								<option value="Group 2">Somer 2020</option>
							</Input>
						</FormGroup>
						<FormGroup class="mb-20">
							<Label># Ewes Weaned</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.65" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label># Rams Weaned</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.45" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label># Hoggets Weaned</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.50" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label>Total Lambs Weaned</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.100" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label>Total Kg Weaned (Kg)</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.2800" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label>Average Weaning Weight (Kg)</Label>
							<Input type="numeric" class="form-control" placeholder="Eg.28" />
						</FormGroup>
						<FormGroup class="mb-20">
							<Label>Notes</Label>
							<Input
								type="textarea"
								class="form-control"
								rows="3"
								placeholder="Notes"
							/>
						</FormGroup>
						<FormGroup class="mb-20">
							<Label>Upload File</Label>
							<div class="custom-tag-wrap">
				<div class="custom-upload">
					<div class="custom-upload__button">
						<a href={'#'} class="btn btn-lg btn-outline-light btn-upload">
							<img class="svg" alt="" src={'/img/svg/upload.svg'} />
							Click to Upload
						</a>
						<input type="file" name="upload-1" class="upload-one" id="upload-1" />
					</div>
					<div class="custom-upload__file">
						<ul />
					</div>
				</div>
			</div>

						</FormGroup>
						<div class="button-group d-flex pt-25">
							<Button color="primary" size="default" class="btn-squared text-capitalize"
								>Add Record
							</Button>

							<Button
								color="light"
								size="default"
								class="btn-squared fw-400 text-capitalize b-light color-light">cancel</Button
							>
						</div>
					</form>
				</div>
			</ModalBody>
		</Modal>
	</div>
</div>

<style lang="scss">
	:global {
		@import '../../../../src/assets/sass/components/breadcrumb';
		@import '../../../../src/assets/sass/components/users';
		@import '../../../../src/assets/sass/components/profile';
		@import '../../../assets/sass/components/progress-bar';
		@import '../../../assets/sass/components/responsive';
	}
</style>
