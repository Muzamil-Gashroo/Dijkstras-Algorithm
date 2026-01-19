import { AlgorithmStep } from '@/types/graph';
import { Info, ArrowRight } from 'lucide-react';

interface InfoPanelProps {
  currentStep: AlgorithmStep | null;
  nodes: { id: string; label: string }[];
}

export function InfoPanel({ currentStep, nodes }: InfoPanelProps) {
  if (!currentStep) {
    return (
      <div className="glass-panel p-5 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4" />
          Algorithm Info
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Select start and end nodes,</p>
          <p className="text-sm">then run the algorithm to begin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 space-y-5 animate-fade-in-up">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4" />
          Current Step
        </h3>
        <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
          <p className="text-sm text-foreground leading-relaxed">
            {currentStep.message}
          </p>
        </div>
      </div>

      {currentStep.currentEdge && (
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="info-badge bg-node-visiting/20 text-node-visiting">
            {currentStep.currentEdge.from}
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <span className="info-badge bg-muted text-muted-foreground">
            {currentStep.currentEdge.to}
          </span>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Distance Table
        </h3>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-3 py-2 text-left font-mono font-medium text-muted-foreground">Node</th>
                <th className="px-3 py-2 text-right font-mono font-medium text-muted-foreground">Dist</th>
                <th className="px-3 py-2 text-center font-mono font-medium text-muted-foreground">Via</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node, index) => {
                const distance = currentStep.distances[node.id];
                const previous = currentStep.previous[node.id];
                const isVisited = currentStep.visitedNodes.includes(node.id);
                const isCurrent = currentStep.currentNode === node.id;
                const isPath = currentStep.pathNodes.includes(node.id);

                return (
                  <tr
                    key={node.id}
                    className={`
                      border-t border-border/30 transition-colors duration-300
                      ${isCurrent ? 'bg-node-visiting/10' : ''}
                      ${isPath ? 'bg-primary/10' : ''}
                      ${isVisited && !isCurrent && !isPath ? 'bg-node-visited/10' : ''}
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-3 py-2">
                      <span className={`
                        font-mono font-bold
                        ${isCurrent ? 'text-node-visiting' : ''}
                        ${isPath ? 'text-primary' : ''}
                        ${isVisited && !isCurrent && !isPath ? 'text-node-visited' : ''}
                        ${!isVisited && !isCurrent && !isPath ? 'text-muted-foreground' : ''}
                      `}>
                        {node.label}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">
                      {distance === Infinity ? '∞' : distance}
                    </td>
                    <td className="px-3 py-2 text-center font-mono text-muted-foreground">
                      {previous || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {currentStep.pathNodes.length > 0 && (
        <div className="space-y-3 animate-slide-in-right">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Shortest Path
          </h3>
          <div className="flex items-center gap-2 flex-wrap p-3 rounded-lg bg-primary/10 border border-primary/30">
            {currentStep.pathNodes.map((nodeId, index) => (
              <span key={nodeId} className="flex items-center gap-2">
                <span className="info-badge bg-primary/20 text-primary font-bold">
                  {nodeId}
                </span>
                {index < currentStep.pathNodes.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-primary/60" />
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
