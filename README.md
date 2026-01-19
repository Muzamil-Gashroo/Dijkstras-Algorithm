# Path Finder Studio

An interactive web application for visualizing graph algorithms, particularly Dijkstra's shortest path algorithm.

## Features

- **Interactive Graph Visualization**: Create and manipulate nodes and edges in real-time
- **Dijkstra's Algorithm**: Watch the shortest path algorithm find optimal routes step-by-step
- **Custom Graphs**: Build your own graphs or use sample data
- **Visual Feedback**: See the algorithm progress with color-coded nodes and paths
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd path-finder-studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── GraphCanvas.tsx # Main graph visualization
│   ├── ControlPanel.tsx # Algorithm controls
│   ├── InfoPanel.tsx   # Algorithm information
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
│   └── useDijkstra.ts  # Dijkstra algorithm implementation
├── data/               # Sample data
│   └── sampleGraph.ts  # Example graph configurations
├── types/              # TypeScript type definitions
│   └── graph.ts        # Graph-related types
└── pages/              # Route components
    ├── Index.tsx       # Main application page
    └── NotFound.tsx    # 404 page
```

## Usage

1. **Create Nodes**: Click on the canvas to add nodes
2. **Connect Nodes**: Drag from one node to another to create edges
3. **Set Weights**: Click on edges to set their weights
4. **Run Algorithm**: Select start and end nodes, then run Dijkstra's algorithm
5. **Visualize Results**: Watch the algorithm find the shortest path

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).