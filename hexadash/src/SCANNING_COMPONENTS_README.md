# Scanning Management System Components

This document provides a comprehensive overview of all scanning-related components in the PLI Hexadash Svelte application.

## Table of Contents
1. [Pages](#pages)
2. [Components](#components)
3. [Data Structure](#data-structure)
4. [Integration Points](#integration-points)

## Pages

### Scanning Dashboard (`/home-scanning`)
- **Purpose**: Main dashboard for scanning management overview
- **Features**:
  - Overview cards showing key scanning metrics
  - Scan type chart showing distribution of scan results (Singles, Twins, Triplets, Dry)
  - Scanning table showing recent scanning records
- **Components Used**:
  - BreadcrumbThree
  - OverviewCards
  - ScanTypeChart
  - ScanningTable

## Components

### ScanTypeChart
- **Purpose**: Visual representation of scan result distribution
- **Location**: `src/lib/view/dashboard/scanning/ScanTypeChart.svelte`
- **Features**:
  - Pie chart showing distribution of Singles, Twins, Triplets, and Dry ewes
  - Time period filtering (This Year, 5 Years, All)
  - Interactive tooltips showing detailed information for each category
  - Legend with color-coded categories and percentages
- **Props**:
  - `timeFilter`: Controls the time period for data filtering
- **Data Source**: `scanning-records.json`

### ScanningTable
- **Purpose**: Tabular display of scanning records
- **Location**: `src/lib/view/scanning/ScanningTable.svelte`
- **Features**:
  - Displays comprehensive scanning data including group name, scanning date, ewes mated/scanned/pregnant, and lambing percentages
  - Color-coded lambing percentages based on performance thresholds:
    - Lambing % (Ewes Mated): Red (<100%), Yellow (100-120%), Green (>120%)
    - Lambing % (Ewes Pregnant): Red (<120%), Yellow (120-160%), Green (>160%)
  - Centered data alignment for better readability
  - Row selection functionality for batch operations
  - Action buttons for edit, view, and delete operations
- **Data Source**: `scanning-records.json`

## Data Structure

The scanning components use data from the `src/demo-data/scanning-records.json` file, which contains scanning records with the following structure:

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
      "notes": "Good condition overall"
    }
  ]
}
```

### Key Properties:
- **ewesWithSingles**: Number of ewes carrying a single lamb
- **ewesWithTwins**: Number of ewes carrying twin lambs
- **ewesWithTrips**: Number of ewes carrying triplet lambs
- **dryEwes**: Number of ewes that are not pregnant

## Integration Points

### With Breeding Module
- Scanning records are linked to breeding groups
- Scanning results provide critical data for lambing predictions
- Scanning data influences breeding decisions for future seasons

### With Groups Module
- Scanning is a key milestone in the group lifecycle
- Group status is updated based on scanning completion
- Scanning results are displayed in group details

### With Dashboard
- Scanning metrics contribute to overall farm performance indicators
- Scanning results are used in trend analysis and forecasting
