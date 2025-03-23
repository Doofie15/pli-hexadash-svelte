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
					<th>Group Name</th>
					<th>Mating Type</th>
					<th>Mating Start</th>
					<th>Mating End</th>
					<th>Mating Days</th>
					<th># Ewes Mated</th>
					<th># Rams Used</th>
					<th>Ram Ewe Ratio</th>
					<th>Lambing Start</th>
					<th>Lambing End</th>
					<th>Production Year</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<div class="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
								<!-- Use a default image if no specific image is available -->
								<img class="img-fluid" src="/img/sellers/1.png" alt="img" />
							</div>
							<span>{data.groupName}</span>
						</div>
					</td>
					<td>{data.matingType}</td>
					<td>{formatDate(data.startDate)}</td>
					<td>{formatDate(data.endDate)}</td>
					<td>{data.days}</td>
					<td>{data.ewes}</td>
					<td>{data.rams}</td>
					<td>{data.ramEweRatio}</td>
					<td>{formatDate(data.lambingStartDate)}</td>
					<td>{formatDate(data.lambingEndDate)}</td>
					<td>{data.productionYear}</td>
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
			thead {
				tr {
					background: var(--color-white);
					th {
						font-size: 12px;
						font-weight: 500;
						line-height: 18px;
						text-transform: uppercase;
						color: var(--color-gray);
						border: none;
						padding: 6px 15px;
					}
				}
			}
			tbody {
				tr {
					&:hover {
						box-shadow: 0 15px 50px var(--shadow3);
						td {
							background: var(--color-white);
						}
					}
					td {
						padding: 20px 15px;
						color: var(--color-dark);
						font-weight: 500;
						border: none;
						background: var(--color-white);
						&:first-child {
							border-radius: 10px 0 0 10px;
						}
						&:last-child {
							border-radius: 0 10px 10px 0;
						}
						.selling-product-img {
							img {
								max-width: 40px;
								border-radius: 10px;
							}
							span {
								margin-left: 15px;
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
