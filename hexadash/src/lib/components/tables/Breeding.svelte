<script>
	export let dataPeriod;
	export let tableHead = true;

	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-GB');
	}
</script>

<div class="selling-table-wrap selling-table-wrap--source table-responsive">
	<table class="table table--default table-borderless">
		{#if tableHead}
			<thead>
				<tr>
					<th class="text-start">Group Name</th>
					<th class="text-center">Mating Type</th>
					<th class="text-center">Mating Start</th>
					<th class="text-center">Mating End</th>
					<th class="text-center">Mating Days</th>
					<th class="text-center"># Ewes Mated</th>
					<th class="text-center"># Rams Used</th>
					<th class="text-center">Ram Ewe Ratio</th>
					<th class="text-center">Expected Lambing</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td class="text-start">
						<div class="selling-product-img d-flex align-items-start justify-content-start">
							<div class="selling-product-img-wrapper order-bg-opacity-primary align-items-center">
								<!-- Use a default image if no specific image is available -->
								<img class="img-fluid" src="/img/sellers/1.png" alt="img" />
							</div>
							<span>{data.groupName}</span>
						</div>
					</td>
					<td class="text-center">{data.matingType}</td>
					<td class="text-center">{formatDate(data.startDate)}</td>
					<td class="text-center">{formatDate(data.endDate)}</td>
					<td class="text-center">{data.days}</td>
					<td class="text-center">{data.ewes}</td>
					<td class="text-center">{data.rams}</td>
					<td class="text-center">{data.ramEweRatio}</td>
					<td class="text-center">{formatDate(data.lambingStartDate)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
	@import '../../../assets/sass/components/table';
	@import '../../../assets/sass/mixins/functions';
	.selling-table-wrap {
		.table--default tbody tr:last-child {
			border-bottom: none;
		}
		.table--default tr th {
			&:first-child {
				padding-left: 15px;
			}

			&:last-child {
				padding-right: 15px;
			}
		}

		.table--default tr td {
			&:first-child {
				padding-left: 0;
			}

			&:last-child {
				padding-right: 15px;
			}
		}
		table {
			width: 100%;
			table-layout: fixed;
			
			thead {
				tr {
					background: var(--color-white);
					th {
						font-size: 12px;
						font-weight: 500;
						line-height: 16px;
						text-transform: uppercase;
						color: var(--color-gray);
						border: none;
						padding: 5px 15px;
						vertical-align: middle;
					}
				}
			}
			tbody {
				tr {
					&:hover {
						box-shadow: 0 10px 30px var(--shadow3);
						td {
							background: var(--color-white);
						}
					}
					td {
						padding: 10px 15px;
						color: var(--color-dark);
						font-weight: 500;
						border: none;
						background: var(--color-white);
						vertical-align: middle;
						font-size: 13px;
						
						&:first-child {
							border-radius: 10px 0 0 10px;
						}
						&:last-child {
							border-radius: 0 10px 10px 0;
						}
						.selling-product-img {
							img {
								max-width: 32px;
								border-radius: 8px;
							}
							span {
								margin-left: 12px;
								color: var(--color-dark);
								font-weight: 500;
							}
						}
					}
				}
			}
		}
	}
</style>
