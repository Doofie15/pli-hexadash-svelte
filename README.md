# Pro Livestock Basic (Concept)

A comprehensive livestock management solution built with Svelte and SvelteKit, focusing on breeding, scanning, and group management for professional livestock operations.

> **Note**: This platform is part of a larger ecosystem of livestock management tools, designed to integrate seamlessly with other PLI services.

## Project Overview

The PLI Breeding Management Platform is a sophisticated web application designed to streamline and modernize livestock breeding operations. Built on the robust Hexadash framework, it provides powerful tools for tracking, analyzing, and optimizing breeding programs.

## Features

- **Breeding Management**
  - Overview dashboard with key metrics
  - Detailed breeding records table
  - Breeding type distribution charts
  - Add/Edit breeding records
  - Group management

- **Data Visualization**
  - Interactive charts using Chart.js
  - Time-based filtering
  - Responsive design
  - Real-time updates

## Tech Stack

- SvelteKit
- Vite
- Bootstrap 5 (via sveltestrap)
- Chart.js
- SASS
- ApexCharts

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pli-hexadash-svelte.git
   cd pli-hexadash-svelte
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   └── breeding/
│   ├── services/
│   └── stores/
├── routes/
│   └── (common-layout)/
│       └── (dashboard)/
└── static/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
