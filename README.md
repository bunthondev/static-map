# Map Renderer

A React application that renders maps with support for both interactive viewing and static image generation. Built with React, TypeScript, Leaflet, and Tailwind CSS.

## Demo

You can try the live demo at:
[https://static-map.devkh.com](https://static-map.devkh.com)

### Example URLs

Interactive Map:

```
https://static-map.devkh.com/?lat=11.628984&lng=104.876086
```

Static Image:

```
https://static-map.devkh.com/?lat=11.628984&lng=104.876086&render=image
```

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
