<script>

	import { Container, Row, Col, Card, CardBody,Form,CardHeader,TabContent,TabPane,FormGroup,Label,Input,Button,} from 'sveltestrap';
	import BreadcrumbOne from '@components/breadcrumbs/BreadcrumbOne.svelte';
	import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
	import Select from 'svelte-select';

const items = [
		{ value: 'Sheep', label: 'Sheep' },
		{ value: 'Goats', label: 'Goats' }
	];
	const livestocktype = { value: 'Option One', label: 'Option One' };

	function showInputField() {
    var selection = document.getElementById("prefagency").value;
    var inputField = document.getElementById("otherAgency");
    if (selection === "Other") {
        inputField.style.display = "block";
    } else {
        inputField.style.display = "none";
    }
};

	

	const breadcrumbData = {
		pageTitle: 'Profile',
		bcItem: 'Accounts',
		bcItemActive: 'Profile'
	};
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="">
	<Container fluid class="mb-25">
	<Col lg={12}>
		
		<Row>
			<Col lg={12}>
				<BreadcrumbOne {...breadcrumbData} />
			</Col>
			<Col lg={12}>
				<Card>
					<CardHeader>
						<h6>Add Profile</h6>
					</CardHeader>
					<CardBody>
					<div class="custom-tab">
			<TabContent class="nav-tabs-global">
				<TabPane tabId="personalinfo" tab="Personal Info" active>
					<div class="edit-profile mt-25">
	<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="edit-profile__title">
				<h6>User Profile</h6>
				<span class="fs-13 color-light fw-400">Set up your personal information</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row>
				<Col lg={12}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							<Row class="justify-space-between">
								<Col lg={6}>
									<FormGroup class="mb-20 form-group ">
										<Label for="name">Name</Label>
										<Input type="text" class="form-control is-invalid" id="name" placeholder="Duran" required/>
									</FormGroup>
									
								</Col>
								<Col lg={6}>
									<FormGroup class="mb-20 form-group justify-inbetween">
                                        <Label for="surname">Surname</Label>
                                        <Input type="surname" class="form-control is-invalid" id="surname" placeholder="Clayton" required />
                                    </FormGroup>
                                </Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={6}>
									<FormGroup class="mb-20 form-group">
										<Label for="userdob">Date of Birth</Label>
										<div class="date-picker-list- ">
                                    <div class="custom-date-picker custom-date-picker__right custom-date-picker">
                                        <div class="form-group mb-0 form-group-calender">
                                            <div class="position-relative">
                                                <DatePicker id="weaningDate" format="DD MMMM YYYY" placeholder="Choose Date"/>
                                                <a href={'#'}>
                                                    <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
									</FormGroup>
									
								</Col>
								<Col lg={6}>
									<FormGroup class="mb-20 form-group justify-inbetween">
                                        <Label for="sex">Sex</Label>
                                         <Input type="select"  id=groupselect class="form-select form-control select-arrow-none ih-medium  radius-xs b-light shadow-none color-light  fs-14" placeholder="Please Select" required>
                                    <option disabled selected value="">Please Select...</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
									<option value="O">Other</option>
                                </Input>
                                    </FormGroup>
                                </Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={6}>
									<FormGroup class="mb-20 form-group">
										<Label for="phone">Mobile Number</Label>
										<Input type="phone" class="form-control is-invalid" id="phone" placeholder="+27 82 123 4567"  required/>
									</FormGroup>
									
								</Col>
								<Col lg={6}>
									<FormGroup class="mb-20 form-group justify-inbetween">
                                        <Label for="email">Email</Label>
                                        <Input type="email" class="form-control is-invalid" id="email" placeholder="email@gmail.com" required/>
                                    </FormGroup>
                                </Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={6}>
									<FormGroup class="mb-20 form-group">
										<Label for="occupation">Occupation</Label>
										<Input type="text" class="form-control" id="occupation" placeholder="Farmer" />
									</FormGroup>
									
								</Col>
								<Col lg={6}>
									<FormGroup class="mb-20 form-group justify-inbetween">
                                        <Label for="idnumber" class="il-gray fs-14 fw-500 align-center mb-10">ID Number (Optional)</Label>
                                        <Input type="text" class="form-control" id="idnumber" placeholder="Enter your ID Number" autocomplete="off"/>
                                    </FormGroup>
                                </Col>
								<Row class="mx-n15">
							<Col md={6} class="mb-20 px-15">
								<Label for="validationDefault03" class="il-gray fs-14 fw-500 align-center mb-10"
									>City</Label
								>
								<Input
									type="text"
									class="form-control  ih-medium ip-light radius-xs b-light is-invalid"
									id="validationDefault03"
									placeholder="City"
									required
								/>
							</Col>
							<Col md={3} class="mb-20 px-15">
								<Label for="validationDefault04" class="il-gray fs-14 fw-500 align-center mb-10"
									>Province</Label
								>
								<select class="form-select form-control  is-invalid select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
										id="validationDefault04"
										required>
									<option selected disabled value="">Province</option>
									<option>Gauteng</option>
									<option>Western Cape</option>
									<option>KwaZulu-Natal</option>
									<option>Eastern Cape</option>
									<option>Free State</option>
									<option>Limpopo</option>
									<option>Mpumalanga</option>
									<option>North West</option>
									<option>Northern Cape</option>
								</select>

							</Col>
							<Col md={3} class="mb-20 px-15">
								<Label for="validationDefault05" class="il-gray fs-14 fw-500 align-center mb-10"
									>Zip</Label
								>
								<Input
									type="text"
									class="form-control  ih-medium ip-light radius-xs b-light is-invalid"
									id="validationDefault05"
									placeholder="Zip"
									required
								/>
							</Col>
						</Row>
							</Row>
							
							
							
							<div class="button-group d-flex flex-wrap pt-30 mb-15">
								<Button
									color="primary"
									size="default"
									class="btn-squared me-15 text-capitalize btn-sm"
									>update profile
								</Button>

								<Button
									color="light"
									default="default"
									class="btn-squared fw-400 text-capitalize btn-sm btn-transparent-light"
									>cancel
								</Button>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
		</CardBody>
	</Card>
