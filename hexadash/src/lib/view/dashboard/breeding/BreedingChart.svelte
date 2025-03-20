<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import { chartLinearGradient, customTooltips } from '@components/utilities/utilities';
	import { onMount } from 'svelte';
	let revenue = 'today';
	let isLoading = false;

	let innerWidth;
	let primaryColor;
	let primaryColorRGB;
	onMount(() => {
		primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
		primaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-primary-rgba'
		);
		innerWidth = window.innerWidth;
	});

	const handleTabActivation = (value) => {
		isLoading = true;
		revenue = value;
		setTimeout(() => {
			isLoading = false;
		}, 100);
	};

	const tooltip = {
		callbacks: {
			title() {
				return `Total Revenue`;
			},
			label(t) {
				const { formattedValue, dataset } = t;
				return `${formattedValue}k ${dataset.label}`;
			}
		}
	};

	let salesRevenue = {
		today: {
			users: [100, 200],
			labels: ['2020-01', '2020-02']
		},
		week: {
			users: [40, 30, 35, 20, 25, 40, 35],
			labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		},
		months: {
			users: [45, 20, 35, 32, 50, 45, 55, 71, 36, 65, 55, 75],
			labels: ['Jan', 'Feb', 'Mar', 'App', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec']
		}
	};
	$: salesRevenueDatasets = [
		{
			data: salesRevenue[revenue].users,
			borderColor: primaryColor,
			borderWidth: 3,
			fill: true,
			backgroundColor: () =>
				chartLinearGradient(document.getElementById('ninjadash-sales-revenue'), 300, {
					start: `rgba(${primaryColorRGB},0.4)`,
					end: 'rgba(0,102,255,0.05)'
				}), 
			label: ' Ewes',
			pointStyle: 'circle',
			pointRadius: '0',
			hoverRadius: '6',
			pointBorderColor: '#fff',
			pointBackgroundColor: primaryColor,
			hoverBorderWidth: 2,
			amount: '',
			amountClass: 'current-amount',
			lineTension: 0.5
		}
	];

	const scales = {
		y: {
			grid: {
				color: '#E3E6EF',
				borderDash: [3, 3],
				zeroLineColor: '#E3E6EF',
				zeroLineWidth: 1,
				zeroLineBorderDash: [3, 3],
				drawTicks: false,
				drawBorder: false
			},
			ticks: {
				beginAtZero: true,
				font: {
					size: 14,
					family: "'Jost', sans-serif"
				},
				color: '#0066ff',
				Min: 0,
				Max: 1000,
				stepSize: 50,
				padding: 15,
				callback(label) {
					return `${label}`;
				}
			}
		},

		x: {
			grid: {
				display: true,
				zeroLineWidth: 0,
				drawTicks: true,
				drawBorder: false,
				zeroLineColor: '#E3E6EF',
				color: 'transparent',
				z: 1,
				tickMarkLength: 0
			},
			ticks: {
				beginAtZero: true,
				font: {
					size: 14,
					family: "'Jost', sans-serif"
				},
				color: '#747474'
			}
		}
	};

	let tooltipss = {
		custom: customTooltips,
		...tooltip
	};
</script>

<Card class="sales-revenue border-0">
	<CardHeader class="border-0">
		<h6>Breeding Charts</h6>
		<div class="card-extra">
			<ul class="card-tab-links nav">
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('today');
						}}
						href={'#'}
						class={revenue === 'today' ? 'active' : ''}>This Year</a
					>
				</li>
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('week');
						}}
						href={'#'}
						class={revenue === 'week' ? 'active' : ''}>5 Years</a
					>
				</li>
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('months');
						}}
						href={'#'}
						class={revenue === 'months' ? 'active' : ''}>All</a
					>
				</li>
			</ul>
		</div>
	</CardHeader>
	<CardBody>
		<div class="wp-chart">
			{#if !isLoading}
				<div class="parentContainer">
					<Chartjs
						type="bar"
						id="ninjadash-sales-revenue"
						className="ninjadash-sales-revenue"
						labels={salesRevenue[revenue].labels}
						datasets={salesRevenueDatasets}
						{scales}
						height={innerWidth < 1399 ? (innerWidth < 575 ? 200 : 150) : 120}
					/>
				</div>
			{:else}
				<div class="ninjadash-sales-revenue-loading"><a-spin /></div>
			{/if}
		</div>
	</CardBody>
</Card>

<style lang="scss">
	:global {
		.sales-revenue {
			height: 100%;
			.card-body {
				padding: 0 15px 27px 10px;
			}
			.chartjs-tooltip {
				.chartjs-tooltip-key {
					display: none;
				}
			}
		}
	}
</style>
