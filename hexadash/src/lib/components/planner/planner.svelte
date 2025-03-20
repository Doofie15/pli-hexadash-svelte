<script>
    import { Row,Table, Input,FormGroup,Label, Col } from 'sveltestrap';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
		import Select from 'svelte-select';

    let selectedDate = null;
    let matingDays = 34; // Default value for the number of mating days
    let endDate = '';

    // Reactive statement to calculate the end date whenever selectedDate or matingDays changes
    $: {
        if (selectedDate && matingDays) {
            endDate = calculateMatingEndDate(selectedDate, matingDays);
        }
    }

    // Function to calculate the end date based on the selected date and number of mating days
    function calculateMatingEndDate(startDate, days) {
        console.log('Calculating end date', { startDate, days });

        if (!startDate || !days) return null;

        // Parse the selectedDate string to a Date object
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(days, 10));

        return end.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
</script>


<div class="d-flex">
<Row>
	
		<Col>
			<FormGroup for="Group Name" class="mb-25 " required>
				<Label>Group Name</Label>
				<Input type="text" class="form-control-lg "placeholder="Group Name" required />
			</FormGroup>
		</Col>
		<Col xs="auto" class="me-auto">
			<FormGroup>
				<Label>Mating Type</Label>
				<Input type="select"  id=groupselect size="lg" class="form-select  form-control select-arrow-none ih-medium  radius-xs b-light shadow-none color-light  fs-14" placeholder="Please Select" required>
                                    <option disabled selected value="">Please Select...</option>
                                    <option value="Group 1">Natural Mating</option>
                                    <option value="Group 2">Cervical AI</option>
									<option value="Group 2">Laparoscopic AI</option>
                                </Input>
			</FormGroup>
		</Col>
		

</Row>
</div>

