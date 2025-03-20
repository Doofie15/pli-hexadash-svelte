<script>
    import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { onMount } from 'svelte';
	import {} from 'sveltestrap';
   
	
	let weaningDate = new Date(); // default to today, adjust as needed
    let daysBetween = 0;

    // Reactive statement to calculate the difference in days
    $: if (weaningDate) {
        console.log('Weaning Date:', weaningDate);
        let today = new Date();
        // Set both dates to start of the day (midnight)
        today.setHours(0, 0, 0, 0);
        let adjustedWeaningDate = new Date(weaningDate);
        adjustedWeaningDate.setHours(0, 0, 0, 0);

        const timeDiff = today - adjustedWeaningDate;
        daysBetween = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }


	$: weaningDate, console.log("weaningDate changed:", weaningDate);


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
                <h6>Add Weaning Record</h6>
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
                            <FormGroup for="weandate" class="mb-25 ">
                                    <Label>Weaning Date</Label>
                                    <div class="date-picker-list-xl ">
                                        <div class="custom-date-picker custom-date-picker__bottom custom-date-picker__lg">
                                            <div class="form-group mb-0 form-group-calender">
                                                <div class="position-relative">
                                                    <DatePicker id="weaningDate" bind:selected={weaningDate} format="DD MMMM YYYY" />
                                                    <a href={'#'}>
                                                        <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>

                                <FormGroup for="lambsweaned" id="lambsweaned">
                                    <Label>Number of Lambs Weaned</Label>
                                    <Input type="number" class="form-control-lg was-validated" id="lambsweaned" placeholder="Enter Number of Lambs Weaned" required />
                                </FormGroup>
                                <Row>                                    
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ewe Lambs Weaned</Label>
                                            <Input type="numeric" class="form-control-lg" placeholder="# Ewes Weaned" />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Ram Lambs Weaned</Label>
                                            <Input type="numeric" class="form-control-lg" placeholder="# Rams Weaned" />
                                        </FormGroup>
                                    </Col>
                                    <Col class="mb-25" md={4}>
                                        <FormGroup>
                                            <Label>Hoggets Weaned</Label>
                                            <Input type="
                                            numeric" class="form-control-lg" placeholder="# Hoggets Weaned" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                        <Row>
                            <Col class="mb-25" md={6}> 
                            <FormGroup class="mb-25">
                                <Label>Average Weaning Weight</Label>
                                <Input type="numeric" class="form-control-lg" placeholder="Average Weight (Kg)" />
                            </FormGroup>
                        </Col>
                            <Col class="mb-25" md={6}>
                            <FormGroup class="mb-25 ">
                                <Label>Total Kg Weaned</Label>
                                <Input type="numeric" class="form-control-lg" placeholder="Total Weight (Kg)" />
                            </FormGroup>
                            </Col>
                        </Row>
                            
                        </Col>
                        <Col lg={4}>
                            <!-- Display the calculated days -->
                                <FormGroup class="mb-25">
                                    <Label>Days Since Average Lambing Date</Label>
                                    <Input type="text" class="form-control-lg" value={daysBetween + ' days'} readonly />
                                </FormGroup>
                                <FormGroup	class="mb-25">
                                    <Label> Weaning % ( Ewes Mated)</Label>
                                    <Input type="text" class="form-control-lg" readonly />
                                </FormGroup>
                                <FormGroup	class="mb-25">
                                    <Label> Weaning % ( Ewes Lambed)</Label>
                                    <Input type="text" class="form-control-lg" readonly />
                                </FormGroup>
                                <FormGroup	class="mb-20">
                                    <Label> Notes</Label>
                                    <Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="7"
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
	}
</style>

	