# Groups Module Documentation

## Overview

The Groups module provides a comprehensive system for tracking breeding groups and lambing seasons throughout their entire lifecycle. It allows users to monitor the status of key events (Breeding, Scanning, Lambing, Weaning) for each group and provides filtering capabilities for efficient data management.

## Page Structure

The Groups page follows the standard dashboard layout pattern:

1. **Container Layout**:
   - Uses `Container fluid` for full-width layout
   - Organized in responsive `Row` and `Col` components from sveltestrap
   - Consistent margin-bottom (`mb-25`) for spacing between components

2. **Component Hierarchy**:
   ```
   +page.svelte
   ├── BreadcrumbOne
   ├── Card
   │   ├── TableToolboxgroups
   │   └── GroupsTable
   └── PaginationBasic
   ```

## Key Components

### 1. TableToolboxgroups

The TableToolboxgroups component follows the consistent structure of all table toolbox components in the application:

- **Layout Structure**:
  - Top-level div with class "table-top-toolbox-wrap" using d-flex, justify-content-between
  - Left side contains search and filters in "toolbox-search global-shadow"
  - Right side contains action buttons in "content-center mt-10"

- **Search Section**:
  - Search icon with input field
  - No button styling for the search input
  - Border-0 and box-shadow-none classes for clean appearance

- **Filter Navigation**:
  - Horizontal list with "nav px-1 data-filter-box" classes
  - Filter options: This Year, 5 Years, All
  - Filter label with colon (e.g., "Time Period :")
  - Click handlers that use preventDefault and dispatch custom events

- **Button Group**:
  - Export button with appropriate styling classes
  - Add Group button with primary styling

### 2. Add Groups Modal

The Add Groups modal provides a standardized interface for creating new groups across the application:

#### Modal Structure
- Medium-sized modal with header, body, and footer
- Clean, focused design with only essential fields
- Required fields marked with red asterisks (*) 
- Save and Cancel buttons in the footer

#### Form Fields
1. **Lambing Season Name** (required):
   - Text input field for entering the lambing season name
   - Placeholder text: "Enter lambing season name"

2. **Tag Color** (required):
   - Dropdown selection with 11 color options
   - Each option displays a color dot next to the text
   - Color options include: White (1), Purple (2), Light Blue (3), Blue (4), Green (5), Lime (6), Yellow (7), Orange (8), Beige (9), Pink (10), Red (11)
   - Visual indicators help users identify colors easily

#### Implementation Details
- The modal can be accessed from multiple locations:
  - Groups page via the "Add Group" button
  - Add Breeding Record form via the "Add Groups" button
- Form validation ensures both fields are filled before saving
- New groups are immediately available in dropdown selectors
- The modal resets form fields when closed

#### Code Example
```javascript
// Tag color options
const tagColorOptions = [
    { value: 'White (1)', color: '#ffffff' },
    { value: 'Purple (2)', color: '#800080' },
    { value: 'Light Blue (3)', color: '#add8e6' },
    { value: 'Blue (4)', color: '#0000ff' },
    { value: 'Green (5)', color: '#008000' },
    { value: 'Lime (6)', color: '#00ff00' },
    { value: 'Yellow (7)', color: '#ffff00' },
    { value: 'Orange (8)', color: '#ffa500' },
    { value: 'Beige (9)', color: '#f5f5dc' },
    { value: 'Pink (10)', color: '#ffc0cb' },
    { value: 'Red (11)', color: '#ff0000' }
];
```

### 3. GroupsTable

The GroupsTable component displays all group records with their status information:

- **Table Structure**:
  - Responsive table with checkbox selection
  - Columns: Name, Mating Type, Mating Start/End, Scanning Date, Lambing Start/End, Weaning Date, Status, Action
  - Status column shows event status badges

- **Status Badges**:
  - Four horizontal badges representing each event stage:
    - **B**: Breeding status
    - **S**: Scanning status
    - **L**: Lambing status
    - **W**: Weaning status
  - Color-coded for quick visual identification:
    - Green badge: Event has been recorded
    - Yellow badge: Event is pending

