<script>
    import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { onMount, tick } from 'svelte';
    import {} from 'sveltestrap';

    let lambingStart;
    let lambingEnd;
    let numberOfLambingDays = 0;
    let lambsBorn = 0;
    let ewesLambed = 0;
    let lambingPercentageEwesLambed = 0;

    let ewesWithSingles = 0;
    let ewesWithTwins = 0;
    let ewesWithTrips = 0;
    let eweLambs = 0;
    let ramLambs = 0;

    let singlesPercentage = 0;
    let twinsPercentage = 0;
    let tripsPercentage = 0;

    let isFormValid = true;

    

     // Reactive statement to calculate the number of lambing days
     $: if (lambingStart && lambingEnd) {
        const start = new Date(lambingStart);
        const end = new Date(lambingEnd);
        const diffTime = Math.abs(end - start);
        numberOfLambingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Reactive calculation for Lambing % (Ewes Lambed)
    $: if (ewesLambed > 0) {
        lambingPercentageEwesLambed = (lambsBorn / ewesLambed) * 100;
    } else {
        lambingPercentageEwesLambed = 0;
    }

// Reactive statements for ewes with singles, twins, and trips percentages
$: singlesPercentage = lambsBorn > 0 ? (ewesWithSingles / lambsBorn) * 100 : 0;
    $: twinsPercentage = lambsBorn > 0 ? (ewesWithTwins / lambsBorn) * 100 : 0;
    $: tripsPercentage = lambsBorn > 0 ? (ewesWithTrips / lambsBorn) * 100 : 0;

    $: eweLambPercentage = lambsBorn > 0 ? (eweLambs / lambsBorn) * 100 : 0;
$: ramLambPercentage = lambsBorn > 0 ? (ramLambs / lambsBorn) * 100 : 0;


    
		let files;
	$: if (files) {
		console.log(files);
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}

    function addGroups() {
        // Logic to add a new group
        console.log('Add groups button clicked');
    }

    // Function to update lambingStart based on the selected date
    function updateLambingStart(event) {
        lambingStart = event.detail.date; // Adjust according to how your date is passed
        calculateDays();
    }

    // Function to update lambingEnd based on the selected date
    function updateLambingEnd(event) {
        lambingEnd = event.detail.date; // Adjust according to how your date is passed
        calculateDays();
    }

    // Function to calculate the number of lambing days
    function calculateDays() {
        if (lambingStart && lambingEnd) {
            const start = new Date(lambingStart);
            const end = new Date(lambingEnd);
            const diffTime = Math.abs(end - start);
            numberOfLambingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
    }

    function handleSubmit() {
        if (!form.checkValidity()) {
            // Prevent submission if the form is not valid
            console.log("Form is invalid. Please fill out all required fields.");
            return;
        }

        // Proceed with form submission logic if valid
        console.log("Form is valid. Submitting data...");
        // Your form submission logic here...
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
                <h6>Add Lambing Record</h6>
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
                            <Row>   
                                <Col md={6}>
                                    <FormGroup for="lambingstart" class="mb-25 ">
                                        <Label>Lambing Start</Label>
                                        <div class="date-picker-list-xl ">
                                            <div class="custom-date-picker custom-date-picker__bottom custom-date-picker__lg">
                                                <div class="form-group mb-0 form-group-calender">
                                                    <div class="position-relative">
                                                        <DatePicker on:date-selected={updateLambingStart} bind:value={lambingStart} type="date" placeholder="Lambing Start Date" />
                                                        <a href={'#'}>
                                                            <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup for="lambingend" class="mb-25 ">
                                    <Label>Lambing End</Label>
                                    <div class="date-picker-list-xl ">
                                        <div class="custom-date-picker custom-date-picker__bottom custom-date-picker__lg">
                                            <div class="form-group mb-0 form-group-calender">
                                                <div class="position-relative">
                                                    <DatePicker on:date-selected={updateLambingEnd} bind:value={lambingEnd} type="date" placeholder="Lambing End Date" />
                                                    <a href={'#'}>
                                                        <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                            

                        <FormGroup for="eweslambed" id="eweslambed" class="form-control-lg was-validated " >
                            <Label>Number of Ewes Lambed</Label>
                            <Input type="numeric" 
                                   class="form-control-lg was-validated {ewesLambed > 0 ? 'is-valid' : 'is-invalid'}" 
                                   id="eweslambed" 
                                   bind:value={ewesLambed} 
                                   placeholder="Number of Ewes Lambed" 
                                   required />
                        </FormGroup>                                
                                <FormGroup for="ewesnotlambed" id="ewesnotlambed">
                                    <Label>Number of Ewes Not Lambed</Label>
                                    <Input type="numeric" class="form-control-lg was-validated" id="ewesnotlambed" placeholder="Number of Ewes Not Lambed" required />
                                </FormGroup>
                                <FormGroup for="lambsborn" id="lambsborn" class="was-validated">
                                    <Label>Number of Lambs Born</Label>
                                    <Input type="numeric" 
                                           class="form-control-lg was-validated {lambsBorn > 0 ? 'is-valid' : 'is-invalid'}" 
                                           id="lambsborn" 
                                           bind:value={lambsBorn} 
                                           placeholder="Number of Lambs Born" 
                                           required />
                                </FormGroup>

                                
                                <Row>                                    
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes With Singles</Label>
                                            <Input type="numeric" bind:value={ewesWithSingles} class="form-control-lg" id="eweswithsingles" placeholder="Ewes With Singles" />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes with Twins</Label>
                                            <Input type="numeric" bind:value={ewesWithTwins} class="form-control-lg" id="eweswithtwins" placeholder="Ewes With Twins" />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes With Trips+</Label>
                                            <Input type="numeric" bind:value={ewesWithTrips} class="form-control-lg" id="eweswithtrips" placeholder="Ewes With Trips" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>                                    
                                    <Col class="mb-20" md={6}>
                                        <FormGroup>
                                            <Label>Number of Ewe Lambs</Label>
                                            <Input type="numeric" bind:value={eweLambs} class="form-control-lg" id="ewelambs" placeholder="Number of Ewe Lambs" />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={6}>
                                        <FormGroup>
                                            <Label>Number of Ram Lambs</Label>
                                            <Input type="numeric" bind:value={ramLambs} class="form-control-lg" id="ramlambs" placeholder="Number of Ram Lambs" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                        <Row>
                            <Col class="mb-25" md={12}> 
                            <FormGroup class="mb-25">
                                <Label>Average Brith Weight</Label>
                                <Input type="numeric" id="birthweight" class="form-control-lg" placeholder="Average Weight (Kg)" />
                            </FormGroup>
                        </Col>
                        </Row>
                            
                        </Col>
                        <Col lg={4}>

                            <h5 class="mt-15 mb-20">Calculations</h5>
                            <!-- Display the calculated days -->
                            <FormGroup class="mb-25">
                                <Label>Number of Lambing Days</Label>
                                <Input type="text" id="lambingduration" class="form-control-lg" value={numberOfLambingDays || ''} readonly />
                            </FormGroup>
                                <FormGroup	class="mb-25">
                                    <Label> Lambing % ( Ewes Mated)</Label>
                                    <Input type="text" id="lambingpercewesmated" class="form-control-lg" readonly />
                                </FormGroup>
                                <FormGroup class="mb-25">
                                    <Label>Lambing % (Ewes Lambed)</Label>
                                    <Input type="text" id="lambingperceweslambed" class="form-control-lg" value={lambingPercentageEwesLambed.toFixed(2) || ''} readonly />
                                </FormGroup>
                                <Row>                                    
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes With Singles %</Label>
                                            <Input type="text" id="singleewesperc" class="form-control-lg" value={singlesPercentage.toFixed(2) || ''} readonly />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes with Twins %</Label>
                                            <Input type="text" id="twineweperc" class="form-control-lg" value={twinsPercentage.toFixed(2) || ''} readonly />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewes With Trips+ %</Label>
                                            <Input type="text" id="tripeweperc" class="form-control-lg" value={tripsPercentage.toFixed(2) || ''} readonly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>                                    
                                    <Col class="mb-20" md={6}>
                                        <FormGroup>
                                            <Label>Ewe Lamb %</Label>
                                            <Input type="text" id="ewelamb%" class="form-control-lg" value={eweLambPercentage.toFixed(2) || ''} readonly />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={6}>
                                        <FormGroup>
                                            <Label>Ram Lamb %</Label>
                                            <Input type="text" id="ramlamb%" class="form-control-lg" value={ramLambPercentage.toFixed(2) || ''}%}  readonly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup	class="mb-20">
                                    <Label> Notes</Label>
                                    <Input id="lambingnotes" type="textarea" 
                                            class="form-control-lg"  
                                            rows="8"
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
                                <Button on:click={handleSubmit} type="submit" color="primary" size="default" class="btn-squared text-capitalize"
                                    >Add Record
                                </Button>

                                <Button
                                    color="light"
                                    size="default"
                                    class="btn-squared fw-400 text-capitalize b-light color-light"
                                    type="cancel">cancel</Button
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

            .divider {
        border-top: 2px solid #ccc;
        margin: 10px 0;
    }
    
    input:invalid {
        border: 2px solid red;
    }

		}
	}
</style>

	