<div class="table-responsive">
    <Table class="mb-10">
        <thead>
            <tr class="userDatatable-header" align="center">
                <th>
                    <span class="userDatatable-title">Phase</span>
                </th>
                <th>
                    <span class="userDatatable-title">Date</span>
                </th>
                <th>
                    <span class="userDatatable-title">Recommendations</span>
                </th>
                <th>
                    <span class="userDatatable-title">Product</span>
                </th>
            </tr>
        </thead>
        <tbody>
			<tr>
				<td id="ramprep" align="center" >
					Ram Preparations
				</td>
				<td id="ramprepdate"></td>
				<td>
					  <li>Rams: - Test For Fertility</li>
					  <li>Dose Rams For Roundworms &amp; Nasal Worms</li>
					  <li>Do all necessary inoculations</li>
					  <li>Shear Wool/Hoof inspections</li>
					  <li>Feed for Testes growth and sperm development</li>
					  <li>Improve ram Fitness</li>
					  <li>Supply additional minerals and Vitamins</li>
					  <li>Test For Sexual transmitting diseases</li>
					  <li>Inoculate Young ewes against slengdal Fever</li>
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="8"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="jongewes" align="center">
					Jong -& Mature Ewes Preparation<br>
					(42 to 28 Days prior to mating)
				</td>
				<td id="jongewesdate"></td>
				<td>
					  <li>Flock Inspection <span style="color: blue">(Optional)</span></li>
					  <li>De-worm all ewes</li>
					  <li>Inoculate against Pulp Kidney and Clostridium<br></li>
					  <li>Pasteurella &amp; Corynebacterium <span style="color: blue">(Only Young Ewes)</span></li>
					  <li>Inoculate against Enzootic abortion</li>
					  <li>Supply additional Vitamins and Minerals (All Ewes)</li>
					  <li>Weigh Ewes <span style="color: red">(Recommended)</li>
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="7"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="flushfeedate" align="center">
					Flush Feed<br>
					(21 Days prior to mating)
				</td>
				<td id="ramprepdate"></td>
				<td>
					  <li>All Breeding Ewes: Flush Feed <span style="color: red">(Recommended)</span></li>
					  <li> Do Condition Score <span style="color: red">(Recommended)</span></li>
					  <li>Weigh Ewes  <span style="color: blue">(Optional)</li>
					  <li> Keep ewes calm after this period</li>
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="4"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="matingstart" align="center">Mating</td>
    <td id="matingdate" style="background-color: lightgray;" size="xs" type="date">
        <div class="date-picker-list-xm " required>
            <div class="custom-date-picker custom-date-picker__right custom-date-picker__lg">
                <div class="form-group mb-0 form-group-calender">
                    <div class="position-relative">
                        <DatePicker type="date" id="matingdateplan" format="DD MMMM YYYY" placeholder="Choose Mating Date" bind:value={selectedDate} />
                        <a href={'#'}>
                            <img class="svg" alt="" src={'/img/svg/calendar.svg'} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Additional input for number of mating days -->
        <Input type="numeric" class="mb-10 mt-10" size="lg" placeholder="Number of Mating Days (Eg. 34)" bind:value={matingDays} required />
    </td>
				<td>
					  <li>Weigh Rams (Optional) <span style="color: blue">(Optional)</span></li>
					  <li>Keep Mating Records <span style="color: red">(Recommended)</span></li>
					  <li>Prevent unnecessary stress and handling <span style="color: blue">(Optional)</li>
					  <li>Keep animal condition scores</li>
					  <li>Give additional feeds if necessary (Contact feed consultant)</li>
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="4"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="matingend" align="center"> Mating End</td>
    			<td id="matingenddate">{endDate}</td>
				<td>
					  <li>Remove Rams</li>
					  <li>Keep handling and stress to an extreme low</li>
					  <li>Keep ewes calm and supply sufficient feed and shade</li>
					  <li>Keep rams in good healthy condition</li>
					  
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="4"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="scan" align="center"> Pregnancy Scan</td>
				<td id="scandate"></td>
				<td>
					  <li>Pregnancy inspection (Mid Pregnancy)</li>
					  <li>Record and remove all ewes that are not pregnant<br>&nbsp;&nbsp, <span style="color: blue">(cull or give a second chance)</span> </li>

					  <li>Ewes must keep condition score(3 - 3.5 CS)</li>
					  <li>Keep rams in good healthy condition</li>
					  
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="4"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>

			<tr>
				<td id="latepreg" align="center">Late Pregnancy Preparations<br>
					(6 weeks prior to lambing)</td>
				<td id="latepregdate"></td>
				<td>
					  <li>Inoculate against Pulp Kidney and Clostridium</li>
					  <li>Inoculate against Pasteurella & Corynebacterium</li>
					  <li>Dose Ewes</li>
					  <li>Give additional Minerals and Vitamins </li>
					  <li>Do effective external parasite control (Maggots,Tick,etc.)</li>
					  <li>Supply bypass protein feeds for effective udder development </li>
					  <li>Weigh Ewes <span style="color: red">(Recommended)</span></li>
					  
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="6"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>

			<tr>
				<td id="lambingstart" align="center">Start of Lambing Season<br>
					(± 146 days after start of mating) </td>
				<td id="lambingstartdate"></td>
				<td>
					  <li>Move to Lambing Pens/Camps</li>
					  <li>Have all necessary veterinarian products ready</li>
					  <li>Sanitise umbilical cord if possible</li>
					  <li>Give Sufficient feed for lactating ewes </li>
					  <li>Take record of all lambing problems</li>
					  <li>Supply bypass protein feeds for effective udder development </li>
					  <li>Supply Creep Feeds to lambs <span style="color: red">(Recommended)</span></li>
					  <li>Assign Birth Status (Single,Twin etc.) <span style="color: red">(Recommended)</span></li>
					  
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="7"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="lambingend" align="center">End of Lambing<br>
					(± 146 days after start of mating) </td>
				<td id="lambingstartdate"></td>
				<td>
					  <li>Clean and sanitise lambing pens</li>			  
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="2"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>

			<tr>
				<td id="lam1" align="center">Lam 1<br>
					(1 month after lambing) </td>
				<td id="lam1date"></td>
				<td>
					  <li>Dose Lambs & Ewes <span style="color: red">(Recommended)</li>
					  <li>Weigh lambs & Ewes  <span style="color: red">(Recommended)</li>
						<li>Follow Ethical Tail Docking Procedures</li>	
						<li>Inspect ewes Udders (Wet and Dry Method)</li>	 
						<li>Do Correct Castration (Follow correct procedures)</li> 
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="5"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			
			<tr>
				<td id="lam2" align="center">Lam 2<br>
					(2 month after lambing) </td>
				<td id="lam2date"></td>
				<td>
					  <li>Dose Lambs - Round Worms & Tapeworms <span style="color: red">(Recommended)</li>
					  <li>Inoculate against Pulp Kidney and Clostridium  <span style="color: red">(Recommended)</li>
						<li>Pasteurella & Corynebacterium <span style="color: red">(Recommended)</li>
						<li>Supply Additional Minerals and Vitamins </li>	
						<li>Inspect Tails</li>	 				  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="5"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
			<tr>
				<td id="lam3" align="center">Lam 3<br>
					(3 month after lambing) </td>
				<td id="lam3date"></td>
				<td>
					<li>Dose Lambs - Round Worms & Tapeworms <span style="color: red">(Recommended)</li>
					<li>Follow Up Inoculation against Pulp Kidney and Clostridium  <span style="color: red">(Recommended)</li>
					  <li>Follow Up Inoculation against Pasteurella & Corynebacterium <span style="color: red">(Recommended)</li>
					  <li>Supply Additional Minerals and Vitamins </li>	
					  <li>Inspect Tails</li> 
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="5"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>

			<tr>
				<td id="wean" align="center">Wean <br>
					(95 - 100 Days after Lambing) </td>
				<td id="weandate"></td>
				<td>
					<li>Wean lambs(Split ewes and lambs) </li>
					<li>Inoculate Rams Lambs - Rev 1 <span style="color: red">(Recommended)</li>
					  <li>Ewe lambs against Chlamydia (Enzootic abortion) <span style="color: red">(Recommended)</li>
						<li>Weigh lambs and ewes <span style="color: red">(Recommended) </li>
					  <li>Additional supply of minerals and vitamins<br>
						( recommended weight is more then 25kg)</li>	
					  <li>Move dry ewes to separate camps far away</li>
					 
					  
				  </td>
				  <td>
					<Input type="textarea" 
                                            class="form-control-lg"  
                                            rows="6"
                                            placeholder="Products"	/>
				  </td>
				  <td>
					
				  </td>
			</tr>
        </tbody>
    </Table>