</div>
				</TabPane>
				<TabPane tabId="farmdetails" tab="Farm Details">
					<div class="edit-farm mt-25">
					<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="edit-profile__title">
				<h6>Farm Details</h6>
				<span class="fs-13 color-light fw-400">Set up your Farm Information</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row>
				<Col lg={12}>
					<div class="edit-profile__body mx-xl-20">
						<Form>
							<Row class="justify-space-between">
								<Col lg={2}>
									<FormGroup class="mb-20 form-group">
										<Label for="name">Producer Number</Label>
										<Input type="text" class="form-control" id="name" placeholder="Please provide producer number" />
									</FormGroup>
									
								</Col>
								<Col lg={6}>
									<FormGroup class="mb-20 form-group">
										<Label for="name">Farm Name / Company Name</Label>
										<Input type="text" class="form-control is-invalid" id="name" placeholder="Please provide farm name" required/>
									</FormGroup>
									
								</Col>
								<Col lg={4}>
									<FormGroup class="mb-20 form-group justify-inbetween">
                                        <Label for="tradename">Trade Name</Label>
                                        <Input type="text" class="form-control is-invalid" id="tradename" placeholder="Please provide trade name" required />
                                    </FormGroup>
                                </Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={3}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmsize">Farm Size (Ha)</Label>
										 <Input type="numeric" class="form-control is-invalid" id="tradename" placeholder="Provide Total Farm Size (Ha)" required />
									</FormGroup>
								</Col>
								<Col lg={3}>
                                </Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={3}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmadres">Farm Adress</Label>
										 <Input type="adress" class="form-control is-invalid" id="farmadres" placeholder="Farm 393" required />
									</FormGroup>
									
								</Col>
								<Col lg={2}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmcity">City</Label>
										 <Input type="adress" class="form-control is-invalid" id="farmcity" placeholder="Please provide closest city" required />
									</FormGroup>
                                </Col>
								<Col lg={2}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmzip">Province</Label>
										 <select class="form-select is-invalid form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
												id="farmcity" placeholder="Please select a city"
												required>
											<option selected disabled value="">Province</option>
											<option>Gauteng</option>
											<option>Western Cape</option>
											<option>KwaZulu-Natal</option>
											<option>Eastern Cape</option>
											<option>Free State</option>
											<option>Limpopo</option>
											<option>Mpumalanga</option>
											<option>North West</option>
											<option>Northern Cape</option>
										</select>
									</FormGroup>
                                </Col>
								<Col lg={2}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmzip">Zipcode</Label>
										 <Input type="numeric" class="form-control is-invalid" id="farmzip" placeholder="Zip code" required />
									</FormGroup>
                                </Col>
								<Col lg={2}>
									<FormGroup class="mb-20 form-group">
										<Label for="farmzip">Country</Label>
										 <select class="form-select form-control is-invalid select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
												id="country" placeholder="Please select country" required>
											<option selected disabled value="">Country</option>
											<option default>South Africa</option>
											<option>Other</option>
										</select>
									</FormGroup>
                                </Col>
							</Row>
							
							<hr class="mb-20">
						<Row>
								<Col lg={6}>
									<h5 class="mb-20">Production Information</h5>
									<Row class="justify-space-between">

										<Col md={6} class="mb-20 px-15 is-invalid">
											<Label for="validationDefault04" class="il-gray fs-14 fw-500 align-center mb-10">Livestock Type</Label>
												<div class="custom-tag-mode is-invalid">
													<div class="custom-select is-invalid">
														<div class="custom-select is-invalid ">
															<Select {items} isMulti={true} required class=" form-control is-invalid"/>
														</div>
													</div>
												</div>
										</Col>
										<Col lg={6}>
											<FormGroup class="mb-20 form-group justify-inbetween">
												<Label for="numberofproductionewes">Number of production ewes</Label>
												<Input type="numeric" class="form-control" id="numberproductionewes" placeholder="Number of production ewes" />
											</FormGroup>
										</Col>
									</Row>
									<Row class="justify-space-between">
										<Col lg={6}>

										<!--Would like to have this as a multiselect-->

											<FormGroup class="mb-20 form-group">
												<Label for="breedSelect">Breed</Label>
												<select class="form-control " id="breedSelect">
													<option selected disabled>Please select breed</option>
													<!-- Sheep Breeds -->
													<optgroup label="Sheep Breeds">
														<option>Merino</option>
														<option>Dohne Merino</option>
														<option>Dormer</option>
														<option>Other</option>
													</optgroup>
													<!-- Goat Breeds -->
													<optgroup label="Goat Breeds">
														<option>Angora</option>
													</optgroup>
												</select>
											</FormGroup>
										</Col>
										<Col lg={6}>
											<FormGroup class="mb-20 form-group justify-inbetween">
												<Label for="idnumber" class="il-gray fs-14 fw-500 align-center mb-10">Farming Catagory</Label>
												<select class="form-select form-control  select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
														id="farmType" required>
													<option selected disabled value="">Please select a category</option>
													<option value="100-livestock">100% Livestock</option>
													<option value="75-livestock-25-cropping">75% Livestock - 25% Cropping</option>
													<option value="50-livestock-50-cropping">50% Livestock - 50% Cropping</option>
													<option value="25-livestock-75-cropping">25% Livestock - 75% Cropping</option>
													<option value="cropping">Cropping</option>
													<option value="feedlot">Feedlot</option>
													<option value="other">Other</option>
												</select>
											</FormGroup>
										</Col>
									</Row>
									<hr>

									<Row class="justify-space-between">

										<Col md={6} class="mb-20 px-15">
											<Label for="prefagency" class="il-gray fs-14 fw-500 align-center mb-10">Preferred Livestock Agency</Label>
											<select class="form-select form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
													id="prefagency" onchange="showInputField()" required>
												<option selected disabled value="">Please select a category</option>
												<option value="BKB">BKB</option>
												<option value="OVK">OVK</option>
												<option value="Vleis Sentraal">Vleis Sentraal</option>
												<option value="Other">Other</option>
											</select>
											<input type="text" id="otherAgency" class="form-control mt-2" placeholder="Please specify" style="display: none;" />
										</Col>
										<Col lg={6}>
											<Label for="prefagency" class="il-gray fs-14 fw-500 align-center mb-10">Preferred Livestock Category</Label>
											<select class="form-select form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14"
													id="prefagency" onchange="showInputField()" required>
												<option selected disabled value="">Please select a category</option>
												<option value="Stud">Stud</option>
												<option value="Commercial">Commercial</option>
												<option value="Stud & Commercial">Stud & Commercial</option>
												<option value="Other">Other</option>
											</select>
											<input type="text" id="otherAgency" class="form-control mt-2" placeholder="Please specify" style="display: none;" />
										</Col>
									</Row>
									<Row class="justify-space-between">

										<Col lg={6}>
											<Label for="prefagency" class="il-gray fs-14 fw-500 align-center mb-10">Preferred Abattoir</Label>
											<Input type="text" class="form-control" id="occupation" placeholder="Please give name of abattoir" />
										</Col>
										<Col lg={6}>
											<Label for="prefagency" class="il-gray fs-14 fw-500 align-center mb-10">Preferred Veterinarian</Label>
											<Input type="text" class="form-control" id="occupation" placeholder="Please give name of veterinarian" />
										</Col>
									</Row>
								</Col>
							</Row>
							<Row class="justify-space-between">
								<Col lg={6}>
									
								</Col>
							</Row>
					
						


							
							
							
							<div class="button-group d-flex flex-wrap pt-30 mb-15">
								<Button
									color="primary"
									size="default"
									class="btn-squared me-15 text-capitalize btn-sm"
									>update profile
								</Button>

								<Button
									color="light"
									default="default"
									class="btn-squared fw-400 text-capitalize btn-sm btn-transparent-light"
									>cancel
								</Button>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
		</CardBody>
	</Card>
				</TabPane>
				<TabPane tabId="billing" tab="Billing Info">
					<p>Tab Three contents</p>
				</TabPane>
				<TabPane tabId="billing" tab="Additional">
					<p>Tab Three contents</p>
				</TabPane>
			</TabContent>
		</div>
					</CardBody>
				</Card>
			</Col>
		</Row>

	</Col>
	</Container>
</div>
