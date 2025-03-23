<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import { chartLinearGradient, customTooltips } from '@components/utilities/utilities';
	import { onMount } from 'svelte';
	
	// Props - can be customized by parent components
	export let title = 'Overview Chart';
	export let timeFilter = 'today';
	export let chartType = 'line'; // 'line', 'bar', 'pie', etc.
	export let chartId = 'overview-chart';
	export let chartClass = 'overview-chart';
	export let dataSource = []; // Array of data objects
	export let primaryMetric = 'value'; // Primary metric field name
	export let secondaryMetric = ''; // Optional secondary metric field name
	export let categoryField = 'category'; // Field name for categories/labels
	export let dateField = 'date'; // Field name for date filtering
	export let maxItems = 8; // Maximum number of items to display
	export let tooltipLabel = 'Value'; // Label for the primary metric in tooltip
	export let secondaryTooltipLabel = ''; // Label for the secondary metric in tooltip
	
	// State variables
	let isLoading = false;
	let innerWidth;
	let primaryColor;
	let primaryColorRGB;
	
	// Initialize on component mount
	onMount(() => {
		primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
		primaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue(
			'--color-primary-rgba'
		);
		innerWidth = window.innerWidth;
	});

	// Handle tab/filter changes
	const handleTabActivation = (value) => {
		isLoading = true;
		timeFilter = value;
		setTimeout(() => {
			isLoading = false;
		}, 100);
	};

	// Tooltip configuration
	const tooltip = {
		callbacks: {
			title(tooltipItems) {
				return tooltipItems[0].label;
			},
			label(t) {
				const { dataIndex, formattedValue, dataset } = t;
				const result = [`${formattedValue} ${dataset.label}`];
				
				// Add secondary metric to tooltip if provided
				if (secondaryMetric && chartData[timeFilter][secondaryMetric]) {
					const secondaryValue = chartData[timeFilter][secondaryMetric][dataIndex];
					result.push(`${secondaryValue} ${secondaryTooltipLabel}`);
				}
				
				return result;
			}
		}
	};

	// Get current year for filtering
	const currentYear = new Date().getFullYear();
	
	// Process data for chart based on time period
	const processChartData = () => {
		if (!dataSource || dataSource.length === 0) {
			return {
				today: { labels: [], [primaryMetric]: [] },
				week: { labels: [], [primaryMetric]: [] },
				months: { labels: [], [primaryMetric]: [] }
			};
		}
		
		// Filter data based on time period
		const allRecords = [...dataSource];
		
		// This Year data (current year only)
		const thisYearRecords = allRecords.filter(record => {
			const recordYear = new Date(record[dateField]).getFullYear();
			return recordYear === currentYear;
		});
		
		// 5 Years data (current year and 4 previous years)
		const fiveYearsRecords = allRecords.filter(record => {
			const recordYear = new Date(record[dateField]).getFullYear();
			return recordYear >= currentYear - 4 && recordYear <= currentYear;
		});
		
		// Group and process data
		const processRecords = (records) => {
			// Sort records by primary metric in descending order
			const sortedRecords = [...records].sort((a, b) => b[primaryMetric] - a[primaryMetric]);
			
			// Take top N items to avoid overcrowding
			const topItems = sortedRecords.slice(0, maxItems);
			
			// Extract categories and metrics
			const categories = topItems.map(record => record[categoryField]);
			const primaryData = topItems.map(record => record[primaryMetric]);
			
			// Extract secondary metric if provided
			const secondaryData = secondaryMetric ? 
				topItems.map(record => record[secondaryMetric]) : [];
			
			const result = {
				labels: categories,
				[primaryMetric]: primaryData
			};
			
			// Add secondary metric if provided
			if (secondaryMetric) {
				result[secondaryMetric] = secondaryData;
			}
			
			return result;
		};
		
		// Process data for each time period
		const thisYearData = processRecords(thisYearRecords);
		const fiveYearsData = processRecords(fiveYearsRecords);
		const allData = processRecords(allRecords);
		
		return {
			today: thisYearData,
			week: fiveYearsData,
			months: allData
		};
	};
	
	const chartData = processChartData();
	
	// Chart datasets configuration - reactive to changes in timeFilter
	$: datasets = [
		{
			data: chartData[timeFilter][primaryMetric],
			borderColor: primaryColor,
			borderWidth: 3,
			fill: chartType === 'line', // Only fill for line charts
			backgroundColor: chartType === 'line' ? 
				() => chartLinearGradient(document.getElementById(chartId), 300, {
					start: `rgba(${primaryColorRGB},0.4)`,
					end: 'rgba(0,102,255,0.05)'
				}) : 
				primaryColor,
			label: tooltipLabel,
			pointStyle: 'circle',
			pointRadius: '0',
			hoverRadius: '6',
			pointBorderColor: '#fff',
			pointBackgroundColor: primaryColor,
			hoverBorderWidth: 2,
			barPercentage: 0.6,
			categoryPercentage: 0.6,
			borderRadius: chartType === 'bar' ? 4 : 0,
			lineTension: 0.5
		}
	];

	// Chart scales configuration
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
				padding: 15,
				callback(label) {
					return `${label}`;
				}
			}
		},

		x: {
			grid: {
				display: chartType === 'line', // Only show grid for line charts
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

	// Tooltip configuration with custom formatting
	let tooltipConfig = {
		custom: customTooltips,
		...tooltip
	};
</script>

<Card class="overview-chart-card border-0">
	<CardHeader class="border-0">
		<h6>{title}</h6>
		<div class="card-extra">
			<ul class="card-tab-links nav">
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('today');
						}}
						href={'#'}
						class={timeFilter === 'today' ? 'active' : ''}>This Year</a
					>
				</li>
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('week');
						}}
						href={'#'}
						class={timeFilter === 'week' ? 'active' : ''}>5 Years</a
					>
				</li>
				<li>
					<a
						on:click|preventDefault={() => {
							handleTabActivation('months');
						}}
						href={'#'}
						class={timeFilter === 'months' ? 'active' : ''}>All</a
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
						type={chartType}
						id={chartId}
						className={chartClass}
						labels={chartData[timeFilter].labels}
						datasets={datasets}
						{scales}
						height={innerWidth < 1399 ? (innerWidth < 575 ? 200 : 150) : 120}
					/>
				</div>
			{:else}
				<div class="chart-loading"><a-spin /></div>
			{/if}
		</div>
	</CardBody>
</Card>

<style lang="scss">
	:global {
		.overview-chart-card {
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
