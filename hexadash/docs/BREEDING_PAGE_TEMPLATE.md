# Breeding Page Template

This document outlines the structure and components of the Breeding Pages, which serve as the template for all data display pages in the application.

## Overview

The Breeding Pages follow a consistent layout pattern that should be used as a reference for all other data display pages in the application. This ensures a uniform user experience across the dashboard.

## Data Source

The breeding components use data from `src/demo-data/breeding-records.json`, which contains detailed breeding records with the following structure:

```json
{
  "records": [
    {
      "id": 1,
      "groupName": "Spring 2025 A",
      "matingType": "Natural Mating",
      "ewes": 25,
      "rams": 2,
      "ramEweRatio": 8,
      "startDate": "2025-03-01",
      "endDate": "2025-04-15",
      "days": 45,
      "lambingStartDate": "2025-07-29",
      "lambingEndDate": "2025-09-12",
      "averageMatingWeight": 65.3,
      "productionYear": 2025
      // Additional fields...
    }
    // More records...
  ]
}
```

### Data Filtering

The breeding table implements time-based filtering with three options:
- **This Year**: Shows only records from the current year
- **5 Years**: Shows records from the last five years
- **All**: Shows all available records

The filtering is implemented in `BreedingTable.svelte` by creating filtered datasets based on the production year derived from the lambing start date.

## Page Structure

### 1. Main Components

- **Page Container**: Uses `Container fluid` for full-width layout
- **Breadcrumb**: Displays the current page location in the navigation hierarchy

### 2. Add Breeding Record Form

The Add Breeding Record form includes several key components:

#### Group Selection
- **Searchable Group Dropdown**:
  - Allows filtering of groups by name or code as the user types
  - Displays both group code and name for easy identification
  - Dropdown appears when the field is focused and disappears when clicking outside
  - Validation ensures a group is selected before form submission

- **Add Groups Button**:
  - Positioned next to the group dropdown
  - Opens the standardized Add Groups modal (see Groups Module Documentation)
  - Allows creation of new groups without leaving the breeding record form
  - Newly created groups immediately appear in the dropdown for selection

#### Date Selection
- **DatePicker Component**:
  - Uses `@beyonk/svelte-datepicker` for date selection
  - Immediate date selection without confirmation step
  - Validation ensures both mating start and end dates are selected
  - Automatically calculates mating days difference when both dates are selected

#### Form Validation
- Conditional validation that only shows messages after form submission attempt
- Required fields marked visually
- Validation logic prevents submission of incomplete forms

```javascript
// Example of searchable group dropdown implementation
let selectedGroup = null;
let groupSearchTerm = '';
let filteredGroups = [...groupOptions];
let showDropdown = false;

// Filter groups based on search input
function filterGroups() {
    if (!groupSearchTerm) {
        filteredGroups = [...groupOptions];
    } else {
        filteredGroups = groupOptions.filter(group => 
            group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
            group.code.toLowerCase().includes(groupSearchTerm.toLowerCase())
        );
    }
}
```

### 2. Component Hierarchy

```
+page.svelte
├── BreadcrumbOne
├── TableToolbox (or custom toolbox)
├── DataTable
└── PaginationBasic
```

## Implementation Guidelines

### Creating a New Data Page

1. **Page Structure**: Use the All Breeding page as a template:
   - Import necessary components
   - Set up breadcrumb data
   - Use consistent container and row structure
   - Add custom toolbox, table, and pagination components

2. **Styling**:
   - Use the `orderDatatable` class for consistent table styling
   - Apply `bg-white shadow-regular` for the card effect
   - Include proper padding and margins with `py-30 px-sm-30 px-20`
   - Use `radius-xl` for rounded corners

3. **Toolbox Component**:
   - Create a custom toolbox component for each data type if specific filters are needed
   - Follow the naming convention: `[DataType]TableToolbox.svelte`
   - Implement filter options relevant to the data type

4. **Table Component**:
   - Create a custom table component for each data type
   - Follow the naming convention: `[DataType]Table.svelte`
   - Implement appropriate columns and data display logic

5. **Badge Styling**:
   - Use the `badge-transparent` class for semi-transparent badges
   - Apply appropriate color classes based on data status or type

## Example Implementation

### Page Component (+page.svelte)

```svelte
<script>
  import BreadcrumbOne from '$lib/components/breadcrumbs/BreadcrumbOne.svelte';
  import PaginationBasic from '$lib/components/pagination/PaginationBasic.svelte';
  import { Container, Row, Col } from 'sveltestrap';
  import CustomTable from '$lib/view/custom/CustomTable.svelte';
  import CustomTableToolbox from '$lib/components/toolbox/CustomTableToolbox.svelte';

  const breadcrumbData = {
    pageTitle: 'All [Data Type]',
    bcItem: '[Section]',
    bcItemActive: 'All [Data Type]'
  };
</script>

<Container fluid>
  <Row>
    <Col lg={12}>
      <BreadcrumbOne {...breadcrumbData} />
    </Col>
  </Row>
</Container>

<Container fluid>
  <div class="orderPage mb-30">
    <Row>
      <Col lg={12}>
        <div class="orderDatatable py-30 px-sm-30 px-20 radius-xl w-100 mb-30 border-0 bg-white shadow-regular">
          <CustomTableToolbox buttonText="[Action]" />
          <CustomTable />
          <PaginationBasic pageDropdown={true} />
        </div>
      </Col>
    </Row>
  </div>
</Container>

<style lang="scss">
  :global {
    @import '../../../../../assets/sass/mixins/functions';
    @import '../../../../../assets/sass/mixins/rfs';
    @import '../../../../../assets/sass/mixins/media-queries';
    @import '../../../../../assets/sass/components/table';
    @import '../../../../../assets/sass/components/cart';
  }
</style>
```

