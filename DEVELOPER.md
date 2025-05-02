# Developer Documentation - PLI Breeding Management Platform

## Integration Overview

This platform is designed as a modular component within the larger Pro Livestock Intelligence (PLI) ecosystem. It serves as the breeding management module and is built to integrate with other PLI services through standardized APIs and data structures.

## Architecture

### Frontend Architecture
- **Framework**: SvelteKit with Vite
- **UI Components**: Mix of custom components and sveltestrap (Bootstrap 5)
- **State Management**: Svelte stores
- **Data Visualization**: Chart.js and ApexCharts
- **Styling**: SASS with Bootstrap 5

### Key Components

1. **Breeding Dashboard (`/src/routes/(common-layout)/(dashboard)/home-breeding/+page.svelte`)**
   - Main dashboard view
   - Overview cards with key metrics
   - Breeding charts and statistics
   - Recent breeding records table

2. **Data Components**
   - `BreedingChart.svelte`: Timeline visualization
   - `BreedingTypeChart.svelte`: Distribution of breeding types
   - `BreedingTable.svelte`: Comprehensive data grid

### Data Flow

```
User Action → Svelte Component → Store → API Service → Backend
     ↑______________________________________________|
```

## Integration Points

### 1. API Integration
The platform is designed to work with RESTful APIs. Key integration points include:

```javascript
// Example API endpoint structure
/api/v1/breeding/records      // CRUD operations for breeding records
/api/v1/breeding/statistics   // Aggregated breeding data
/api/v1/groups               // Group management
/api/v1/scanning             // Scanning records
```

### 2. Data Models

```typescript
// Core data structures
interface BreedingRecord {
  id: string;
  groupId: string;
  dateStart: string;
  dateEnd: string;
  ewes: number;
  rams: number;
  notes: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface Group {
  id: string;
  name: string;
  season: string;
  color: string;
  status: {
    breeding: boolean;
    scanning: boolean;
    lambing: boolean;
    weaning: boolean;
  };
}
```

### 3. Event System
The platform uses a custom event system for real-time updates:

```javascript
// Example event subscription
breedingStore.subscribe(value => {
  // Handle breeding data updates
});
```

## Extending the Platform

### 1. Adding New Features
1. Create new components in appropriate directories
2. Update routing in `src/routes`
3. Add new stores if needed
4. Integrate with existing navigation

### 2. Custom Integrations
- Use the `src/lib/services` directory for new API integrations
- Follow existing patterns for error handling and data transformation
- Add new stores for state management

### 3. Styling Guidelines
- Use SASS variables from `src/styles`
- Follow Bootstrap 5 grid system
- Maintain responsive design principles

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## Common Integration Scenarios

1. **Adding a New Data Source**
   ```javascript
   // src/lib/services/newService.js
   export class NewService {
     async fetchData() {
       // Implementation
     }
   }
   ```

2. **Creating a New View**
   ```svelte
   <!-- src/routes/new-feature/+page.svelte -->
   <script>
     import { onMount } from 'svelte';
     import { dataStore } from '@stores/dataStore';
     
     onMount(() => {
       // Initialize data
     });
   </script>
   ```

## Deployment

The platform supports various deployment options:

1. **Static Hosting**
   ```bash
   npm run build
   # Output in /build
   ```

2. **Docker**
   ```bash
   docker build -t pli-breeding .
   docker run -p 3000:3000 pli-breeding
   ```

## Troubleshooting

Common issues and solutions:

1. **API Connection Issues**
   - Check API endpoint configuration in `.env`
   - Verify network connectivity
   - Check API service status

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for version conflicts
   - Verify import paths

## Support

For technical support:
- Create an issue in the repository
- Contact the development team
- Check the wiki for common solutions
