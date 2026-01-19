import { GraphNode, GraphEdge } from '@/types/graph';

export const sampleNodes: GraphNode[] = [
  { id: 'A', x: 100, y: 200, label: 'A' },
  { id: 'B', x: 250, y: 80, label: 'B' },
  { id: 'C', x: 250, y: 320, label: 'C' },
  { id: 'D', x: 420, y: 140, label: 'D' },
  { id: 'E', x: 420, y: 260, label: 'E' },
  { id: 'F', x: 580, y: 200, label: 'F' },
];

export const sampleEdges: GraphEdge[] = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'D', weight: 5 },
  { from: 'B', to: 'C', weight: 1 },
  { from: 'C', to: 'E', weight: 3 },
  { from: 'D', to: 'E', weight: 1 },
  { from: 'D', to: 'F', weight: 2 },
  { from: 'E', to: 'F', weight: 4 },
];
