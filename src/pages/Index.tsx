import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { GraphCanvas } from '@/components/GraphCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import { InfoPanel } from '@/components/InfoPanel';
import { Legend } from '@/components/Legend';
import { useDijkstra } from '@/hooks/useDijkstra';
import { sampleNodes, sampleEdges } from '@/data/sampleGraph';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  const [startNode, setStartNode] = useState<string | null>(null);
  const [endNode, setEndNode] = useState<string | null>(null);

  const {
    currentStep,
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
    totalSteps,
  } = useDijkstra({ nodes: sampleNodes, edges: sampleEdges });

  useEffect(() => {
    if (isRunning && !isPaused && currentStepIndex === 0) {
      playAnimation();
    }
  }, [isRunning, isPaused, currentStepIndex, playAnimation]);

  const handleNodeClick = (nodeId: string) => {
    if (isRunning) return;

    if (!startNode) {
      setStartNode(nodeId);
      toast.success(`Start node set to ${nodeId}`);
    } else if (!endNode && nodeId !== startNode) {
      setEndNode(nodeId);
      toast.success(`End node set to ${nodeId}`);
    } else {
      setStartNode(nodeId);
      setEndNode(null);
      toast.info(`Start node changed to ${nodeId}`);
    }
  };

  const handleStart = () => {
    if (startNode && endNode) {
      startAlgorithm(startNode, endNode);
      toast.info('Algorithm started!');
    }
  };

  const handleReset = () => {
    reset();
    setStartNode(null);
    setEndNode(null);
    toast.info('Graph reset');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto space-y-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <div className="lg:col-span-3 space-y-4">
            <ControlPanel
              startNode={startNode}
              endNode={endNode}
              isRunning={isRunning}
              isPaused={isPaused}
              speed={speed}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              onStart={handleStart}
              onPause={pause}
              onResume={resume}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel p-4 aspect-[16/10] flex items-center justify-center">
              <GraphCanvas
                nodes={sampleNodes}
                edges={sampleEdges}
                startNode={startNode}
                endNode={endNode}
                currentStep={currentStep}
                onNodeClick={handleNodeClick}
              />
            </div>
            <Legend />
          </div>

          <div className="lg:col-span-3">
            <InfoPanel
              currentStep={currentStep}
              nodes={sampleNodes}
            />
          </div>
        </div>

        <footer className="text-center py-4 text-xs text-muted-foreground">
          <p>Designed and implemented by <a href="https://www.linkedin.com/in/muzamil-bashir-gashroo-8268b4228/" target="_blank" rel="noopener noreferrer"><b>Muzamil Gashoo</b></a> in Typescript</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
