"use client";

import { useEffect } from 'react';
import YearToggle from './YearToggle';

function ControlPanel({ 
  onShipTypeChange, 
  onTimeFrameChange, 
  onYearChange,
  selectedShipType = 'all',
  selectedMonth = '01',
  selectedYear = 2025
}) {
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const handleShipTypeChange = (type) => {
    onShipTypeChange(type);
  };

  const handleTimeFrameChange = (event) => {
    const month = event.target.value;
    onTimeFrameChange(month);
  };

  const handleYearChange = (year) => {
    onYearChange(year);
  };

  return (
    <div className="terminal-panel p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-blue rounded-full mr-2"></div>
        <h2 className="terminal-section-title text-sm font-semibold">MARITIME TRAFFIC FILTERS</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="mb-2">
            <span className="terminal-data-label">VESSEL TYPE</span>
            <span className="text-xs text-terminal-green ml-2">[SELECT]</span>
          </div>
          <div className="flex space-x-2 flex-wrap">
            <button
              onClick={() => handleShipTypeChange('all')}
              className={`px-3 py-1 text-xs rounded mb-1 ${
                selectedShipType === 'all'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              ALL VESSELS
            </button>
            <button
              onClick={() => handleShipTypeChange('cargo')}
              className={`px-3 py-1 text-xs rounded mb-1 ${
                selectedShipType === 'cargo'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              CONTAINER SHIPS
            </button>
            <button
              onClick={() => handleShipTypeChange('tanker')}
              className={`px-3 py-1 text-xs rounded mb-1 ${
                selectedShipType === 'tanker'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              TANKERS
            </button>
          </div>
        </div>
        
        <YearToggle 
          selectedYear={selectedYear} 
          onYearChange={handleYearChange} 
        />
        
        <div>
          <div className="mb-2">
            <span className="terminal-data-label">MONTH</span>
            <span className="text-xs text-terminal-green ml-2">[SELECT]</span>
          </div>
          <select
            value={selectedMonth}
            onChange={handleTimeFrameChange}
            className="terminal-select w-full md:w-48 px-3 py-1 text-xs rounded bg-input-bg"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;