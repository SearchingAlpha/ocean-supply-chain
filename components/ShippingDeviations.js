"use client";

import { useState, useEffect } from 'react';

function ShippingDeviations({ shipType, timeFrame, year, onRouteSelect, selectedRoute }) {
  // Sample data for shipping route deviations
  // In a real application, this would come from an API
  const [deviationData, setDeviationData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'deviation',
    direction: 'desc'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    setIsLoading(true);
    
    // Convert timeFrame to month number (1-12)
    const currentMonth = parseInt(timeFrame);
    // Calculate previous month with wrap-around (if January, previous is December)
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    
    // Simulate an API call with setTimeout
    setTimeout(() => {
      // Generate semi-realistic data based on shipType and timeFrame
      const generatedData = generateDeviationData(shipType, currentMonth, prevMonth, year);
      setDeviationData(generatedData);
      setIsLoading(false);
      
      // If no route is selected, select the one with the highest deviation
      if (!selectedRoute && generatedData.length > 0) {
        onRouteSelect(generatedData[0]);
      }
    }, 1000);
  }, [shipType, timeFrame, year, onRouteSelect, selectedRoute]);

  // Generate realistic sample data
  const generateDeviationData = (shipType, currentMonth, prevMonth, selectedYear) => {
    const routes = [
      { 
        id: 1, 
        name: 'Shanghai - Rotterdam', 
        region: 'Asia - Europe',
        distance: '10,377 nm',
        baseline: shipType === 'tanker' ? 187 : 342
      },
      { 
        id: 2, 
        name: 'Singapore - Suez Canal', 
        region: 'Asia - Middle East',
        distance: '4,940 nm',
        baseline: shipType === 'tanker' ? 263 : 298
      },
      { 
        id: 3, 
        name: 'Los Angeles - Shanghai', 
        region: 'North America - Asia',
        distance: '5,708 nm',
        baseline: shipType === 'tanker' ? 118 : 276
      },
      { 
        id: 4, 
        name: 'New York - Rotterdam', 
        region: 'North America - Europe',
        distance: '3,326 nm',
        baseline: shipType === 'tanker' ? 154 : 184
      },
      { 
        id: 5, 
        name: 'Santos - Cape Town', 
        region: 'South America - Africa',
        distance: '3,995 nm',
        baseline: shipType === 'tanker' ? 92 : 129
      },
      { 
        id: 6, 
        name: 'Houston - Santos', 
        region: 'North America - South America',
        distance: '5,237 nm',
        baseline: shipType === 'tanker' ? 143 : 156
      },
      { 
        id: 7, 
        name: 'Rotterdam - New York', 
        region: 'Europe - North America',
        distance: '3,326 nm',
        baseline: shipType === 'tanker' ? 147 : 198
      },
      { 
        id: 8, 
        name: 'Singapore - Sydney', 
        region: 'Asia - Oceania',
        distance: '3,915 nm',
        baseline: shipType === 'tanker' ? 88 : 114
      },
      { 
        id: 9, 
        name: 'Dubai - Mumbai', 
        region: 'Middle East - South Asia',
        distance: '1,180 nm',
        baseline: shipType === 'tanker' ? 216 : 186
      },
      { 
        id: 10, 
        name: 'Panama Canal Transit', 
        region: 'Global Key Point',
        distance: '51 nm',
        baseline: shipType === 'tanker' ? 312 : 487
      },
      { 
        id: 11, 
        name: 'Suez Canal Transit', 
        region: 'Global Key Point',
        distance: '120 nm',
        baseline: shipType === 'tanker' ? 347 : 523
      },
      { 
        id: 12, 
        name: 'Malacca Strait', 
        region: 'Global Key Point',
        distance: '550 nm',
        baseline: shipType === 'tanker' ? 398 : 674
      }
    ];

    // Seasonal patterns: Higher deviation in certain months
    const seasonalFactors = {
      // Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
      'Shanghai - Rotterdam': [1.1, 0.9, 0.8, 1.0, 1.1, 1.2, 1.3, 1.2, 1.0, 0.9, 0.8, 1.0],
      'Singapore - Suez Canal': [1.2, 1.1, 1.0, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'Los Angeles - Shanghai': [0.8, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 1.0, 1.2, 1.3, 1.2, 1.0],
      'New York - Rotterdam': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'Santos - Cape Town': [1.0, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2],
      'Houston - Santos': [1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.0, 1.1],
      'Rotterdam - New York': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'Singapore - Sydney': [1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2],
      'Dubai - Mumbai': [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'Panama Canal Transit': [1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.9, 0.9, 1.0],
      'Suez Canal Transit': [1.2, 1.1, 1.0, 0.9, 0.9, 1.0, 1.0, 1.1, 1.2, 1.2, 1.1, 1.0],
      'Malacca Strait': [1.1, 1.1, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.1],
    };
    
    // Year factors to create more variance between years
    const yearFactor = {
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

    return routes.map(route => {
      // Get seasonal factors for current and previous months
      const currentFactor = seasonalFactors[route.name][currentMonth - 1];
      const prevFactor = seasonalFactors[route.name][prevMonth - 1];
      
      // Calculate traffic values with some randomness
      const randomVariation = Math.random() * 0.2 + 0.9; // 0.9 to 1.1
      const currentValue = Math.round(route.baseline * currentFactor * shipTypeFactors[shipType] * yearFactor[selectedYear] * randomVariation);
      
      const randomVariationPrev = Math.random() * 0.2 + 0.9; // 0.9 to 1.1
      const prevValue = Math.round(route.baseline * prevFactor * shipTypeFactors[shipType] * yearFactor[selectedYear] * randomVariationPrev);
      
      // Calculate MoM changes
      const absoluteChange = currentValue - prevValue;
      const percentageChange = ((currentValue - prevValue) / prevValue * 100).toFixed(1);
      
      return {
        ...route,
        current: currentValue,
        previous: prevValue,
        change: absoluteChange,
        percentage: parseFloat(percentageChange),
        // Absolute value for sorting, but keep sign for display
        deviation: Math.abs(parseFloat(percentageChange))
      };
    });
  };

  const handleSort = (key) => {
    let direction = 'desc';
    
    // If already sorted by this key, toggle direction
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  // Sort the data based on current sort configuration
  const sortedData = [...deviationData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle route selection
  const handleRouteClick = (route) => {
    onRouteSelect(route);
  };

  // Get column header class based on sort state
  const getHeaderClass = (key) => {
    if (sortConfig.key === key) {
      return 'cursor-pointer text-terminal-blue-light';
    }
    return 'cursor-pointer text-gray-400 hover:text-gray-300';
  };

  // Get arrow indicator for sort direction
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  // Function to determine if a row is selected
  const isSelected = (routeId) => {
    return selectedRoute && selectedRoute.id === routeId;
  };

  // Function to determine the color class based on percentage change
  const getChangeColorClass = (percentage) => {
    if (percentage > 10) return 'text-terminal-red';
    if (percentage > 5) return 'text-terminal-yellow';
    if (percentage > 0) return 'text-terminal-green';
    if (percentage > -5) return 'text-terminal-blue-light';
    if (percentage > -10) return 'text-terminal-blue';
    return 'text-rose-700';
  };

  if (isLoading) {
    return (
      <div className="terminal-panel p-4 h-[40vh] flex items-center justify-center">
        <div className="text-terminal-yellow font-mono text-sm">
          LOADING DEVIATION DATA...
        </div>
      </div>
    );
  }

  // Get the current month name from the timeFrame
  const getMonthName = (monthNumber) => {
    const date = new Date(2021, parseInt(monthNumber) - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  return (
    <div className="terminal-panel p-4 h-[40vh] overflow-auto">
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-terminal-blue rounded-full mr-2"></div>
        <h2 className="terminal-section-title text-sm font-semibold">
          SHIPPING ROUTE MOM DEVIATIONS: {getMonthName(timeFrame).toUpperCase()} vs {getPrevMonthName(timeFrame).toUpperCase()} {year}
        </h2>
      </div>
      
      <div className="text-xs text-gray-400 mb-4 font-mono">
        Traffic volume comparison showing month-over-month changes for {shipType === 'all' ? 'all vessels' : shipType === 'cargo' ? 'container ships' : 'tankers'} across major shipping routes.
        <span className="text-terminal-yellow ml-2">Click on a route to view detailed volume trends.</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-2 py-2 text-left text-gray-400">ROUTE</th>
              <th className="px-2 py-2 text-left text-gray-400">REGION</th>
              <th 
                className={`px-2 py-2 text-right ${getHeaderClass('current')}`}
                onClick={() => handleSort('current')}
              >
                {getMonthName(timeFrame).toUpperCase()}{getSortArrow('current')}
              </th>
              <th 
                className={`px-2 py-2 text-right ${getHeaderClass('previous')}`}
                onClick={() => handleSort('previous')}
              >
                {getPrevMonthName(timeFrame).toUpperCase()}{getSortArrow('previous')}
              </th>
              <th 
                className={`px-2 py-2 text-right ${getHeaderClass('change')}`}
                onClick={() => handleSort('change')}
              >
                ΔVOLUME{getSortArrow('change')}
              </th>
              <th 
                className={`px-2 py-2 text-right ${getHeaderClass('deviation')}`}
                onClick={() => handleSort('deviation')}
              >
                ΔPERCENT{getSortArrow('deviation')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((route) => (
              <tr 
                key={route.id} 
                className={`border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${
                  isSelected(route.id) ? 'bg-gray-800' : ''
                }`}
                onClick={() => handleRouteClick(route)}
              >
                <td className={`px-2 py-2 ${isSelected(route.id) ? 'text-terminal-blue-light' : 'text-white'}`}>
                  {route.name}
                  {isSelected(route.id) && <span className="text-terminal-yellow ml-2">▶</span>}
                </td>
                <td className="px-2 py-2 text-gray-400">{route.region}</td>
                <td className="px-2 py-2 text-right text-terminal-yellow">{route.current}</td>
                <td className="px-2 py-2 text-right text-gray-400">{route.previous}</td>
                <td className="px-2 py-2 text-right text-terminal-blue-light">
                  {route.change > 0 ? '+' : ''}{route.change}
                </td>
                <td className={`px-2 py-2 text-right ${getChangeColorClass(route.percentage)}`}>
                  {route.percentage > 0 ? '+' : ''}{route.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-3 bg-gray-800 rounded text-xs">
        <div className="text-terminal-yellow mb-2">ANALYSIS INSIGHTS:</div>
        <p className="text-gray-300 mb-2">
          • Routes with deviations greater 10% may indicate significant trade pattern shifts or seasonal changes
        </p>
        <p className="text-gray-300 mb-2">
          • {sortedData[0]?.name} shows the largest deviation at {sortedData[0]?.percentage > 0 ? '+' : ''}{sortedData[0]?.percentage}%, possibly due to {sortedData[0]?.percentage > 0 ? 'increased' : 'decreased'} regional demand
        </p>
        <p className="text-gray-300">
          • Global key points (canals, straits) typically show less volatility than direct shipping routes
        </p>
      </div>
    </div>
  );
}

  // Get previous month (with wrap-around from January to December)
  const getPrevMonthName = (monthNumber) => {
    const prevMonth = monthNumber === 1 ? 12 : monthNumber - 1;
    const date = new Date(2021, prevMonth - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  };