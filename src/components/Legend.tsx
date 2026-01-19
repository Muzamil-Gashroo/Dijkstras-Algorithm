export function Legend() {
  const items = [
    { label: 'Start Node', colorClass: 'bg-node-start' },
    { label: 'End Node', colorClass: 'bg-node-end' },
    { label: 'Visiting', colorClass: 'bg-node-visiting' },
    { label: 'Visited', colorClass: 'bg-node-visited' },
    { label: 'Shortest Path', colorClass: 'bg-node-path' },
    { label: 'Unvisited', colorClass: 'bg-node-unvisited' },
  ];

  return (
    <div className="glass-panel p-4">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Legend
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.colorClass}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
