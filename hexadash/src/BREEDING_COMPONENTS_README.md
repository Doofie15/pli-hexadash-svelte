# Breeding Management System Components

This document provides a comprehensive overview of all breeding-related components in the PLI Hexadash Svelte application.

## Table of Contents
1. [Pages](#pages)
2. [Components](#components)
3. [Services](#services)
4. [Data Structure](#data-structure)
5. [Stores](#stores)
6. [Integration Points](#integration-points)

## Pages

### Breeding Dashboard (`/home-breeding`)
- **Purpose**: Main dashboard for breeding management overview
- **Features**:
  - Overview cards showing key breeding metrics
  - Breeding chart (75% width) displaying breeding statistics over time
  - Breeding type chart (25% width) showing distribution of mating types
  - Breeding table showing recent breeding records
- **Components Used**:
  - BreadcrumbThree
  - OverviewCards
  - BreedingChart
  - BreedingTypeChart
  - BreedingTable

### All Breeding Records (`/pages/all-breeding`)
- **Purpose**: Comprehensive list of all breeding records with filtering and search
- **Features**:
  - Search functionality
  - Mating type filtering
  - Export to CSV capability
  - Pagination
- **Components Used**:
  - BreadcrumbOne
  - BreedingTableToolbox
  - BreedingTable
  - PaginationBasic

### Add Breeding Record (`/pages/page-add_breeding`)
- **Purpose**: Form for adding new breeding records
- **Features**:
  - Group selection with searchable dropdown
  - Add new group functionality
  - Mating type selection
  - Date selection with automatic calculations
  - File upload capability
- **Components Used**:
  - BreadcrumbOne
  - AddBreedingRecord

## Components

### BreedingTable.svelte
- **Purpose**: Displays breeding records with time-based filtering
- **Features**:
  - Filters records by time period (This Year, 5 Years, All)
  - Uses breeding-records.json as data source
  - Passes filtered data to Breeding.svelte component

### Breeding.svelte
- **Purpose**: Table component for displaying breeding records
- **Features**:
  - Displays 9 columns of breeding information
  - Formats dates for readability
  - Compact design with optimized spacing
  - Responsive layout

### BreedingTableToolbox.svelte
- **Purpose**: Provides search, filtering, and action buttons for breeding tables
- **Features**:
  - Search functionality with event dispatching
  - Mating type filtering (All, Natural Mating, Cervical AI, Laparoscopic AI)
  - Export to CSV functionality
  - Add breeding button
  - Consistent styling with other toolbox components

### AddBreedingRecord.svelte
- **Purpose**: Form component for adding new breeding records
- **Features**:
  - Searchable group dropdown
  - Add group modal for creating new groups
  - Mating type selection
  - Automatic calculations:
    - Ram to ewe ratio
    - Mating days
    - Expected lambing dates
  - File upload capability
  - Form validation

### BreedingChart.svelte
- **Purpose**: Visualizes breeding statistics over time
- **Features**:
  - Line chart showing breeding metrics
  - Time period filters (Today, Week, Month)
  - Custom tooltips and gradient styling

### BreedingTypeChart.svelte
- **Purpose**: Displays distribution of mating types
- **Features**:
  - Pie chart showing percentage breakdown
  - Color-coded segments with legends
  - Optimized layout for narrower display

## Services

### breedingService.js
- **Purpose**: Manages breeding record data
- **Features**:
  - CRUD operations for breeding records
  - Data persistence using API endpoints
  - Fallback to local storage if API fails
  - Integration with Svelte stores for reactivity

### groupService.js
- **Purpose**: Manages group data
- **Features**:
  - CRUD operations for groups
  - Automatic code generation for new groups
  - Data persistence in localStorage
  - Integration with Svelte stores for reactivity

## Data Structure

### breeding-records.json
- **Purpose**: Primary data source for breeding records
- **Structure**:
  - id: Unique identifier
  - timestamp: Record creation time
  - groupId/groupName: Associated group
  - matingType: Natural Mating, Cervical AI, or Laparoscopic AI
  - status: Active, Completed, Failed, or Scheduled
  - ewes/rams: Number of animals
  - ramEweRatio: Calculated ratio
  - startDate/endDate: Mating period
  - days: Duration of mating
  - lambingStartDate/lambingEndDate: Expected lambing period
  - averageMatingWeight: Weight in kg
  - productionYear: Year of production
  - notes: Additional information
  - files: Associated documents

### breeding-overview.js
- **Purpose**: Calculates statistics for overview cards
- **Features**:
  - Total ewes mated, rams used, average mating days, mating groups
  - Year-over-year growth calculations
  - Formatted for overview cards display

## Stores

### breedingStore.js
- **Purpose**: Provides reactive state management for breeding data
- **Features**:
  - selectedBreedingRows: Tracks selected rows for export
  - Reactive updates for UI components

## Integration Points

### API Integration
- RESTful API endpoints for CRUD operations
- Fallback mechanisms for offline operation
- File upload handling

### UI Integration
- Consistent styling across all breeding components
- Shared toolbox pattern for search and filtering
- Common breadcrumb navigation

## Recent Updates

1. **Search Functionality**:
   - Implemented search in BreedingTableToolbox
   - Added event dispatching for parent components

2. **Button Styling**:
   - Updated Add Breeding button to match other components
   - Consistent export button styling

3. **Compact Table Layout**:
   - Reduced cell padding for better information density
   - Optimized spacing and font sizes

4. **Chart Layout Optimization**:
   - Adjusted BreedingChart to 75% width
   - Optimized BreedingTypeChart for 25% width
   - Improved legend positioning and styling
