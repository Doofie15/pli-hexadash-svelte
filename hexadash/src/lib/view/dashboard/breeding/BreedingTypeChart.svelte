<script>
	import { Card, CardHeader, CardBody } from 'sveltestrap';
	import CardExtra from '@components/cards/CardExtra.svelte';
	import Chartjs from '@components/utilities/Chartjs.svelte';
	import breedingData from '@demo-data/breeding-records.json';
	import { onMount } from 'svelte';

	// Time filter state
	export let timeFilter = 'today';
	let isLoading = false;

	// Chart configuration
	let height = 500	;
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
		responsive: false,
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

	// Process data from breeding records
	const processBreedingTypeData = () => {
		// Get all records
		const allRecords = breedingData.records;
		
		// Filter records based on time period
		let filteredRecords;
		if (timeFilter === 'today') {
			// This Year - current year only
			filteredRecords = allRecords.filter(record => {
				const recordYear = new Date(record.timestamp).getFullYear();
				return recordYear === currentYear;
			});
		} else if (timeFilter === 'week') {
			// 5 Years - current year and 4 previous years
			filteredRecords = allRecords.filter(record => {
				const recordYear = new Date(record.timestamp).getFullYear();
				return recordYear >= currentYear - 4 && recordYear <= currentYear;
			});
		} else {
			// All time
			filteredRecords = [...allRecords];
		}

		// Count ewes by mating type
		const matingTypeCounts = {};
		let totalEwes = 0;

		filteredRecords.forEach(record => {
			const { matingType, ewes } = record;
			if (!matingTypeCounts[matingType]) {
				matingTypeCounts[matingType] = 0;
			}
			matingTypeCounts[matingType] += ewes;
			totalEwes += ewes;
		});

		// Calculate percentages and prepare data
		const matingTypeData = [];
		
		// Softer, livestock-friendly colors
		const colors = {
			'Natural Mating': '#4CAF50', // Green
			'Cervical AI': '#2196F3',    // Blue
			'Laparoscopic AI': '#FF9800' // Orange
		};
		
		// Icons for each mating type
		const icons = {
			'Natural Mating': 'sheep',
			'Cervical AI': 'syringe',
			'Laparoscopic AI': 'microscope'
		};

		for (const [type, count] of Object.entries(matingTypeCounts)) {
			const percentage = totalEwes > 0 ? Math.round((count / totalEwes) * 100) : 0;
			matingTypeData.push({
				label: type,
				value: percentage,
				count: count,
				color: colors[type] || '#78909C', // Default color if not in predefined colors
				icon: icons[type] || 'info-circle'
			});
		}

		// Sort by value (percentage) in descending order
		matingTypeData.sort((a, b) => b.value - a.value);

		return matingTypeData;
	};

	// Handle tab/filter changes
	const handleTabActivation = (value) => {
		isLoading = true;
		timeFilter = value;
		setTimeout(() => {
			isLoading = false;
		}, 100);
	};

	// Reactive data processing based on timeFilter
	$: dataStats = processBreedingTypeData();
	$: labels = dataStats.map(item => item.label);
	$: values = dataStats.map(item => item.value);
	$: colors = dataStats.map(item => item.color);

	$: chartData = [
		{
			label: 'Mating Type Distribution',
			data: values,
			backgroundColor: colors
		}
	];

	let tooltip = {
		backgroundColor: '#0066FF',
		titleFontSize: 16,
		titleFontColor: '#0066ff',
		bodyFontColor: '#000',
		bodyFontSize: 14,
		displayColors: false,

		callbacks: {
			title(t) {
				return t[0].label;
			},
			label(t) {
				const { dataIndex } = t;
				return `${values[dataIndex]}% (${dataStats[dataIndex].count} ewes)`;
			}
		}
	};
</script>

<Card class="border-0 px-25 h-100">
	<CardHeader class="px-0 border-0 pb-md-20 pb-0">
		<h6>Mating Type</h6>
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
		<div class="chart-content revenuePieChart--wrapper px-0 flex-grow-1">
			{#if !isLoading}
				<div class="chart-container">
					<Chartjs
						type="pie"
						className="revenuePieChart"
						id="revenuePieChart"
						{labels}
						{options}
						{scales}
						datasets={chartData}
						{tooltip}
						{height}
					/>
				</div>
			{:else}
				<div class="chart-loading"><a-spin /></div>
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
		@import '../../../../..//src/assets/sass/mixins/media-queries';
		
		.chart-content {
			padding: 15px 15px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.chart-container {
				width: 100%;
				display: flex;
				justify-content: center;
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
	}
</style>
