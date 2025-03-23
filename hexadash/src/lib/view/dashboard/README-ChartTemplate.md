# Overview Chart Component Template

This document provides guidelines and best practices for creating consistent chart components across the dashboard application.

## Chart Structure

### 1. Component Architecture
The chart component follows a standard structure:
- **Card Container**: Wraps the entire chart in a card with no border
- **Card Header**: Contains the title and filter options
- **Card Body**: Contains the chart visualization
- **Responsive Design**: Adjusts height based on screen size

### 2. Data Processing
- Filter data based on time period (This Year, 5 Years, All)
- Group data by relevant dimension (e.g., group name)
- Sort and limit results to prevent overcrowding (top 8 items)
- Store processed data in a structured format for each time period

### 3. Chart Configuration
- Use consistent styling for axes, tooltips, and data points
- Implement hover effects for better user interaction
- Use the application's color scheme variables for consistency
- Configure tooltips to show relevant information on hover

## Implementation Example

```svelte
<script>
  // Imports
  import { Card, CardHeader, CardBody } from 'sveltestrap';
  import Chartjs from '@components/utilities/Chartjs.svelte';
  import { chartLinearGradient, customTooltips } from '@components/utilities/utilities';
  import { onMount } from 'svelte';
  import data from '@demo-data/your-data-source.json';
  
  // Props
  export let timeFilter = 'today'; // Options: 'today', 'week', 'months'
  
  // State
  let isLoading = false;
  let innerWidth;
  let primaryColor;
  
  // Initialize
  onMount(() => {
    primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
    innerWidth = window.innerWidth;
  });
  
  // Filter handling
  const handleTabActivation = (value) => {
    isLoading = true;
    timeFilter = value;
    setTimeout(() => {
      isLoading = false;
    }, 100);
  };
  
  // Data processing
  const processData = () => {
    // Process data based on timeFilter
    // Return structured data for chart
  };
  
  // Chart configuration
  const chartData = processData();
  
  $: datasets = [
    {
      data: chartData[timeFilter].values,
      // Chart styling properties
    }
  ];
  
  // Scales configuration
  const scales = {
    y: {
      // Y-axis configuration
    },
    x: {
      // X-axis configuration
    }
  };
  
  // Tooltip configuration
  const tooltip = {
    callbacks: {
      title(tooltipItems) {
        return tooltipItems[0].label;
      },
      label(t) {
        // Custom tooltip formatting
      }
    }
  };
</script>

<Card class="chart-card border-0">
  <CardHeader class="border-0">
    <h6>Chart Title</h6>
    <div class="card-extra">
      <ul class="card-tab-links nav">
        <li>
          <a
            on:click|preventDefault={() => handleTabActivation('today')}
            href={'#'}
            class={timeFilter === 'today' ? 'active' : ''}>This Year</a>
        </li>
        <li>
          <a
            on:click|preventDefault={() => handleTabActivation('week')}
            href={'#'}
            class={timeFilter === 'week' ? 'active' : ''}>5 Years</a>
        </li>
        <li>
          <a
            on:click|preventDefault={() => handleTabActivation('months')}
            href={'#'}
            class={timeFilter === 'months' ? 'active' : ''}>All</a>
        </li>
      </ul>
    </div>
  </CardHeader>
  <CardBody>
    <div class="wp-chart">
      {#if !isLoading}
        <div class="parentContainer">
          <Chartjs
            type="line" // or 'bar', 'pie', etc.
            id="chart-id"
            className="chart-class"
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
```

## Best Practices

1. **Naming Conventions**:
   - Use descriptive names for chart components (e.g., `GroupsChart.svelte`)
   - Follow consistent naming for data variables and functions

2. **Time Period Filters**:
   - Always include standard time period filters (This Year, 5 Years, All)
   - Map filter values consistently: 'today' → This Year, 'week' → 5 Years, 'months' → All

3. **Data Processing**:
   - Filter data based on the selected time period
   - Sort data to show the most relevant items first
   - Limit the number of data points to prevent visual clutter (8-10 items max)

4. **Tooltips**:
   - Include relevant information in tooltips
   - Format numbers appropriately
   - Show secondary metrics in tooltips when appropriate

5. **Responsive Design**:
   - Adjust chart height based on screen size
   - Ensure labels are readable on smaller screens
   - Use rotation for x-axis labels when needed

6. **Styling**:
   - Use application color variables for consistency
   - Apply consistent styling for axes, grid lines, and data points
   - Use appropriate chart types for the data being visualized

## Chart Types and Use Cases

1. **Line Charts**:
   - Best for showing trends over time
   - Use for metrics that change continuously

2. **Bar Charts**:
   - Best for comparing discrete categories
   - Use when comparing values across groups

3. **Pie/Doughnut Charts**:
   - Best for showing proportions of a whole
   - Use when displaying percentage breakdowns

4. **Area Charts**:
   - Similar to line charts but with filled areas
   - Use when emphasizing the volume under the curve

## Integration with Pages

When integrating charts into pages:
1. Import the chart component
2. Pass the appropriate timeFilter prop
3. Ensure the chart component is responsive to page filters
4. Place the chart in a properly sized column with appropriate spacing
