import { Play, Pause, RotateCcw, SkipForward, SkipBack, Zap } from 'lucide-react';
import { AnimationSpeed } from '@/types/graph';
import { Button } from '@/components/ui/button';

interface ControlPanelProps {
  startNode: string | null;
  endNode: string | null;
  isRunning: boolean;
  isPaused: boolean;
  speed: AnimationSpeed;
  currentStepIndex: number;
  totalSteps: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSpeedChange: (speed: AnimationSpeed) => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

export function ControlPanel({
  startNode,
  endNode,
  isRunning,
  isPaused,
  speed,
  currentStepIndex,
  totalSteps,
  onStart,
  onPause,
  onResume,
  onReset,
  onSpeedChange,
  onStepForward,
  onStepBackward,
}: ControlPanelProps) {
  const canStart = startNode && endNode && !isRunning;
  const speedOptions: AnimationSpeed[] = ['slow', 'normal', 'fast'];

  return (
    <div className="glass-panel p-5 space-y-5">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Selected Nodes
        </h3>
        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-lg bg-secondary/50 border border-border/50">
            <span className="text-xs text-muted-foreground block mb-1">Start</span>
            <span className="font-mono text-lg font-bold text-node-start">
              {startNode || '—'}
            </span>
          </div>
          <div className="flex-1 p-3 rounded-lg bg-secondary/50 border border-border/50">
            <span className="text-xs text-muted-foreground block mb-1">End</span>
            <span className="font-mono text-lg font-bold text-node-end">
              {endNode || '—'}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Click nodes to select start (1st click) and end (2nd click)
        </p>
      </div>

      <div className="h-px bg-border/50" />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Controls
        </h3>
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              onClick={onStart}
              disabled={!canStart}
              className="flex-1 control-button-primary"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Dijkstra
            </Button>
          ) : isPaused ? (
            <Button
              onClick={onResume}
              className="flex-1 control-button-primary"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          ) : (
            <Button
              onClick={onPause}
              variant="secondary"
              className="flex-1"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          <Button
            onClick={onReset}
            variant="secondary"
            className="px-3"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {isRunning && (
          <div className="flex gap-2">
            <Button
              onClick={onStepBackward}
              variant="secondary"
              size="sm"
              className="flex-1"
              disabled={currentStepIndex <= 0}
            >
              <SkipBack className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={onStepForward}
              variant="secondary"
              size="sm"
              className="flex-1"
              disabled={currentStepIndex >= totalSteps - 1}
            >
              Forward
              <SkipForward className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      <div className="h-px bg-border/50" />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Speed
        </h3>
        <div className="flex gap-2">
          {speedOptions.map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                speed === s
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {totalSteps > 0 && (
        <>
          <div className="h-px bg-border/50" />
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{currentStepIndex + 1} / {totalSteps}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
