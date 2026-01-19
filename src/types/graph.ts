export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

export type NodeState = 'unvisited' | 'visiting' | 'visited' | 'path' | 'start' | 'end';
export type EdgeState = 'default' | 'visiting' | 'path';

export interface AlgorithmStep {
  type: 'visit' | 'update' | 'path' | 'complete';
  currentNode: string | null;
  visitedNodes: string[];
  distances: Record<string, number>;
  previous: Record<string, string | null>;
  currentEdge: { from: string; to: string } | null;
  pathNodes: string[];
  pathEdges: { from: string; to: string }[];
  message: string;
}

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export const SPEED_VALUES: Record<AnimationSpeed, number> = {
  slow: 1500,
  normal: 800,
  fast: 300,
};
