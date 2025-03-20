<script>
    import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { onMount } from 'svelte';

    
    // other imports and code
    let numberOfEwesScanned = 0;
    let numberOfEwesPregnant = 0;
    let conceptionRatio = 0;
    let numberOfDryEwes; // This will hold the calculated or user-edited value
    let userEditedDryEwes = false; // This flag will determine if the user has edited the value
  
    let singleEwes = 0;
    let twinEwes = 0;
    let tripletEwes = 0;
    let expectedNumberOfLambs = 0;

    let expLambingPercentEwesScanned = 0;
    let expLambingEwesPregnant = 0;
    

    // Whenever numberOfEwesScanned or numberOfEwesPregnant changes, update conceptionRatio
    $: if (numberOfEwesScanned > 0 && numberOfEwesPregnant >= 0) {
        conceptionRatio = (numberOfEwesPregnant / numberOfEwesScanned) * 100;
    } else {
        conceptionRatio = 0; // or any other default/fallback value you wish to set
    }

     // Reactive statement to calculate number of dry ewes
     $: if (!userEditedDryEwes) {
        numberOfDryEwes = numberOfEwesScanned - numberOfEwesPregnant;
    }

    // Function to handle user input on the number of dry ewes
    function handleDryEwesInput(event) {
        numberOfDryEwes = parseInt(event.target.value) || 0;
        userEditedDryEwes = true; // Set the flag to true when the user edits the value
    }

    $: isValidEwesPregnant = numberOfEwesPregnant > 0; // this will be true if numberOfEwesPregnant is more than 0
    

 // Auto-calculate number of dry ewes when number of scanned and pregnant ewes are updated
    // unless the user has manually edited the field
    $: if (!userEditedDryEwes) {
        numberOfDryEwes = numberOfEwesScanned - numberOfEwesPregnant;
    }

    // Function to set the flag when user edits the number of dry ewes
    function onDryEwesChange() {
        userEditedDryEwes = true;
    }

    // Whenever user edits any ewe count field, update the flag
    function updateEweCounts() {
        userHasEditedEwes = true;
    }

    let userHasEditedEwes = false;

     // Update singleEwes only when no user interaction has been detected and no values are provided for ewes
     $: if (!userHasEditedEwes) {
        singleEwes = numberOfEwesPregnant;
    }

    $: expectedNumberOfLambs = (Number(singleEwes) || 0) + (Number(twinEwes) * 2) + (Number(tripletEwes) * 3);

     // Reactive statement to calculate the expected number of lambs
     $: expectedNumberOfLambs = (Number(singleEwes) || (userHasEditedEwes ? 0 : numberOfEwesPregnant)) + (Number(twinEwes) * 2) + (Number(tripletEwes) * 3);

     // Reactive statement to calculate Exp. Lambing % (Ewes Scanned)
    $: if (numberOfEwesScanned > 0) {
        expLambingPercentEwesScanned = (expectedNumberOfLambs / numberOfEwesScanned) * 100;
    } else {
        expLambingPercentEwesScanned = 0; // Avoid division by zero
    }

    $: if (numberOfEwesPregnant > 0) {
        expLambingEwesPregnant = (expectedNumberOfLambs / numberOfEwesPregnant) * 100;
    } else {
        expLambingEwesPregnant = 0;
    }
     
    function addScanner() {
        // Logic to add a new scanner
        console.log('Add scanner button clicked');
    }

    function addGroups() {
        // Logic to add a new group
        console.log('Add groups button clicked');
    }
     
		let files;
	$: if (files) {
		console.log(files);
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
	let avatarSrc;
	function avatarUpload() {
		let readURL = function (input) {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
					avatarSrc = e.target.result;
					if (avatarSrc) {
						let img = document.querySelector('.avatrSrc');
						if (img) img.src = avatarSrc;
					}
				};

				reader.readAsDataURL(input.files[0]);
			}
		};
		document.querySelector('.upload-avatar-input').addEventListener('change', function () {
			readURL(this);
		});
	}
	function handleClick(event) {
		event.preventDefault();
		avatarUpload();
		document.querySelector('.upload-avatar-input').click();
	}
	function handleKeyDown(event) {
		if (event.keyCode === 32 || event.keyCode === 13) {
			handleClick(event);
		}
	}
	let deleteButton;

	function handleDelete() {
		deleteButton.parentNode.removeChild(deleteButton);
	}

    onMount(() => {
        // Initialize with current date or specific date logic here
    });
