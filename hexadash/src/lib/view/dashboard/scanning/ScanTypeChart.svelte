<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import scanningData from '@demo-data/scanning-records.json';	

	// Time filter state
	export let timeFilter = 'today';
	let isLoading = false;

	// Chart configuration
	let height = 500;
	let scales = {
		y: {
			display: false
		},
		x: {
			display: false
		}
	};
	let options = {
		hoverOffset: 3,
		maintainAspectRatio: false,
		responsive: true,
		borderColor: '#fff',
		plugins: {
			legend: {
				display: false
			},
			labels: {
				display: false
			}
		},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};

	// Get current year for filtering
	const currentYear = new Date().getFullYear();

	// Process data from scanning records
	const processScanTypeData = () => {
		// Get all records
		const allRecords = scanningData.records || [];
		
		// Handle empty dataset
		if (allRecords.length === 0) {
			return [{
				label: 'No Data',
				value: 100,
				count: 0,
				color: '#78909C',
				icon: 'info-circle'
			}];
		}
		
		// Filter records based on time period
		let filteredRecords;
		if (timeFilter === 'today') {
			// This Year - current year only
			filteredRecords = allRecords.filter(record => {
				const recordYear = new Date(record.scanningDate || record.timestamp).getFullYear();
				return recordYear === currentYear;
			});
		} else if (timeFilter === 'week') {
			// 5 Years - current year and 4 previous years
			filteredRecords = allRecords.filter(record => {
				const recordYear = new Date(record.scanningDate || record.timestamp).getFullYear();
				return recordYear >= currentYear - 4 && recordYear <= currentYear;
			});
		} else {
			// All time
			filteredRecords = [...allRecords];
		}

		// If no records match the filter
		if (filteredRecords.length === 0) {
			return [{
				label: 'No Data',
				value: 100,
				count: 0,
				color: '#78909C',
				icon: 'info-circle'
			}];
		}

		// Calculate fetus distribution from scanning data
		const scanResults = {
			'Singles': 0,
			'Twins': 0,
			'Triplets': 0,
			'Dry': 0
		};

		filteredRecords.forEach(record => {
			// Use actual data from the record if available
			scanResults['Singles'] += record.ewesWithSingles || 0;
			scanResults['Twins'] += record.ewesWithTwins || 0;
			scanResults['Triplets'] += record.ewesWithTrips || 0;
			scanResults['Dry'] += record.dryEwes || 0;
		});

		// Calculate percentages and prepare data
		const scanTypeData = [];
		let totalEwes = Object.values(scanResults).reduce((sum, count) => sum + count, 0);
		
		// If no data exists after calculations
		if (totalEwes === 0) {
			return [{
				label: 'No Data',
				value: 100,
				count: 0,
				color: '#78909C',
				icon: 'info-circle'
			}];
		}
		
		// Colors for scan results
		const colors = {
			'Singles': '#4CAF50', // Green
			'Twins': '#2196F3',   // Blue
			'Triplets': '#FF9800', // Orange
			'Dry': '#F44336'    // Red
		};
		
		// Icons for each scan result
		const icons = {
			'Singles': 'baby',
			'Twins': 'baby-carriage',
			'Triplets': 'child',
			'Dry': 'times-circle'
		};

		for (const [type, count] of Object.entries(scanResults)) {
			const percentage = totalEwes > 0 ? Math.round((count / totalEwes) * 100) : 0;
			scanTypeData.push({
				label: type,
				value: percentage,
				count: count,
				color: colors[type] || '#78909C', // Default color if not in predefined colors
				icon: icons[type] || 'info-circle'
			});
		}

		// Sort by value (percentage) in descending order
		scanTypeData.sort((a, b) => b.value - a.value);

		return scanTypeData;
	};

	// Handle tab activation
	const handleTabActivation = (value) => {
		isLoading = true;
		timeFilter = value;
		setTimeout(() => {
			isLoading = false;
		}, 100);
	};

	// Reactive data processing based on timeFilter
	$: dataStats = processScanTypeData();
	$: labels = dataStats.map(item => item.label);
	$: values = dataStats.map(item => item.value);
	$: colors = dataStats.map(item => item.color);

	$: chartData = [
		{
			label: 'Scan Result Distribution',
			data: values,
			backgroundColor: colors
		}
	];

	let tooltip = {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		titleFontSize: 16,
		titleFontColor: '#ffffff',
		bodyFontColor: '#ffffff',
		bodyFontSize: 14,
		displayColors: false,
		padding: 10,

		callbacks: {
			title(t) {
				const { dataIndex } = t[0];
				const item = dataStats[dataIndex];
				return `${item.label}`;
			},
			label(t) {
				const { dataIndex } = t;
				const item = dataStats[dataIndex];
				
				// Format based on scan type
				let description = '';
				if (item.label === 'Singles') {
					description = `${item.count} ewes with single lambs`;
				} else if (item.label === 'Twins') {
					description = `${item.count} ewes with twin lambs`;
				} else if (item.label === 'Triplets') {
					description = `${item.count} ewes with triplet lambs`;
				} else if (item.label === 'Dry') {
					description = `${item.count} dry ewes`;
				} else {
					description = `${item.count} ewes`;
				}
				
				return [`${item.value}% of scanned ewes`, description];
			}
		}
	};
</script>

<Card class="border-0 px-25 h-100">
	<CardHeader class="px-0 border-0 pb-md-20 pb-0">
		<h6>Scan Results</h6>
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
	<CardBody class="p-0 d-flex flex-column h-100">
		<div class="chart-content px-0 flex-grow-1">
			{#if !isLoading}
				<div class="chart-container">
					<Chartjs
						type="pie"
						className="scanTypePieChart"
						id="scanTypePieChart"
						{labels}
						{options}
						{scales}
						datasets={chartData}
						{tooltip}
						{height}
					/>
				</div>
			{:else}
				<div class="chart-loading">Loading...</div>
			{/if}
		</div>
		<div class="chart-legend">
			{#each dataStats as item}
				<div class="legend-item">
					<span class="color-indicator" style="background-color: {item.color}"></span>
					<span class="icon"><i class="fas fa-{item.icon}"></i></span>
					<span class="label">{item.label}</span>
					<span class="value">{item.value}%</span>
				</div>
			{/each}
		</div>
	</CardBody>
</Card>

<style lang="scss">
	:global {
		.chart-content {
			padding: 15px 15px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.chart-container {
				width: 100%;
				display: flex;
				justify-content: center;
				min-height: 200px;
			}
		}
		
		.chart-legend {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 12px;
			padding: 15px 15px 20px;
			margin-top: auto;
			border-top: 1px solid var(--border-light);
			
			.legend-item {
				display: flex;
				align-items: center;
				margin-right: 10px;
				
				.color-indicator {
					width: 12px;
					height: 12px;
					border-radius: 50%;
					margin-right: 5px;
				}
				
				.icon {
					margin-right: 5px;
					font-size: 12px;
					color: var(--color-dark);
				}
				
				.label {
					font-weight: 500;
					font-size: 13px;
					color: var(--color-dark);
					margin-right: 5px;
				}
				
				.value {
					font-size: 13px;
					font-weight: 600;
					color: var(--color-gray);
				}
			}
		}
		
		.chart-loading {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 200px;
		}
	}
</style>
