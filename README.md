# Map Renderer

A React application that renders maps with support for both interactive viewing and static image generation. Built with React, TypeScript, Leaflet, and Tailwind CSS.

## Features

- Interactive map viewing with multiple base layers:
  - Jawg Light (default)
  - Satellite
  - Hybrid
- Static image generation
- Custom marker placement
- URL parameter support for customization

## URL Parameters

The application supports the following URL parameters:

### Position Parameters

- `lat`: Latitude coordinate (e.g., 11.628984)
- `lng`: Longitude coordinate (e.g., 104.876086)

### Render Mode

- `render`: Set to "image" to generate a static image instead of an interactive map

## Usage Examples

### Interactive Map

```
http://localhost:3000?lat=11.628984&lng=104.876086
```

### Static Image

```
http://localhost:3000?lat=11.628984&lng=104.876086&render=image
```

## Development

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

### Building for Production

```bash
npm run build
```

## Dependencies

- React
- TypeScript
- Leaflet
- React-Leaflet
- Tailwind CSS
- html-to-image

## License

MIT
