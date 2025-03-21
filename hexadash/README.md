# Hexadash Svelte Dashboard

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Project Overview

Hexadash is a comprehensive dashboard application built with Svelte and SvelteKit. It includes various modules for managing different aspects of the business, including a specialized breeding management section.

### Key Features

- **Dashboard Overview**: Visual representation of key metrics
- **Breeding Management**: Complete system for tracking breeding records
- **Order Management**: Track and manage customer orders
- **User Management**: Manage user accounts and permissions

## Breeding Module

The breeding module provides a complete solution for managing breeding records. It includes:

- **Breeding Dashboard**: Overview of breeding statistics
- **All Breeding Records**: Comprehensive list of all breeding records with filtering options
- **Add Breeding**: Form for adding new breeding records

The All Breeding page serves as a template for other data display pages in the application. See the [Breeding Page Template Documentation](./docs/BREEDING_PAGE_TEMPLATE.md) for more details.

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
