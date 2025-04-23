<script>
	export let dataPeriod;
	export let tableHead = true;

	// Format date function
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}

	// Format percentage
	function formatPercentage(value) {
		return value.toFixed(1) + '%';
	}
</script>

<div class="selling-table-wrap selling-table-wrap--source table-responsive">
	<table class="table table--default table-borderless">
		{#if tableHead}
			<thead>
				<tr>
					<th>Group Name</th>
					<th>Scanning Date</th>
					<th>Ewes Mated</th>
					<th>Ewes Scanned</th>
					<th>Ewes Pregnant</th>
					<th>Dry Ewes</th>
					<th>Conception %</th>
					<th>Singles</th>
					<th>Twins</th>
					<th>Triplets</th>
					<th>Exp. Fetuses</th>
					<th>Lambing % (Ewes Scanned)</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<div class="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
								<img class="img-fluid" src="/img/sellers/sheep-icon.png" alt="sheep icon" />
							</div>
							<span>{data.groupName}</span>
						</div>
					</td>
					<td>{formatDate(data.scanningDate)}</td>
					<td>{data.ewesMated}</td>
					<td>{data.ewesScanned}</td>
					<td>{data.ewesPregnant}</td>
					<td>{data.dryEwes}</td>
					<td>{formatPercentage(data.conceptionRatio)}</td>
					<td>{data.ewesWithSingles}</td>
					<td>{data.ewesWithTwins}</td>
					<td>{data.ewesWithTrips}</td>
					<td>{data.expFetuses}</td>
					<td>{formatPercentage(data.expLambingPercentScanned)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../../assets/sass/mixins/media-queries';
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
					background: var(--bg-normal);
				}
			
				th {
					font-size: 12px;
					font-weight: 500;
					line-height: 18px;
					color: var(--color-light);
					text-transform: uppercase;
					padding: 11px 15px;
					text-align: center; /* Center the header text */
				}
			}
			
			tbody {
				td {
					white-space: nowrap;
					padding: 10px 15px 10px 0;
					color: var(--color-dark);
					text-align: center; /* Center the cell content */
				}

				tr {
					&:first-child {
						td {
							padding-top: 15px;
						}
					}
				}
				
				/* Keep the first column (with the group name) left-aligned */
				td:first-child {
					text-align: left;
				}
			}

			tr th {
				&:first-child {
					border-radius: 6px 0 0 6px;
					text-align: left; /* Keep first header left-aligned */
				}

				&:last-child {
					border-radius: 0 6px 6px 0;
				}
			}
		}

		&--source {
			.selling-product-img-wrapper {
				margin-right: 12px;
				width: 32px;
				height: 32px;
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: auto;
					height: auto;
					margin-right: 0;
					border-radius: 0;
				}
			}
		}
		
		.selling-product-img {
			img {
				margin-right: 12px;
				width: 32px;
				height: 32px;
				border-radius: 5px;
			}

			span {
				color: var(--color-dark);
				font-size: 15px;
				font-weight: 500;
				line-height: lh(15px, 20px);
				@include ssm {
					padding-right: 15px;
				}
			}
		}
	}
</style>