- **Status Logic**:
  - The `getEventStatus` function determines the status of each event based on dates
  - An event is marked as "Recorded" if its end date is in the past
  - Otherwise, it's marked as "Pending"

- **Filtering Capabilities**:
  - Time-based filtering: This Year, 5 Years, All
  - Search functionality across multiple fields (name, code, mating type, status)

## Data Source

The Groups module uses data from `src/demo-data/groups.json`, which contains:

```json
{
  "id": 1,
  "code": "GRP-2025-001",
  "name": "Spring 2025 A",
  "matingType": "Natural Mating",
  "matingStart": "2025-03-01",
  "matingEnd": "2025-04-15",
  "scanningDate": "2025-05-15",
  "lambingStart": "2025-07-29",
  "lambingEnd": "2025-09-12",
  "weaningDate": "2025-10-30",
  "productionYear": 2025
}
```

## Implementation Details

### Event Status Calculation

```javascript
function getEventStatus(group) {
  const today = new Date();
  
  // Check breeding status
  const breedingStatus = group.matingStart && group.matingEnd ? 
    (new Date(group.matingEnd) < today ? 'Recorded' : 'Pending') : 'Pending';
  
  // Check scanning status
  const scanningStatus = group.scanningDate ? 
    (new Date(group.scanningDate) < today ? 'Recorded' : 'Pending') : 'Pending';
  
  // Check lambing status
  const lambingStatus = group.lambingStart && group.lambingEnd ? 
    (new Date(group.lambingEnd) < today ? 'Recorded' : 'Pending') : 'Pending';
  
  // Check weaning status
  const weaningStatus = group.weaningDate ? 
    (new Date(group.weaningDate) < today ? 'Recorded' : 'Pending') : 'Pending';
  
  return {
    breeding: breedingStatus,
    scanning: scanningStatus,
    lambing: lambingStatus,
    weaning: weaningStatus
  };
}
```

### Status Badge Implementation

```svelte
<div class="status-badges-container">
  <Badge pill 
    color={getEventStatus(data).breeding === 'Recorded' ? 'success' : 'warning'} 
    class="bg-{getEventStatus(data).breeding === 'Recorded' ? 'success' : 'warning'} status-badge">
    B
  </Badge>
  <Badge pill 
    color={getEventStatus(data).scanning === 'Recorded' ? 'success' : 'warning'} 
    class="bg-{getEventStatus(data).scanning === 'Recorded' ? 'success' : 'warning'} status-badge">
    S
  </Badge>
  <Badge pill 
    color={getEventStatus(data).lambing === 'Recorded' ? 'success' : 'warning'} 
    class="bg-{getEventStatus(data).lambing === 'Recorded' ? 'success' : 'warning'} status-badge">
    L
  </Badge>
  <Badge pill 
    color={getEventStatus(data).weaning === 'Recorded' ? 'success' : 'warning'} 
    class="bg-{getEventStatus(data).weaning === 'Recorded' ? 'success' : 'warning'} status-badge">
    W
  </Badge>
</div>
```

### Badge Styling

```css
.status-badges-container {
  display: flex;
  gap: 0.25rem;
}

:global(.status-badge) {
  font-size: 0.7rem;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Usage Guidelines

1. **Viewing Group Status**:
   - The status badges provide a quick visual indication of each group's progress
   - Green badges indicate completed events, yellow badges indicate pending events

2. **Filtering Groups**:
   - Use the time period filters to view groups from specific time periods
   - Use the search functionality to find specific groups by name, code, or other attributes

3. **Managing Groups**:
   - Use the "Add Group" button to create new groups
   - Use the action buttons (view, edit, delete) to manage existing groups

## Future Enhancements

Potential future enhancements for the Groups module include:

1. **Export Functionality**: Implement CSV export for group data
2. **Detailed Group View**: Add a detailed view page for each group
3. **Group Progress Visualization**: Add a visual progress indicator for each group
4. **Event Notifications**: Add notifications for upcoming events
