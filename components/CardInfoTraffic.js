// File: components/CardInfoTraffic.jsx

function CardInfoTraffic({ shipType, timeFrame, year = 2025 }) {
    // Convert timeFrame to month name
    const getMonthName = (monthNumber) => {
      const date = new Date(year, parseInt(monthNumber) - 1, 1);
      return date.toLocaleString('default', { month: 'long' });
    };
  
    // Some information about different ship types
    const shipTypeInfo = {
      'All Vessels': {
        count: '~70,000',
        routes: 'Global shipping lanes',
        description: 'All maritime vessels tracked by AIS including cargo, tankers, fishing, and passenger ships.'
      },
      'Container Ships': {
        count: '~5,400',
        routes: 'East-West trade routes, particularly between Asia and Europe/North America',
        description: 'Vessels carrying standardized shipping containers, primarily serving major ports with container facilities.'
      },
      'Tankers': {
        count: '~11,000',
        routes: 'Middle East to Asia/Europe, West Africa to US/Europe',
        description: 'Vessels transporting liquid cargo such as oil, chemicals, and natural gas.'
      }
    };
  
    const info = shipTypeInfo[shipType] || shipTypeInfo['All Vessels'];
  
    return (
      <div className="terminal-panel p-4">
        <div className="flex items-center mb-3">
          <div className="w-2 h-2 bg-terminal-yellow rounded-full mr-2"></div>
          <h3 className="terminal-section-title text-sm font-semibold">CURRENT SELECTION</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="terminal-data-label">VESSEL TYPE:</span>
            <span className="terminal-data-value text-sm">{shipType.toUpperCase()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="terminal-data-label">DATE:</span>
            <span className="terminal-data-value text-sm">{getMonthName(timeFrame).toUpperCase()} {year}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="terminal-data-label">ACTIVE VESSELS:</span>
            <span className="terminal-data-value text-sm">{info.count}</span>
          </div>
          
          <div className="border-t border-gray-700 pt-2 mt-2">
            <div className="terminal-data-label mb-1">MAJOR ROUTES:</div>
            <p className="text-xs text-gray-300 font-mono">{info.routes.toUpperCase()}</p>
          </div>
          
          <div>
            <div className="terminal-data-label mb-1">DESCRIPTION:</div>
            <p className="text-xs text-gray-300 font-mono">{info.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardInfoTraffic;