"use client";

function DataTrendIndicator({ year }) {
  // This component shows a trend indicator based on the selected year
  // Just for visual flare and to help users understand the year selection
  
  // Simulated trend data
  const yearTrends = {
    2021: { traffic: 'low', change: -5 },
    2022: { traffic: 'low-med', change: 8 },
    2023: { traffic: 'medium', change: 12 },
    2024: { traffic: 'high', change: 15 },
    2025: { traffic: 'very-high', change: 7 },
  };
  
  const trend = yearTrends[year] || yearTrends[2025];
  
  // Get arrow and color based on change
  const getArrow = (change) => {
    if (change > 10) return '▲▲';
    if (change > 0) return '▲';
    if (change < -10) return '▼▼';
    if (change < 0) return '▼';
    return '►';
  };
  
  const getColor = (change) => {
    if (change > 10) return 'text-terminal-green';
    if (change > 0) return 'text-green-400';
    if (change < -10) return 'text-terminal-red';
    if (change < 0) return 'text-red-400';
    return 'text-terminal-yellow';
  };
  
  const getTrafficLevel = (level) => {
    const levels = {
      'low': 'LOW',
      'low-med': 'LOW-MEDIUM',
      'medium': 'MEDIUM',
      'high': 'HIGH',
      'very-high': 'VERY HIGH'
    };
    return levels[level] || 'MEDIUM';
  };
  
  return (
    <div className="terminal-panel p-4">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
        <h3 className="terminal-section-title text-sm font-semibold">YEAR TREND ANALYSIS</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="terminal-data-label">YEAR:</span>
          <span className="terminal-data-value text-sm">{year}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="terminal-data-label">TRAFFIC LEVEL:</span>
          <span className="terminal-data-value text-sm">{getTrafficLevel(trend.traffic)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="terminal-data-label">YOY CHANGE:</span>
          <span className={`${getColor(trend.change)} text-sm font-mono`}>
            {trend.change > 0 ? '+' : ''}{trend.change}% {getArrow(trend.change)}
          </span>
        </div>
        
        <div className="mt-2 text-xs text-gray-400 italic">
          Use the YEAR selector to compare traffic patterns between 2021-2025
        </div>
      </div>
    </div>
  );
}

export default DataTrendIndicator;