### Custom Toolbox Component

```svelte
<script>
  export let buttonText = 'Add New';
  let matingType = 'All';
</script>

<div class="d-flex justify-content-between align-items-center flex-wrap mb-20">
  <div class="d-flex align-items-center flex-wrap mb-lg-0 mb-20">
    <div class="table-toolbox-menu">
      <div class="d-flex align-items-center flex-wrap">
        <div class="table-toolbox__menu mb-lg-0 mb-20">
          <div class="table-toolbox__menu--search">
            <div class="d-flex align-items-center">
              <span class="search-icon">
                <span class="la la-search" />
              </span>
              <input class="form-control border-0 shadow-none" type="search" placeholder="Filter by keyword" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-between align-items-center">
    <div class="dropdown-filter d-flex align-items-center flex-wrap justify-content-center me-sm-20 me-0 mb-xl-0 mb-20">
      <div class="data-filter-box d-flex align-items-center flex-wrap">
        <span class="me-sm-10 me-0">Filter By:</span>
        <div class="dm-select">
          <select class="form-select" bind:value={matingType}>
            <option value="All">All</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
    <div class="action-btn">
      <a href="#" class="btn btn-primary">
        <i class="la la-plus" />
        {buttonText}
      </a>
    </div>
  </div>
</div>
```

### Custom Table Component

```svelte
<script>
  import { onMount } from 'svelte';
  import { Table, Badge } from 'sveltestrap';
  import customData from '@demo-data/custom-data.json';

  $: checked = false;
  function toggleCheck() {
    checked ? (checked = false) : (checked = true);
  }

  let filterType = 'All';
  $: filterType;
  
  function getStatusColor(type) {
    if (type === 'Type 1') return 'success';
    if (type === 'Type 2') return 'warning';
    if (type === 'Type 3') return 'info';
    return 'danger';
  }
  
  onMount(() => {
    let sortLinks = document.querySelectorAll('.data-filter-box a');
    sortLinks.forEach((item) => {
      item.addEventListener('click', function () {
        filterType = this.textContent.trim();
      });
    });
  });
</script>

<div class="table-responsive">
  <Table class="table mb-0 table-borderless">
    <thead>
      <tr class="userDatatable-header">
        <th>
          <div class="d-flex align-items-center">
            <div class="custom-checkbox me-3">
              <input
                type="checkbox"
                class="checkbox-all"
                id="check-3"
                on:change={toggleCheck}
                checked={checked}
              />
              <label for="check-3" />
            </div>
            <span class="userDatatable-title">ID</span>
          </div>
        </th>
        <th>
          <span class="userDatatable-title">Type</span>
        </th>
        <th>
          <span class="userDatatable-title">Field 1</span>
        </th>
        <th>
          <span class="userDatatable-title">Field 2</span>
        </th>
        <th>
          <span class="userDatatable-title">Date 1</span>
        </th>
        <th>
          <span class="userDatatable-title">Date 2</span>
        </th>
        <th>
          <span class="userDatatable-title float-end">Actions</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each customData.records.filter((record) => filterType === 'All' || record.type === filterType) as record, i}
        <tr>
          <td>
            <div class="d-flex">
              <div class="userDatatable__imgWrapper d-flex align-items-center me-3">
                <div class="checkbox-group-wrapper">
                  <div class="checkbox-group d-flex">
                    <div class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex">
                      <input
                        class="checkbox"
                        type="checkbox"
                        id="check-grp-content-{i}"
                        checked={checked}
                      />
                      <label for="check-grp-content-{i}" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="orderDatatable-title">
                <p class="d-block mb-0">{record.id}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="userDatatable-content d-inline-block">
              <Badge
                pill
                color={getStatusColor(record.type)}
                class="badge-transparent badge-{getStatusColor(record.type)}"
              >
                {record.type}
              </Badge>
            </div>
          </td>
          <td>
            <div class="userDatatable-title">{record.field1}</div>
          </td>
          <td>
            <div class="userDatatable-title">{record.field2}</div>
          </td>
          <td>
            <div class="userDatatable-title">{record.date1}</div>
          </td>
          <td>
            <div class="userDatatable-title">{record.date2}</div>
          </td>
          <td>
            <ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
              <li>
                <a href="#" class="view">
                  <i class="uil uil-eye" />
                </a>
              </li>
              <li>
                <a href="#" class="edit">
                  <i class="uil uil-edit" />
                </a>
              </li>
              <li>
                <a href="#" class="remove">
                  <i class="uil uil-trash-alt" />
                </a>
              </li>
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>
</div>
```

## Best Practices

1. **Consistency**: Follow the same structure and styling across all data pages
2. **Reusability**: Create reusable components that can be customized for different data types
3. **Responsive Design**: Ensure all components work well on different screen sizes
4. **Performance**: Optimize data loading and filtering for large datasets
5. **Accessibility**: Use proper semantic HTML and ARIA attributes for accessibility

## Badge Styling

For consistent badge styling across the application, use the following approach:

```svelte
<Badge
  pill
  color={getStatusColor(item.type)}
  class="badge-transparent badge-{getStatusColor(item.type)}"
>
  {item.type}
</Badge>
```

This creates semi-transparent badges with appropriate text colors based on the status or type.
