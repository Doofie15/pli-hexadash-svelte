# Hexadash Svelte Dashboard Documentation

This documentation provides comprehensive information about the Hexadash Svelte Dashboard application.

## Module Documentation

- [Breeding Page Template](../hexadash/docs/BREEDING_PAGE_TEMPLATE.md) - Documentation for the breeding page structure and components
- [Groups Module](../hexadash/docs/GROUPS_MODULE.md) - Documentation for the Groups module with status tracking badges

## Development Guidelines

### Component Structure

All table toolbox components in the application follow a consistent structure matching the BreedingTableToolbox pattern:

1. **Layout Structure**:
   - Top-level div with class "table-top-toolbox-wrap" using d-flex, justify-content-between
   - Left side contains search and filters in "toolbox-search global-shadow"
   - Right side contains action buttons in "content-center mt-10"

2. **Search Section**:
   - Search icon with input field
   - No button styling for the search input
   - Border-0 and box-shadow-none classes for clean appearance

3. **Filter Navigation**:
   - Horizontal list with "nav px-1 data-filter-box" classes
   - Filter options as anchor tags with active class for selected item
   - Filter label with colon (e.g., "Time Period :")
   - Click handlers that use preventDefault and dispatch custom events

4. **Button Group**:
   - Export button with "order-bg-opacity-secondary radius-md btn btn-sm color-secondary" classes
   - Add button with "btn-primary radius-md btn btn-sm" classes
   - Icon for add button using "la la-plus" class
   - Consistent spacing with "m-0 mt-xl-0 mt-sm-10" classes

### Page Structure

Overview pages follow a standard structure:

1. **Container Layout**:
   - Uses `Container fluid` for full-width layout
   - Organized in responsive `Row` and `Col` components from sveltestrap
   - Consistent margin-bottom (`mb-25`) for spacing between components

2. **Component Hierarchy**:
   ```
   +page.svelte
   ├── BreadcrumbThree/BreadcrumbOne
   ├── OverviewCards (if applicable)
   ├── Charts (if applicable)
   └── DataTable (full width)
   ```

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