</script>

<div class="component-page mb-25">
	<Container fluid class="mb-25">
	<Col lg={12}>
	    <Card class="card-Vertical card-default card-md mb-4">
            <CardHeader>
                <h6>Add Scanning Record</h6>
            </CardHeader>
            <CardBody class="py-md-30">
                <Form>
                    <Row>
                        <Col lg={4} class="mb-25">
                            <FormGroup class="mb-20 was-validated" >
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <Label for="Groups">Group Name / Lambing Season</Label>
                                    <Button color ="primary" size="xs" class="btn-squared radius-xs fs-15 fw-400 text-capitalize" on:click={addGroups}>Add Groups</Button>
                                </div>
                            <Col md={12}>
                                <Input type="select"  id=groupselect class="form-select is-valid form-control select-arrow-none ih-medium  radius-xs b-light shadow-none color-light  fs-14" placeholder="Please Select" required>
                                    <option disabled selected value="">Please Select...</option>
                                    <option value="Group 1">Winter 2020</option>
                                    <option value="Group 2">Somer 2020</option>
                                </Input>
                                <div id=groupselect class="invalid-feedback">Please Select An Existing Group</div>
                            </Col>
                            </FormGroup>

                            <FormGroup for="scandate" class="mb-25 " required>
                                <Label>Scanning Date</Label>
                                <div class="date-picker-list-xl ">
                                    <div class="custom-date-picker custom-date-picker__bottom custom-date-picker__lg">
                                        <div class="form-group mb-0 form-group-calender">
                                            <div class="position-relative">
                                                <DatePicker id="weaningDate" format="DD MMMM YYYY" placeholder="Choose Scanning Date"/>
                                                <a href={'#'}>
                                                    <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup class="mb-20 was-validated">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <Label for="scanningagency">Scanning Agency</Label>
                                    <Button color ="primary" size="xs" class="btn-squared radius-xs fs-15 fw-400 text-capitalize" on:click={addScanner}>Add Scanner</Button>
                                </div>
                                <Col md={12}>
                                    <Input type="select" id="scanningagency" class="form-select is-valid form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14" placeholder="Please Select" required>
                                        <option disabled selected value="">Please Select...</option>
                                        <option value="1">Quickscan</option>
                                        <option value="2">Vet</option>
                                        <option value="3">Other</option>
                                    </Input>
                                    <div id="groupselect" class="invalid-feedback">Please Select Mating Type</div>
                                </Col>
                            </FormGroup>

                            

                            <div class="divider"></div>

                            <FormGroup for="ewesscanned" class="mb-25 " required>
                                <Label>Number of Ewes Scanned</Label>
                                <Input type="numeric" class="form-control-lg " id="ewesscanned" bind:value={numberOfEwesScanned} placeholder="Enter Number of Ewes Scanned" required />
                            </FormGroup>

                            <Col lg={12} class="mb-25">
                                <Row>
                                    <Col>
                                        <FormGroup for="ewespregnant" class="mb-25" required>
                                            <Label>Number of Ewes Pregnant</Label>
                                            <Input type="numeric" class="form-control-lg" bind:value={numberOfEwesPregnant} placeholder="Enter Number of Ewes Pregnant" required/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup for="dryewes" class="mb-25" required>
                                            <Label>Number of Dry Ewes</Label>
                                            <Input type="numeric" class="form-control-lg" value={numberOfDryEwes} on:input={handleDryEwesInput} placeholder="Enter Number of Dry Ewes" required/>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div class="divider"></div>
                                <h6 class="mb-25">Ewe Preformance</h6>
                                <Row>
                                    <Col>
                                        <FormGroup for="singleewes" class="mb-25">
                                            <Label>Single Ewes</Label>
                                            <Input type="numeric" bind:value={singleEwes} class="form-control-lg" placeholder="Ewes With Singles" on:input={updateEweCounts}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup for="twinewes" class="mb-25">
                                            <Label>Twin Ewes</Label>
                                            <Input type="numeric" bind:value={twinEwes} class="form-control-lg" placeholder="Ewes with Twins" on:input={updateEweCounts}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup for="tripewes" class="mb-25">
                                            <Label>Trips+ | Ewes</Label>
                                            <Input type="numeric" bind:value={tripletEwes} class="form-control-lg" placeholder="Ewes with Trips +" on:input={updateEweCounts}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                        <Col lg={4}>

                            <h5 class="mt-15 mb-20">Calculations</h5>
                            
                            <FormGroup for="conseptionratio" class="mb-25">
                                <Label>Conception Ratio %</Label>
                                <Input type="text" id="conception" class="form-control-lg" value={conceptionRatio.toFixed(2) + '%'} readonly />
                            </FormGroup>
                            
                            <FormGroup for="expectedlambs" class="mb-25">
                                <Label>Expected Number of Lambs</Label>
                                    <Input type="text" class="form-control-lg" value={expectedNumberOfLambs} readonly />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup for="explambingewesscanned" class="mb-25">
                                        <Label>Exp. Lambing % (Ewes Scanned)</Label>
                                        <Input type="text" class="form-control-lg" value={expLambingPercentEwesScanned.toFixed(2) + '%'} readonly />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup for="explambingewespregnant" class="mb-25">
                                        <Label>Exp. Lambing % (Ewes Pregnant)</Label>
                                        <Input type="text" class="form-control-lg" value={expLambingEwesPregnant.toFixed(2) + '%'} readonly/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                                <FormGroup	class="mb-20">
                                    <Label> Notes</Label>
                                    <Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="13"
                                            placeholder="Additional Notes"	/>
                                </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup class="mb-20">
                                <Label>Upload File</Label>
                                <div class="dm-upload">
                                    <div class="dm-upload-avatar media-import" on:click={handleClick} on:keydown={handleKeyDown}>
                                        <img class="svg" alt="" src={'/img/svg/upload.svg'} />
                                            <p class="color-dark fs-20">Drop File or <a href="/">Browse</a></p>
                                    </div>
                                <div class="avatar-up">
                                    <input bind:files id="many" multiple type="file" class="upload-avatar-input d-none" />
                                </div>
                                        {#if files}
                                            {#each Array.from(files) as file}
                                                <div class="avatar-result" bind:this={deleteButton}>
                                                    <div class="avatar-result__left">
                                                        <img class="svg" alt="" src={'/img/svg/file.svg'} />
                                                        <p>{file.name} ({file.size} bytes)</p>
                                                    </div>
                                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                            <img
                                                            src={'/img/svg/trash-2.svg'}
                                                            class="delete-button svg"
                                                            alt=""
                                                            on:click={handleDelete}
                                                        />
                                                </div>
                                            {/each}
                                        {/if}
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
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
</Col>
	</Container>
</div>



<style lang="scss">
	:global {
		.media-import {
			margin: 10px auto 30px;
			position: relative;
			padding: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			min-height: 280px;
			border: 2px dashed #c6d0dc;
			background-color: var(--color-white);
			border-radius: 10px;

			svg {
				color: var(--body-color);
				width: 80px;
				height: auto;
			}

			p {
				line-height: 1.25;
				font-weight: 500;
				margin-top: 50px;
				margin-bottom: 0;
				font-size: 20px;

				a {
					color: var(--color-primary);
				}
			}
		}
		.avatar-result {
			border: 1px dashed #d9d9d9;
			border-radius: 4px;
			height: 80px;
			padding: 8px 20px;
			position: relative;
			font-size: 15px;
			margin-top: 8px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&__left {
				display: flex;
				align-items: center;
				gap: 15px;
				svg {
					color: var(--color-info);
				}
				p {
					margin-bottom: 0;
					font-size: 15px;
					font-weight: 400;
				}
			}
			.delete-button {
				cursor: pointer;
				color: var(--color-danger);
			}
		}
        .divider {
        border-top: 2px solid #ccc;
        margin: 10px 0;
    }
    
	}
</style>

	