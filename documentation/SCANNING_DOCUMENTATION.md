# Scanning Management System Documentation

## Overview

The Scanning Management System is a comprehensive module within the PLI Hexadash application designed to track, analyze, and visualize pregnancy scanning results for sheep breeding operations. This documentation provides detailed information about the scanning module's components, data structure, usage guidelines, and integration with other modules.

## Table of Contents

1. [Module Components](#module-components)
2. [Data Structure](#data-structure)
3. [User Interface](#user-interface)
4. [Integration Points](#integration-points)
5. [Technical Implementation](#technical-implementation)
6. [Usage Guidelines](#usage-guidelines)
7. [Troubleshooting](#troubleshooting)

## Module Components

### Scanning Dashboard

The Scanning Dashboard (`/home-scanning`) serves as the central hub for all scanning-related information and provides:

- **Overview Cards**: Display key metrics including total ewes scanned, average scanning rate, and pregnancy percentages
- **Scan Type Chart**: Visual representation of scan result distribution (Singles, Twins, Triplets, Dry)
- **Scanning Records Table**: Comprehensive list of recent scanning sessions with detailed results

### ScanTypeChart Component

Located at `src/lib/view/dashboard/scanning/ScanTypeChart.svelte`, this component:

- Displays a pie chart showing the distribution of scan results
- Provides time period filtering (This Year, 5 Years, All)
- Features interactive tooltips showing detailed information for each category:
  - Percentage of scanned ewes
  - Number of ewes with specific results (singles, twins, triplets, or dry)
- Includes a color-coded legend with icons representing each category

#### Chart Configuration

The chart uses the following configuration:
- **Colors**:
  - Singles: Green (#4CAF50)
  - Twins: Blue (#2196F3)
  - Triplets: Orange (#FF9800)
  - Dry: Red (#F44336)
- **Icons**:
  - Singles: baby
  - Twins: baby-carriage
  - Triplets: child
  - Dry: times-circle

### ScanningTable Component

Located at `src/lib/view/dashboard/scanning/ScanningTable.svelte`, this component:

- Displays scanning records in a tabular format
- Includes columns for date, group, ewes scanned, and result breakdown
- Supports time period filtering to match the ScanTypeChart
- Provides sorting functionality for all columns

## Data Structure

The scanning module uses data from `src/demo-data/scanning-records.json` with the following structure:

```json
{
  "records": [
    {
      "id": "scan-001",
      "groupId": "group-001",
      "groupName": "Spring 2025 - Blue",
      "scanningDate": "2025-01-15",
      "ewesScanned": 24,
      "ewesWithSingles": 5,
      "ewesWithTwins": 15,
      "ewesWithTrips": 2,
      "dryEwes": 2,
      "notes": "Good condition overall",
      "technician": "John Smith",
      "location": "Main Yard"
    }
  ]
}
```

### Key Properties

- **id**: Unique identifier for the scanning record
- **groupId**: Reference to the associated breeding group
- **groupName**: Name of the breeding group
- **scanningDate**: Date when scanning was performed
- **ewesScanned**: Total number of ewes scanned
- **ewesWithSingles**: Number of ewes carrying a single lamb
- **ewesWithTwins**: Number of ewes carrying twin lambs
- **ewesWithTrips**: Number of ewes carrying triplet lambs
- **dryEwes**: Number of ewes that are not pregnant
- **notes**: Additional information about the scanning session
- **technician**: Person who performed the scanning
- **location**: Where the scanning was performed

## User Interface

### Scanning Dashboard Layout

The scanning dashboard follows a responsive layout design:
- **Top Row**: BreadcrumbThree component for navigation
- **Second Row**: Four OverviewCards with key metrics (xxl={3} sm={6} ssm={12})
- **Third Row**: ScanTypeChart taking full width (xxl={12})
- **Fourth Row**: ScanningTable at full width (xxl={12})

### Time Period Filtering

Both the ScanTypeChart and ScanningTable components support time period filtering with three options:
- **This Year**: Shows data from the current year only
- **5 Years**: Shows data from the current year and four previous years
- **All**: Shows all available data regardless of date

The filter controls are implemented as tabs at the top of each component and maintain synchronization between components.

### Interactive Elements

- **Chart Tooltips**: Hovering over chart segments displays detailed information
- **Legend Items**: Visual representation of each category with color, icon, label, and percentage
- **Table Sorting**: Clicking column headers sorts the table by that column
- **Table Pagination**: Navigation through multiple pages of scanning records

## Integration Points

### With Breeding Module

- Scanning records are directly linked to breeding records through the groupId
- Scanning results inform expected lambing outcomes and help with resource planning
- Breeding success rates can be correlated with scanning results for performance analysis

### With Groups Module

- Scanning is a key milestone in the group lifecycle
- Group status is updated based on scanning completion
- Scanning results are displayed in group details and influence group management decisions

### With Dashboard

- Scanning metrics contribute to overall farm performance indicators
- Scanning results are used in trend analysis and forecasting
- Key performance indicators derived from scanning data appear on the main dashboard

## Technical Implementation

### Component Architecture

The scanning module follows a component-based architecture with:
- **Container Components**: Handle data fetching and state management
- **Presentation Components**: Focus on rendering UI elements
- **Shared Components**: Reused across different parts of the application

### Data Processing

The ScanTypeChart component processes data through the following steps:
1. Fetch raw scanning records from the data source
2. Filter records based on the selected time period
3. Calculate totals for each scan result category
4. Compute percentages based on the total number of ewes scanned
5. Generate chart data with appropriate colors and labels
6. Render the chart with interactive elements

### Responsive Design

All scanning components are built with responsive design principles:
- Fluid layouts that adapt to different screen sizes
- Mobile-friendly touch targets
- Appropriate font scaling
- Collapsible elements for smaller screens

## Usage Guidelines

### Interpreting Scan Results

- **Singles**: Ewes carrying one lamb - typically require standard management
- **Twins**: Ewes carrying two lambs - may need additional nutrition in late pregnancy
- **Triplets**: Ewes carrying three lambs - require special attention and feeding
- **Dry**: Ewes that are not pregnant - may indicate fertility issues or missed breeding

### Best Practices

- **Regular Scanning**: Schedule scanning sessions 40-80 days after breeding
- **Record Keeping**: Maintain detailed records of all scanning sessions
- **Result Analysis**: Regularly review scanning results to identify trends
- **Integration**: Use scanning data to inform breeding and feeding decisions

## Troubleshooting

### Common Issues

- **No Data Displayed**: Ensure scanning records exist in the data source
- **Incorrect Percentages**: Verify that all ewes are properly accounted for in the records
- **Chart Not Updating**: Check that time period filters are working correctly
- **Missing Groups**: Confirm that group references in scanning records match existing groups

### Support Resources

- **Technical Documentation**: Refer to the component README files for implementation details
- **Data Schema**: Review the data structure documentation for proper formatting
- **Component API**: Consult the component API documentation for available props and events
