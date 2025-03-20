<script>
    import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { onMount } from 'svelte';

    let averageMatingWeight = '';
    let numberOfEwesMated = 0;
    let numberOfRamsUsed = 0;
    let ramToEweRatio = 0;
    let matingStartDate = new Date();
    let matingEndDate = new Date();
    let matingDaysDifference = 0;


    $: if (numberOfEwesMated > 0) {
        ramToEweRatio = (numberOfRamsUsed / numberOfEwesMated) * 100;
    } else {
        ramToEweRatio = 0;
    }

    // Ensure the calculation is triggered when matingStartDate or matingEndDate changes
    $: {
        console.log("matingStartDate:", matingStartDate);
        console.log("matingEndDate:", matingEndDate);
        if (matingStartDate && matingEndDate && matingEndDate.getTime() > matingStartDate.getTime()) {
            const start = new Date(matingStartDate.getFullYear(), matingStartDate.getMonth(), matingStartDate.getDate());
            const end = new Date(matingEndDate.getFullYear(), matingEndDate.getMonth(), matingEndDate.getDate());
            const timeDiff = end - start;
            matingDaysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        } else {
            matingDaysDifference = 0; // Reset if end date is not set or is before the start date
        }
    }

   // Debugging logs
   $: console.log("matingStartDate:", matingStartDate);
    $: console.log("matingEndDate:", matingEndDate);
    $: console.log("matingDaysDifference:", matingDaysDifference);

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
                <h6>Add Breeding Record</h6>
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

                            <FormGroup class="mb-20 was-validated ">
                                <Label for groupselect>Mating Type</Label>
                            <Col md={12}>
                                <Input type="select"  id=matingtype class="form-select is-valid form-control select-arrow-none ih-medium  radius-xs b-light shadow-none color-light  fs-14" placeholder="Please Select" required>
                                    <option disabled selected value="">Please Select...</option>
                                    <option value="Natural Mating">Natural Mating</option>
                                    <option value="Cervical AI">Cervical AI</option>
                                    <option value="Laparoscopic AI">Laparoscopic AI</option>
                                </Input>
                                <div id=groupselect class="invalid-feedback">Please Select Mating Type</div>
                            </Col>

                            </FormGroup>

                            <FormGroup for="lambsweaned" id="lambsweaned" class="mb-25 was-validated">
                                <Label>Number of Ewes Mated</Label>
                                <Input type="numeric" class="form-control-lg was-validated" id="ewesmated" bind:value={numberOfEwesMated} placeholder="Enter Number of Ewes Mated" required />
                            </FormGroup>

                            <FormGroup class="mb-25 ">
                                <Label>Number of Rams Used</Label>
                                <Input type="numeric" class="form-control-lg" placeholder="Enter Number of Rams Used"  bind:value={numberOfRamsUsed} />
                            </FormGroup>

                            <FormGroup for="Mating Start" class="mb-25 ">
                                <Label>Mating Dates</Label>
                                <div class="custom-date-ranger custom-date-ranger__bottom custom-date-ranger__lg position-relative d-flex align-items-center">
                                    <div class="form-group mb-0" required>
                                        <DatePicker format="DD MMMM YYYY" id="Matingstart" bind:value={matingStartDate} placeholder="Mating Start" />
                                    </div>
                                    <span class="divider">-</span>
                                    <div class="form-group mb-0">
                                        <DatePicker format="DD MMMM YYYY" id="Matingend" bind:value={matingEndDate} placeholder="Mating End" />
                                    </div>
                                    <a href={'#'}>
                                        <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                                    </a>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            
                            <FormGroup class="mb-25">
                                <Label>Average Mating Weight (Kg)</Label>
                                <div class="input-group">
                                    <Input type="numeric" class="form-control-lg" bind:value={averageMatingWeight} />
                                </div>
                            </FormGroup>
                            <FormGroup class="mb-25">
                                <Label>Number of Mating Days</Label>
                                <Input type="text" id="Matingdays" class="form-control-lg" value={matingDaysDifference + ' days'} readonly />
                            </FormGroup>
                            
                            <FormGroup class="mb-25">
                                <Label>Ram to Ewe Ratio (%)</Label>
                                <div class="input-group">
                                    <Input type="text" class="form-control-lg" value={ramToEweRatio.toFixed(2) + ' %'} readonly />
                                </div>
                            </FormGroup>
                            
                                <FormGroup	class="mb-20">
                                    <Label> Notes</Label>
                                    <Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="12"
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

	