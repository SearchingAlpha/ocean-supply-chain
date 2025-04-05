// File: components/CardInfoTraffic.jsx

function CardInfoTraffic({ shipType, timeFrame }) {
    // Convert timeFrame to month name
    const getMonthName = (monthNumber) => {
      const date = new Date(2021, parseInt(monthNumber) - 1, 1);
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
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-medium mb-3 text-slate-700">Current Selection</h3>
        
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-slate-500">Vessel Type:</span>
            <p className="text-slate-800 font-medium">{shipType}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-slate-500">Time Period:</span>
            <p className="text-slate-800 font-medium">{getMonthName(timeFrame)} 2021</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-slate-500">Active Vessels:</span>
            <p className="text-slate-800 font-medium">{info.count}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-slate-500">Major Routes:</span>
            <p className="text-sm text-slate-700">{info.routes}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-slate-500">Description:</span>
            <p className="text-sm text-slate-700">{info.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardInfoTraffic;