import { Network, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="glass-panel px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Network className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Dijkstra's Algorithm
          </h1>
          <p className="text-xs text-muted-foreground">
            Developed by <a href="https://www.linkedin.com/in/muzamil-bashir-gashroo-8268b4228/" target="_blank" rel="noopener noreferrer"><b>Muzamil Gashoo</b></a>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Learn more →
        </a>
      </div>
    </header>
  );
}
