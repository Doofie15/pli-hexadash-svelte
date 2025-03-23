# Hexadash Svelte Dashboard

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Project Overview

Hexadash is a comprehensive dashboard application built with Svelte and SvelteKit. It includes various modules for managing different aspects of the business, including a specialized breeding management section.

### Key Features

- **Dashboard Overview**: Visual representation of key metrics
- **Breeding Management**: Complete system for tracking breeding records
- **Groups Management**: Track and manage breeding groups and lambing seasons
- **Order Management**: Track and manage customer orders
- **User Management**: Manage user accounts and permissions

## Breeding Module

The breeding module provides a complete solution for managing breeding records. It includes:

- **Breeding Dashboard**: Overview of breeding statistics
- **All Breeding Records**: Comprehensive list of all breeding records with filtering options
- **Add Breeding**: Form for adding new breeding records

The All Breeding page serves as a template for other data display pages in the application. See the [Breeding Page Template Documentation](./docs/BREEDING_PAGE_TEMPLATE.md) for more details.

### Data Source

The breeding components use data from the `src/demo-data/breeding-records.json` file, which contains detailed breeding records including:
- Group information
- Mating types and dates
- Ewe and ram counts
- Lambing dates and statistics

## Groups Module

The Groups module allows tracking of breeding groups and lambing seasons through their entire lifecycle:

- **Groups Dashboard**: Overview of all breeding groups
- **Status Tracking**: Visual indicators for Breeding, Scanning, Lambing, and Weaning events
- **Filtering Options**: Filter groups by time period or search by name/attributes

### Status Badges

The Groups table includes status badges that provide at-a-glance information about each group's progress:
- **B**: Breeding status (green for Recorded, yellow for Pending)
- **S**: Scanning status (green for Recorded, yellow for Pending)
- **L**: Lambing status (green for Recorded, yellow for Pending)
- **W**: Weaning status (green for Recorded, yellow for Pending)

### Data Source

The groups components use data from the `src/demo-data/groups.json` file, which contains:
- Group names and codes
- Mating start and end dates
- Scanning dates
- Lambing start and end dates
- Weaning dates

### Recent Updates

- **Data Source Standardization**: All breeding components now use the standardized data source from breeding-records.json
- **Time-Based Filtering**: Implemented filtering options for viewing records from the current year, last 5 years, or all time
- **Improved Data Visualization**: Enhanced charts and tables for better data representation
- **Groups Status Badges**: Added compact horizontal status badges to track breeding lifecycle events
- **Table Toolbox Consistency**: Standardized table toolbox components across all data tables

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

## Project Structure

- `src/`: Source code
  - `lib/`: Library components
    - `components/`: Reusable UI components
    - `view/`: Page-specific components
  - `routes/`: SvelteKit routes
  - `assets/`: Static assets
  - `demo-data/`: Sample data for development
- `docs/`: Documentation files
  - `BREEDING_PAGE_TEMPLATE.md`: Documentation for the breeding page template
