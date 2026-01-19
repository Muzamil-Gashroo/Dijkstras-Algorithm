import { useMemo } from 'react';
import { GraphNode, GraphEdge, NodeState, EdgeState, AlgorithmStep } from '@/types/graph';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNode: string | null;
  endNode: string | null;
  currentStep: AlgorithmStep | null;
  onNodeClick: (nodeId: string) => void;
}

export function GraphCanvas({
  nodes,
  edges,
  startNode,
  endNode,
  currentStep,
  onNodeClick,
}: GraphCanvasProps) {
  const nodeStates = useMemo((): Record<string, NodeState> => {
    const states: Record<string, NodeState> = {};
    
    nodes.forEach(node => {
      if (currentStep?.pathNodes.includes(node.id)) {
        states[node.id] = 'path';
      } else if (node.id === startNode) {
        states[node.id] = 'start';
      } else if (node.id === endNode) {
        states[node.id] = 'end';
      } else if (currentStep?.currentNode === node.id) {
        states[node.id] = 'visiting';
      } else if (currentStep?.visitedNodes.includes(node.id)) {
        states[node.id] = 'visited';
      } else {
        states[node.id] = 'unvisited';
      }
    });
    
    return states;
  }, [nodes, startNode, endNode, currentStep]);

  const edgeStates = useMemo((): Record<string, EdgeState> => {
    const states: Record<string, EdgeState> = {};
    
    edges.forEach(edge => {
      const key = `${edge.from}-${edge.to}`;
      const reverseKey = `${edge.to}-${edge.from}`;
      
      const isPathEdge = currentStep?.pathEdges.some(
        pe => (pe.from === edge.from && pe.to === edge.to) ||
              (pe.from === edge.to && pe.to === edge.from)
      );
      
      const isCurrentEdge = currentStep?.currentEdge && (
        (currentStep.currentEdge.from === edge.from && currentStep.currentEdge.to === edge.to) ||
        (currentStep.currentEdge.from === edge.to && currentStep.currentEdge.to === edge.from)
      );
      
      if (isPathEdge) {
        states[key] = 'path';
        states[reverseKey] = 'path';
      } else if (isCurrentEdge) {
        states[key] = 'visiting';
        states[reverseKey] = 'visiting';
      } else {
        states[key] = 'default';
        states[reverseKey] = 'default';
      }
    });
    
    return states;
  }, [edges, currentStep]);

  const getNodeClass = (state: NodeState): string => {
    const baseClass = 'graph-node cursor-pointer';
    switch (state) {
      case 'start': return `${baseClass} graph-node-start`;
      case 'end': return `${baseClass} graph-node-end`;
      case 'visiting': return `${baseClass} graph-node-visiting`;
      case 'visited': return `${baseClass} graph-node-visited`;
      case 'path': return `${baseClass} graph-node-path`;
      default: return `${baseClass} graph-node-unvisited`;
    }
  };

  const getEdgeClass = (state: EdgeState): string => {
    const baseClass = 'graph-edge';
    switch (state) {
      case 'visiting': return `${baseClass} graph-edge-visiting`;
      case 'path': return `${baseClass} graph-edge-path`;
      default: return baseClass;
    }
  };

  const getEdgeStrokeWidth = (state: EdgeState): number => {
    switch (state) {
      case 'path': return 4;
      case 'visiting': return 3;
      default: return 2;
    }
  };

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 700 400"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        if (!fromNode || !toNode) return null;

        const key = `${edge.from}-${edge.to}`;
        const state = edgeStates[key] || 'default';
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;

        return (
          <g key={key}>
            <line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className={getEdgeClass(state)}
              strokeWidth={getEdgeStrokeWidth(state)}
              strokeLinecap="round"
            />
            <rect
              x={midX - 14}
              y={midY - 10}
              width="28"
              height="20"
              rx="4"
              className="fill-card stroke-border"
              strokeWidth="1"
            />
            <text
              x={midX}
              y={midY + 5}
              textAnchor="middle"
              className="fill-foreground text-xs font-mono font-medium"
            >
              {edge.weight}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map(node => {
        const state = nodeStates[node.id];
        return (
          <g
            key={node.id}
            onClick={() => onNodeClick(node.id)}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={28}
              className={getNodeClass(state)}
              strokeWidth="2"
              stroke="hsl(var(--border))"
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              className="fill-foreground text-lg font-mono font-bold pointer-events-none select-none"
            >
              {node.label}
            </text>
            {currentStep?.distances[node.id] !== undefined && (
              <text
                x={node.x}
                y={node.y - 40}
                textAnchor="middle"
                className="fill-muted-foreground text-xs font-mono"
              >
                d={currentStep.distances[node.id] === Infinity ? '∞' : currentStep.distances[node.id]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