</div>

<div class="comments-container mt-25">
	<h2 class="mb-10">Comments</h2>
	<ol>
	  <li>This program is just for minimal guidance only</li>
	  <li>
		Bluetongue [Orbivirus] (inoculate A, B & C in 3 week intervals) Selngdal Fever must still be added. Selected Weaners must only be inoculated after 6 months old for Bluetongue & Slegdal Fever. Ewes last inoculation must be done at least 8 weeks prior to mating. Rams inoculation must be done after the mating season
	  </li>
	  <li>Remember shearing dates - as this is not included in the program.</li>
	</ol>
	<h3 class="mb-10">Monitoring:</h3>
	<ol>
	  <li>Dosing Program: Do proper parasite resistance test with regular faecal egg counts make use of Famacha protocols for monitoring of internal parasites. Please adhere to local animal health laws and adjust your animal health programs with proper vet consultation and post mortems.</li>
	  <li>Keep Records of all illnesses, diseases, and treatments.</li>
	  <li>Alternative Registered products can be used - Consult with your vet</li>
	  <li>External Parasites (Tick, Maggots, Flies) must be monitored regularly.</li>
	</ol>
	<h5 class="disclaimer">
	  Disclaimer
	</h5>
	<p>Consult with your registered Veterinarian & Feed scientist. All Veterinary & Feed companies/entities as well as Pro Livestock Intelligence mentioned in this guideline does not take responsibility for any loss, damage or claims that may follow by making use of this guideline. This document only serves as a guideline and are presented without prejudice
</p>
  </div>
  



<style>
	
</style>