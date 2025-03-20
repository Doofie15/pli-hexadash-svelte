<script>
	import {
		Card,
		CardHeader,
		CardBody
	} from 'sveltestrap';
	import lambingrecords from '@data/table-data.json';
	import Lambing from '@components/tables/Lambing.svelte';
	const sellers = lambingrecords.lambingrecords;
	let period = 'today';
	let currentTab = 'today';
	let dataPeriod = sellers[period];
	

	function changeData(data) {
		dataPeriod = sellers[data];
		currentTab = data;
	}
</script>

<Card class="border-0 px-25 best-sellers">
	<CardHeader class="px-0 border-0">
		<h6>Weaning</h6>

		<div class="card-extra">
			<ul class="card-tab-links nav">
				<li>
					<a on:click|preventDefault={()=> {
						changeData('today');
						}}
						href={'#'}
						class={currentTab === 'today' ? 'active' : ''}>This Year</a>
				</li>
				<li>
					<a on:click|preventDefault={()=> {
						changeData('week');
						}}
						href={'#'}
						class={currentTab === 'week' ? 'active' : ''}>5 Years</a>
				</li>
				<li>
					<a on:click|preventDefault={()=> {
						changeData('month');
						}}
						href={'#'}
						class={currentTab === 'month' ? 'active' : ''}>All</a>
				</li>
			</ul>
		</div>
	</CardHeader>
	<CardBody class="p-0">
		<Lambing {dataPeriod} />
	</CardBody>
</Card>

<style lang="scss">
	:global {
		.best-sellers {
			table.table--default {
				tr {
					td {
						&:last-child {
							padding-right: 15px !important;
						}
					}
				}
			}
		}
	}

	;
</style>