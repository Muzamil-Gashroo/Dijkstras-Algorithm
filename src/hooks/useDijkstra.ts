import { useState, useCallback, useRef } from 'react';
import { GraphNode, GraphEdge, AlgorithmStep, AnimationSpeed, SPEED_VALUES } from '@/types/graph';

interface UseDijkstraProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function useDijkstra({ nodes, edges }: UseDijkstraProps) {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<AnimationSpeed>('normal');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<AlgorithmStep[]>([]);

  const generateSteps = useCallback((startNode: string, endNode: string): AlgorithmStep[] => {
    const generatedSteps: AlgorithmStep[] = [];
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const visited = new Set<string>();
    
    // Initialize distances
    nodes.forEach(node => {
      distances[node.id] = node.id === startNode ? 0 : Infinity;
      previous[node.id] = null;
    });

    generatedSteps.push({
      type: 'visit',
      currentNode: null,
      visitedNodes: [],
      distances: { ...distances },
      previous: { ...previous },
      currentEdge: null,
      pathNodes: [],
      pathEdges: [],
      message: `Initialized distances. Starting from node ${startNode}.`,
    });

    // Build adjacency list
    const adjacency: Record<string, { neighbor: string; weight: number }[]> = {};
    nodes.forEach(node => adjacency[node.id] = []);
    edges.forEach(edge => {
      adjacency[edge.from].push({ neighbor: edge.to, weight: edge.weight });
      adjacency[edge.to].push({ neighbor: edge.from, weight: edge.weight });
    });

    while (visited.size < nodes.length) {
      // Find unvisited node with minimum distance
      let minDist = Infinity;
      let currentNode: string | null = null;
      
      nodes.forEach(node => {
        if (!visited.has(node.id) && distances[node.id] < minDist) {
          minDist = distances[node.id];
          currentNode = node.id;
        }
      });

      if (currentNode === null || distances[currentNode] === Infinity) break;

      visited.add(currentNode);

      generatedSteps.push({
        type: 'visit',
        currentNode,
        visitedNodes: Array.from(visited),
        distances: { ...distances },
        previous: { ...previous },
        currentEdge: null,
        pathNodes: [],
        pathEdges: [],
        message: `Visiting node ${currentNode} with distance ${distances[currentNode]}.`,
      });

      // Check if we reached the end
      if (currentNode === endNode) {
        // Reconstruct path
        const pathNodes: string[] = [];
        const pathEdges: { from: string; to: string }[] = [];
        let curr: string | null = endNode;
        
        while (curr !== null) {
          pathNodes.unshift(curr);
          if (previous[curr] !== null) {
            pathEdges.unshift({ from: previous[curr]!, to: curr });
          }
          curr = previous[curr];
        }

        generatedSteps.push({
          type: 'complete',
          currentNode: null,
          visitedNodes: Array.from(visited),
          distances: { ...distances },
          previous: { ...previous },
          currentEdge: null,
          pathNodes,
          pathEdges,
          message: `Shortest path found! Distance: ${distances[endNode]}`,
        });

        return generatedSteps;
      }

      // Update neighbors
      for (const { neighbor, weight } of adjacency[currentNode]) {
        if (visited.has(neighbor)) continue;

        const newDist = distances[currentNode] + weight;
        
        generatedSteps.push({
          type: 'update',
          currentNode,
          visitedNodes: Array.from(visited),
          distances: { ...distances },
          previous: { ...previous },
          currentEdge: { from: currentNode, to: neighbor },
          pathNodes: [],
          pathEdges: [],
          message: `Checking edge ${currentNode} → ${neighbor} (weight: ${weight})`,
        });

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;

          generatedSteps.push({
            type: 'update',
            currentNode,
            visitedNodes: Array.from(visited),
            distances: { ...distances },
            previous: { ...previous },
            currentEdge: { from: currentNode, to: neighbor },
            pathNodes: [],
            pathEdges: [],
            message: `Updated distance to ${neighbor}: ${newDist} (via ${currentNode})`,
          });
        }
      }
    }

    // No path found
    generatedSteps.push({
      type: 'complete',
      currentNode: null,
      visitedNodes: Array.from(visited),
      distances: { ...distances },
      previous: { ...previous },
      currentEdge: null,
      pathNodes: [],
      pathEdges: [],
      message: `No path found from ${startNode} to ${endNode}.`,
    });

    return generatedSteps;
  }, [nodes, edges]);

  const startAlgorithm = useCallback((startNode: string, endNode: string) => {
    const generatedSteps = generateSteps(startNode, endNode);
    stepsRef.current = generatedSteps;
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsRunning(true);
    setIsPaused(false);
  }, [generateSteps]);

  const playAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentStepIndex(prev => {
        const next = prev + 1;
        if (next >= stepsRef.current.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsRunning(false);
          return prev;
        }
        return next;
      });
    }, SPEED_VALUES[speed]);
  }, [speed]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    playAnimation();
  }, [playAnimation]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsRunning(false);
    setIsPaused(false);
    stepsRef.current = [];
  }, []);

  const stepForward = useCallback(() => {
    setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  }, []);

  return {
    steps,
    currentStep: currentStepIndex >= 0 ? steps[currentStepIndex] : null,
    currentStepIndex,
    isRunning,
    isPaused,
    speed,
    setSpeed,
    startAlgorithm,
    playAnimation,
    pause,
    resume,
    reset,
    stepForward,
    stepBackward,
    totalSteps: steps.length,
  };
}
