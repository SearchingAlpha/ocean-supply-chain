"use client";

import { useState, useEffect } from 'react';

function RouteVolumeChart({ route, shipType, year }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!route) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate loading data from an API
    setTimeout(() => {
      // Generate data for the selected route across all months
      const generatedData = generateRouteData(route, shipType, year);
      setChartData(generatedData);
      setIsLoading(false);
    }, 800);
  }, [route, shipType, year]);

  // Generate simulated historical data for the route
  const generateRouteData = (route, shipType, selectedYear) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Seasonal patterns: Different patterns for different routes
    const seasonalFactors = {
      // Seasonal factors for different route types
      'Asia - Europe': [1.1, 0.9, 0.8, 1.0, 1.1, 1.2, 1.3, 1.2, 1.0, 0.9, 0.8, 1.0],
      'Asia - Middle East': [1.2, 1.1, 1.0, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'North America - Asia': [0.8, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 1.0, 1.2, 1.3, 1.2, 1.0],
      'North America - Europe': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'South America - Africa': [1.0, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2],
      'North America - South America': [1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.0, 1.1],
      'Europe - North America': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'Asia - Oceania': [1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2],
      'Middle East - South Asia': [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'Global Key Point': [1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.9, 0.9, 1.0],
    };

    // Year-over-year growth patterns (simulate different years)
    const yearFactors = {
      2021: 0.8,
      2022: 0.9,
      2023: 1.0,
      2024: 1.1,
      2025: 1.2
    };
    
    // Ship type factors
    const shipTypeFactors = {
      'all': 1.0,
      'cargo': 1.2,
      'tanker': 0.9
    };

    // Get the baseline for this route
    const baseline = route.baseline;
    
    // Get the seasonal factors for this route's region
    const seasonalPattern = seasonalFactors[route.region] || seasonalFactors['Global Key Point'];
    
    // Generate data for each month
    return months.map((month, index) => {
      // Calculate volume with seasonal pattern and some randomness
      const randomVariation = Math.random() * 0.1 + 0.95; // 0.95 to 1.05
      const volumeFactor = seasonalPattern[index] * yearFactors[selectedYear] * shipTypeFactors[shipType] * randomVariation;
      const volume = Math.round(baseline * volumeFactor);
      
      // Calculate year-over-year comparison (for prev year)
      const prevYearVolume = Math.round(baseline * seasonalPattern[index] * yearFactors[selectedYear - 1] * shipTypeFactors[shipType] * (Math.random() * 0.1 + 0.95));
      
      return {
        month,
        volume,
        prevYearVolume
      };
    });
  };

  // Calculate the max value for the chart
  const getMaxValue = () => {
    if (chartData.length === 0) return 500;
    return Math.max(...chartData.map(d => Math.max(d.volume, d.prevYearVolume))) * 1.2;
  };

  // Function to draw the chart (SVG-based solution)
  const renderChart = () => {
    if (chartData.length === 0) return null;
    
    const maxValue = getMaxValue();
    const width = 100; // percentage width
    const height = 250; // fixed height
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    
    // Calculate bar width based on number of data points
    const barWidth = (width - padding.left - padding.right) / (chartData.length * 2); // Each month has 2 bars
    
    return (
      <svg 
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Y-axis line */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#444"
          strokeWidth="0.2"
        />
        
        {/* X-axis line */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#444"
          strokeWidth="0.2"
        />
        
        {/* Y-axis labels - create 5 evenly spaced labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const yValue = maxValue - (maxValue / 4) * i;
          const yPos = padding.top + ((height - padding.top - padding.bottom) / 4) * i;
          
          return (
            <g key={`y-label-${i}`}>
              <line
                x1={padding.left - 0.5}
                y1={yPos}
                x2={width - padding.right}
                y2={yPos}
                stroke="#333"
                strokeWidth="0.1"
                strokeDasharray="0.5,0.5"
              />
              <text
                x={padding.left - 1}
                y={yPos}
                fontSize="2"
                fill="#999"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(yValue)}
              </text>
            </g>
          );
        })}
        
        {/* X-axis labels and bars */}
        {chartData.map((data, i) => {
          const x = padding.left + i * (barWidth * 2 + 1); // 1 unit gap between month groups
          const barHeight1 = ((data.volume / maxValue) * (height - padding.top - padding.bottom));
          const barHeight2 = ((data.prevYearVolume / maxValue) * (height - padding.top - padding.bottom));
          const y1 = height - padding.bottom - barHeight1;
          const y2 = height - padding.bottom - barHeight2;
          
          return (
            <g key={`month-${i}`}>
              {/* Month label */}
              <text
                x={x + barWidth}
                y={height - padding.bottom + 3}
                fontSize="2"
                fill="#999"
                textAnchor="middle"
              >
                {data.month}
              </text>
              
              {/* Current year bar */}
              <rect
                x={x}
                y={y1}
                width={barWidth}
                height={barHeight1}
                fill="#3584e4"
                opacity="0.9"
              />
              
              {/* Previous year bar */}
              <rect
                x={x + barWidth + 0.2}
                y={y2}
                width={barWidth}
                height={barHeight2}
                fill="#2ec27e"
                opacity="0.7"
              />
            </g>
          );
        })}
        
        {/* Legend */}
        <g transform={`translate(${width - 20}, ${padding.top})`}>
          <rect x="0" y="0" width="2" height="2" fill="#3584e4" />
          <text x="3" y="1.5" fontSize="1.8" fill="#ccc">{year}</text>
          
          <rect x="0" y="3" width="2" height="2" fill="#2ec27e" />
          <text x="3" y="4.5" fontSize="1.8" fill="#ccc">{year-1}</text>
        </g>
        
        {/* Chart title */}
        <text
          x={width / 2}
          y={padding.top / 2}
          fontSize="2.5"
          fill="#ccc"
          textAnchor="middle"
        >
          MONTHLY TRAFFIC VOLUMES
        </text>
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="terminal-panel p-4 h-[30vh] flex items-center justify-center">
        <div className="text-terminal-yellow font-mono text-sm">
          LOADING VOLUME DATA...
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="terminal-panel p-4 h-[30vh] flex items-center justify-center">
        <div className="text-gray-400 font-mono text-sm">
          <span className="text-terminal-yellow">SELECT A ROUTE</span> TO VIEW VOLUME CHART
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-panel p-4 h-[30vh]">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
        <h3 className="terminal-section-title text-sm font-semibold">
          TRAFFIC VOLUME: {route.name.toUpperCase()}
        </h3>
      </div>
      
      <div className="text-xs text-gray-400 mb-2 font-mono">
        Region: {route.region} | Distance: {route.distance}
      </div>
      
      <div className="h-[calc(100%-60px)]">
        {renderChart()}
      </div>
    </div>
  );
}

export default RouteVolumeChart;