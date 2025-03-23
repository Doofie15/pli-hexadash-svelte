<script>
    import { Container, Row, Col, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { onMount } from 'svelte';
    import { Modal, ModalHeader, ModalBody, ModalFooter } from 'sveltestrap';
    
    // Import groups data
    import groupsData from '../../../../demo-data/groups.json';
    
    // Extract group names and IDs for the dropdown
    let groupOptions = groupsData.map(group => ({
        id: group.id,
        name: group.name,
        code: group.code
    }));
    
    let selectedGroup = null;
    let groupSearchTerm = '';
    let filteredGroups = [...groupOptions];
    let showDropdown = false;
    let formValidated = false;
    
    // Add Groups Modal state
    let showAddGroupModal = false;
    let newLambingSeasonName = '';
    let newTagColor = '';
    
    // Tag color options
    const tagColorOptions = [
        { value: 'White (1)', color: '#ffffff' },
        { value: 'Purple (2)', color: '#800080' },
        { value: 'Light Blue (3)', color: '#add8e6' },
        { value: 'Blue (4)', color: '#0000ff' },
        { value: 'Green (5)', color: '#008000' },
        { value: 'Lime (6)', color: '#00ff00' },
        { value: 'Yellow (7)', color: '#ffff00' },
        { value: 'Orange (8)', color: '#ffa500' },
        { value: 'Beige (9)', color: '#f5f5dc' },
        { value: 'Pink (10)', color: '#ffc0cb' },
        { value: 'Red (11)', color: '#ff0000' }
    ];
    
    let showTagColorDropdown = false;
    
    let averageMatingWeight = '';
    let numberOfEwesMated = '';
    let numberOfRamsUsed = '';
    let ramToEweRatio = 0;
    let matingStartDate = null;
    let matingEndDate = null;
    let matingDaysDifference = 0;
    let matingType = '';
    
    // Function to open the Add Group modal
    function openAddGroupModal() {
        // Close the dropdown first to prevent overlay issues
        showDropdown = false;
        showAddGroupModal = true;
    }
    
    // Function to close the Add Group modal
    function closeAddGroupModal() {
        showAddGroupModal = false;
        // Reset form values
        newLambingSeasonName = '';
        newTagColor = '';
        showTagColorDropdown = false;
    }
    
    // Function to save the new group
    function saveNewGroup() {
        // Validate form
        if (!newLambingSeasonName || !newTagColor) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create a new group
        const newGroup = {
            id: `GRP-${new Date().getTime()}`,
            name: newLambingSeasonName,
            code: `GRP-${groupOptions.length + 1}`,
            tagColor: newTagColor
        };
        
        // Add to options
        groupOptions = [...groupOptions, newGroup];
        
        // Update filtered groups
        filterGroups();
        
        // Select the new group
        selectedGroup = newGroup;
        
        // Close modal
        closeAddGroupModal();
    }
    
    // Filter groups based on search input
    function filterGroups() {
        if (!groupSearchTerm) {
            filteredGroups = [...groupOptions];
        } else {
            filteredGroups = groupOptions.filter(group => 
                group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
                group.code.toLowerCase().includes(groupSearchTerm.toLowerCase())
            );
        }
    }

    $: if (numberOfEwesMated > 0) {
        ramToEweRatio = (numberOfRamsUsed / numberOfEwesMated) * 100;
    } else {
        ramToEweRatio = 0;
    }

    // Function to update matingStartDate based on the selected date
    function updateMatingStart(event) {
        matingStartDate = event.detail.date;
        // Only calculate if both dates are set
        if (matingEndDate) {
            calculateMatingDays();
        } else {
            matingDaysDifference = 0; // Reset if only start date is set
        }
    }

    // Function to update matingEndDate based on the selected date
    function updateMatingEnd(event) {
        matingEndDate = event.detail.date;
        // Only calculate if both dates are set
        if (matingStartDate) {
            calculateMatingDays();
        } else {
            matingDaysDifference = 0; // Reset if only end date is set
        }
    }

    // Function to calculate the number of mating days
    function calculateMatingDays() {
        if (matingStartDate && matingEndDate) {
            // Create new Date objects with just the date part to avoid time issues
            const start = new Date(matingStartDate.getFullYear(), matingStartDate.getMonth(), matingStartDate.getDate());
            const end = new Date(matingEndDate.getFullYear(), matingEndDate.getMonth(), matingEndDate.getDate());
            
            // Calculate the difference in milliseconds
            const diffTime = Math.abs(end - start);
            
            // Convert to days and add 1 to include both the start and end day
            matingDaysDifference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        } else {
            matingDaysDifference = 0;
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

    // Add click handler to close dropdown when clicking outside
    function handleClickOutside(event) {
        const container = document.getElementById('group-select-container');
        if (container && !container.contains(event.target)) {
            showDropdown = false;
        }
    }
    
    onMount(() => {
        // Add event listener for clicks outside the dropdown
        document.addEventListener('click', handleClickOutside);
        
        // Clean up the event listener when component is destroyed
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    function handleSubmit() {
        formValidated = true;
        
        // Check if all required fields are filled
        if (!selectedGroup || !matingType || !numberOfEwesMated || !matingStartDate || !matingEndDate) {
            console.log("Form validation failed");
            return;
        }
        
        // If validation passes, proceed with form submission
        console.log("Form submitted successfully");
        // Add your form submission logic here
    }
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
                            <FormGroup class="mb-20">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <Label for="Groups">Group Name / Lambing Season</Label>
                                    <Button color="primary" size="xs" class="btn-squared radius-xs fs-15 fw-400 text-capitalize" on:click={openAddGroupModal}>Add Groups</Button>
                                </div>
                            <Col md={12} class="d-flex">
                                <div id="group-select-container" class="position-relative flex-grow-1">
                                    <Input 
                                        type="text" 
                                        id="groupselect" 
                                        class="form-select form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14 form-control-lg {formValidated && !selectedGroup ? 'is-invalid' : ''}" 
                                        placeholder="Please Select" 
                                        value={selectedGroup ? selectedGroup.name : ''}
                                        on:focus={() => showDropdown = true}
                                        on:input={(e) => {
                                            groupSearchTerm = e.target.value;
                                            filterGroups();
                                        }}
                                    />
                                    {#if formValidated && !selectedGroup}
                                        <div class="invalid-feedback">Please Select An Existing Group</div>
                                    {/if}
                                    
                                    {#if showDropdown}
                                        <div class="dropdown-menu show w-100" style="max-height: 200px; overflow-y: auto;">
                                            {#if filteredGroups.length === 0}
                                                <button class="dropdown-item disabled">No matching groups found</button>
                                            {:else}
                                                {#each filteredGroups as group}
                                                    <button 
                                                        class="dropdown-item" 
                                                        type="button"
                                                        on:click={() => {
                                                            selectedGroup = group;
                                                            showDropdown = false;
                                                        }}
                                                    >
                                                        <span class="fw-bold">{group.code}</span> - {group.name}
                                                    </button>
                                                {/each}
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            </Col>
                            </FormGroup>

                            <FormGroup class="mb-20">
                                <Label for="matingtype">Mating Type</Label>
                            <Col md={12}>
                                <Input 
                                    type="select"  
                                    id="matingtype" 
                                    class="form-select form-control select-arrow-none ih-medium radius-xs b-light shadow-none color-light fs-14 form-control-lg {formValidated && !matingType ? 'is-invalid' : ''}" 
                                    placeholder="Please Select" 
                                    bind:value={matingType}
                                >
                                    <option disabled selected value="">Please Select...</option>
                                    <option value="Natural Mating">Natural Mating</option>
                                    <option value="Cervical AI">Cervical AI</option>
                                    <option value="Laparoscopic AI">Laparoscopic AI</option>
                                </Input>
                                {#if formValidated && !matingType}
                                    <div class="invalid-feedback">Please Select Mating Type</div>
                                {/if}
                            </Col>

                            </FormGroup>

                            <FormGroup class="mb-25">
                                <Label>Number of Ewes Mated</Label>
                                <Input 
                                    type="number" 
                                    class="form-control-lg ih-medium {formValidated && !numberOfEwesMated ? 'is-invalid' : ''}" 
                                    id="ewesmated" 
                                    bind:value={numberOfEwesMated} 
                                    placeholder="Enter Number of Ewes Mated" 
                                />
                                {#if formValidated && !numberOfEwesMated}
                                    <div class="invalid-feedback">Please enter number of ewes mated</div>
                                {/if}
                            </FormGroup>

                            <FormGroup class="mb-25">
                                <Label>Number of Rams Used</Label>
                                <Input 
                                    type="number" 
                                    class="form-control-lg ih-medium" 
                                    placeholder="Enter Number of Rams Used" 
                                    bind:value={numberOfRamsUsed} 
                                />
                            </FormGroup>

                            <FormGroup class="mb-25">
                                <Label>Mating Dates</Label>
                                <div class="custom-date-ranger custom-date-ranger__bottom custom-date-ranger__lg position-relative d-flex align-items-center">
                                    <div class="form-group mb-0">
                                        <DatePicker 
                                            format="DD MMMM YYYY" 
                                            id="Matingstart" 
                                            bind:selected={matingStartDate} 
                                            on:date-selected={updateMatingStart} 
                                            placeholder="Mating Start" 
                                            class="ih-medium {formValidated && !matingStartDate ? 'is-invalid' : ''}"
                                        />
                                        {#if formValidated && !matingStartDate}
                                            <div class="invalid-feedback">Please select a start date</div>
                                        {/if}
                                    </div>
                                    <span class="divider">-</span>
                                    <div class="form-group mb-0">
                                        <DatePicker 
                                            format="DD MMMM YYYY" 
                                            id="Matingend" 
                                            bind:selected={matingEndDate} 
                                            on:date-selected={updateMatingEnd} 
                                            placeholder="Mating End" 
                                            class="ih-medium {formValidated && !matingEndDate ? 'is-invalid' : ''}"
                                        />
                                        {#if formValidated && !matingEndDate}
                                            <div class="invalid-feedback">Please select an end date</div>
                                        {/if}
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
                                    <Input 
                                        type="number" 
                                        class="form-control-lg ih-medium" 
                                        bind:value={averageMatingWeight} 
                                        step="0.01" 
                                        min="0" 
                                        placeholder="Enter weight (e.g., 65.75)"
                                        on:input={(e) => {
                                            // Limit to 2 decimal places
                                            if (e.target.value.includes('.') && e.target.value.split('.')[1].length > 2) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                                averageMatingWeight = parseFloat(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup class="mb-25">
                                <Label>Number of Mating Days</Label>
                                <Input type="text" id="Matingdays" class="form-control-lg ih-medium" value={matingDaysDifference + ' days'} readonly />
                            </FormGroup>
                            
                            <FormGroup class="mb-25">
                                <Label>Ram to Ewe Ratio (%)</Label>
                                <div class="input-group">
                                    <Input type="text" class="form-control-lg ih-medium" value={ramToEweRatio.toFixed(2) + ' %'} readonly />
                                </div>
                            </FormGroup>
                            
                                <FormGroup	class="mb-20">
                                    <Label> Notes</Label>
                                    <textarea
                                        class="form-control form-control-lg ih-medium"
                                        id="notes"
                                        rows="5"
                                        placeholder="Additional Notes"
                                    ></textarea>
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
                                <Button color="primary" size="default" class="btn-squared text-capitalize" on:click={handleSubmit}
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

<!-- Modal for adding a new group -->
<Modal isOpen={showAddGroupModal} toggle={closeAddGroupModal} size="md">
    <ModalHeader toggle={closeAddGroupModal}>Add New Group</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Label for="lambingSeasonName">Lambing Season Name <span class="text-danger">*</span></Label>
            <Input 
                type="text" 
                name="lambingSeasonName" 
                id="lambingSeasonName" 
                placeholder="Enter lambing season name" 
                bind:value={newLambingSeasonName} 
                noValidate
            />
        </FormGroup>
        <FormGroup>
            <Label for="tagColor">Tag Color <span class="text-danger">*</span></Label>
            <div class="position-relative">
                <Input 
                    type="text" 
                    name="tagColor" 
                    id="tagColor" 
                    placeholder="Select tag color" 
                    value={newTagColor} 
                    on:focus={() => showTagColorDropdown = true}
                    readonly
                    noValidate
                />
                {#if showTagColorDropdown}
                    <div class="dropdown-menu show w-100" style="max-height: 200px; overflow-y: auto;">
                        {#each tagColorOptions as option}
                            <button 
                                class="dropdown-item d-flex align-items-center" 
                                type="button"
                                on:click={() => {
                                    newTagColor = option.value;
                                    showTagColorDropdown = false;
                                }}
                            >
                                <span class="color-dot mr-2" style="background-color: {option.color}; width: 15px; height: 15px; display: inline-block; border-radius: 50%; margin-right: 8px;"></span>
                                {option.value}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </FormGroup>
    </ModalBody>
    <ModalFooter>
        <button class="btn btn-secondary" on:click={closeAddGroupModal}>Cancel</button>
        <button class="btn btn-primary" on:click={saveNewGroup}>Save changes</button>
    </ModalFooter>
</Modal>
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