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
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-medium mb-3 text-slate-700">Traffic Density</h3>
        <div className="space-y-2">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-5 h-5 rounded-sm mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-3">
          Measured in hours per square kilometer
        </div>
      </div>
    );
  }
  
  export default MapLegend;