// File: components/MapLegend.jsx

function MapLegend() {
    const legendItems = [
      { color: '#081d58', label: 'Very High' },
      { color: '#253494', label: 'High' },
      { color: '#225ea8', label: 'Moderate-High' },
      { color: '#1d91c0', label: 'Moderate' },
      { color: '#41b6c4', label: 'Low-Moderate' },
      { color: '#7fcdbb', label: 'Low' },
      { color: '#c7e9b4', label: 'Very Low' },
      { color: '#ffffcc', label: 'Minimal' },
    ];
  
    return (
      <div className="terminal-panel p-4">
        <div className="flex items-center mb-3">
          <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
          <h3 className="terminal-section-title text-sm font-semibold">TRAFFIC DENSITY</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-gray-300 font-mono">{item.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        <div className="terminal-data-label mt-3 text-center text-xs">
          HOURS PER SQUARE KILOMETER
        </div>
      </div>
    );
  }
  
  export default MapLegend;