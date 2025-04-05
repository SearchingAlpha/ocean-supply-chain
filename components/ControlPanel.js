"use client";

import { useState } from 'react';

function ControlPanel({ onShipTypeChange, onTimeFrameChange }) {
  const [selectedShipType, setSelectedShipType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('01');

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
    setSelectedShipType(type);
    onShipTypeChange(type);
  };

  const handleTimeFrameChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    onTimeFrameChange(month);
  };

  return (
    <div className="terminal-panel p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-blue rounded-full mr-2"></div>
        <h2 className="terminal-section-title text-sm font-semibold">MARITIME TRAFFIC FILTERS</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-2">
            <span className="terminal-data-label">VESSEL TYPE</span>
            <span className="text-xs text-terminal-green ml-2">[SELECT]</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleShipTypeChange('all')}
              className={`px-3 py-1 text-xs rounded ${
                selectedShipType === 'all'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              ALL VESSELS
            </button>
            <button
              onClick={() => handleShipTypeChange('cargo')}
              className={`px-3 py-1 text-xs rounded ${
                selectedShipType === 'cargo'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              CONTAINER SHIPS
            </button>
            <button
              onClick={() => handleShipTypeChange('tanker')}
              className={`px-3 py-1 text-xs rounded ${
                selectedShipType === 'tanker'
                  ? 'terminal-button-active'
                  : 'terminal-button'
              }`}
            >
              TANKERS
            </button>
          </div>
        </div>
        
        <div>
          <div className="mb-2">
            <span className="terminal-data-label">TIME PERIOD (2021)</span>
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