<script>
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap';

	export let dataPeriod;
	export let tableHead = true;

	const src = '/img/svg/more-horizontal.svg';
</script>

<div class="selling-table-wrap selling-table-wrap--source table-responsive">
	<table class="table table--default table-borderless">
		{#if tableHead}
			<thead>
				<tr>
					<th>Group Name/Season Name</th>
					<th># Ewes Lambed</th>
					<th># Ewes Not Lambed</th>
					<th># Lambs Born</th>
					<th># Lambs Dead</th>
					<th>Lambing % (Ewes Lambed)</th>
					<th>Lambing % (Ewes Mated)</th>
					<th>Mortality % </th>
					<th>Action</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each dataPeriod as data}
				<tr>
					<td>
						<div class="selling-product-img d-flex align-items-center">
							<div class="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
								<img class=" img-fluid" src="/img/sellers/{data.img}" alt="img" />
							</div>
							<span>{data.grname}</span>
						</div>
					</td>
					<td>{data.eweslambed}</td>
					<td>{data.ewesnotlambed}</td>
					<td>{data.lambsborn}</td>
					<td>{data.lambsdead}</td>
					<td>{data.lambingeweslambed}</td>
					<td>{data.lambingewesmated}</td>
					<td>{data.mortality}</td>
					<td>
						<div>
							<Dropdown nav>
								<DropdownToggle nav>
									<img class="svg" alt="" {src} />
								</DropdownToggle>
								<DropdownMenu end>
									<DropdownItem href={'#'}>Edit</DropdownItem>
									<DropdownItem href={'#'}></DropdownItem>
								</DropdownMenu>

							</Dropdown>
						</div>
					</td>
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
					background: var(--bg-normal);
				}
			}
		}
		@include lg {
			padding-bottom: 0;
		}

		table {
			tbody {
				td {
					white-space: nowrap;
					padding: 10px 15px 10px 0;
					color: var(--color-dark);
				}

				tr {
					&:first-child {
						td {
							padding-top: 15px;
						}
					}
				}
			}

			thead {
				tr {
					th {
						font-size: 12px;
						font-weight: 500;
						line-height: 18px;
						color: var(--color-light);
						text-transform: uppercase;
						padding: 11px 15px;
					}
				}
			}

			tr th {
				&:first-child {
					border-radius: 6px 0 0 6px;
				}

				&:last-child {
					border-radius: 0 6px 6px 0;
				}
			}
		}

		&.selling-table-wrap--2 {
			table {
				tbody {
					tr {
						&:first-child {
							td {
								padding-top: 3px;
							}
						}

						td {
							&:not(:first-child) {
								font-size: 14px;
							}

							&:last-child {
								padding-right: 0;
							}
						}
					}
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

			&--2 {
				img {
					width: 25px;
					height: 25px;
					border-radius: 0;
					object-fit: contain;
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

				i {
					font-size: 18px;
				}
			}

			.progress {
				min-width: 120px;
				height: 4px;
			}
			&.selling-table-wrap {
				table {
					tbody {
						td {
							width: 15%;
						}
					}
				}
			}

			.table--default {
				tr td:last-child {
					padding-right: 0;
				}

				tbody tr {
					&:hover {
						background-color: transparent;
					}
				}
			}
		}
	}
</style>
