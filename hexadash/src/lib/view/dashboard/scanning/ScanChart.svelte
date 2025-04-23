<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import { chartLinearGradient, customTooltips } from '@components/utilities/utilities';
	import { onMount } from 'svelte';
	import scanningData from '@demo-data/scanning-records.json';
	
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
			title(tooltipItems) {
				return tooltipItems[0].label;
			},
			label(t) {
				const { dataIndex, formattedValue, dataset } = t;
				const groupName = t.chart.data.labels[dataIndex];
				return [`${formattedValue}% ${dataset.label}`];
			}
		}
	};

	// Get current year
	const currentYear = new Date().getFullYear();
	
	// Process scanning data for chart
	const processScanningData = () => {
		// Filter data based on time period
		const allRecords = scanningData.records;
		
		// This Year data (current year only)
		const thisYearRecords = allRecords.filter(record => {
			const recordYear = new Date(record.scanningDate).getFullYear();
			return recordYear === currentYear;
		});
		
		// 5 Years data (current year and 4 previous years)
		const fiveYearsRecords = allRecords.filter(record => {
			const recordYear = new Date(record.scanningDate).getFullYear();
			return recordYear >= currentYear - 4 && recordYear <= currentYear;
		});
		
		// Group data by group name
		const groupByGroup = (records) => {
			// Sort records by conception ratio in descending order
			const sortedRecords = [...records].sort((a, b) => b.conceptionRatio - a.conceptionRatio);
			
			// Take top 8 groups by conception ratio to avoid overcrowding
			const topGroups = sortedRecords.slice(0, 8);
			
			// Extract group names and conception ratios
			const groupNames = topGroups.map(record => record.groupName);
			const conceptionRatios = topGroups.map(record => record.conceptionRatio);
			
			return {
				labels: groupNames,
				conception: conceptionRatios
			};
		};
		
		// Process data for each time period
		const thisYearData = groupByGroup(thisYearRecords);
		const fiveYearsData = groupByGroup(fiveYearsRecords);
		const allData = groupByGroup(allRecords);
		
		return {
			today: {
				labels: thisYearData.labels,
				conception: thisYearData.conception
			},
			week: {
				labels: fiveYearsData.labels,
				conception: fiveYearsData.conception
			},
			months: {
				labels: allData.labels,
				conception: allData.conception
			}
		};
	};
	
	const chartData = processScanningData();
	
	$: salesRevenueDatasets = [
		{
			data: chartData[revenue].conception,
			borderColor: primaryColor,
			borderWidth: 3,
			fill: true,
			backgroundColor: () =>
				chartLinearGradient(document.getElementById('ninjadash-sales-revenue'), 300, {
					start: `rgba(${primaryColorRGB},0.4)`,
					end: 'rgba(255,255,255,0.05)'
				}),
			label: 'Conception Rate',
			pointStyle: 'circle',
			pointRadius: '0',
			hoverRadius: '6',
			pointBorderColor: '#fff',
			pointBackgroundColor: primaryColor,
			hoverBorderWidth: 2,
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
				color: '#747474',
				Min: 0,
				Max: 100,
				stepSize: 10,
				padding: 15,
				callback(label) {
					return `${label}%`;
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
				color: '#747474',
				padding: 10,
				autoSkip: true,
				maxRotation: 45,
				minRotation: 45
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
		<h6>Conception Chart</h6>
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
						labels={chartData[revenue].labels}
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
