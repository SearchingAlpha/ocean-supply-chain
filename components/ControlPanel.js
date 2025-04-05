// File: components/ControlPanel.jsx
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
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Maritime Traffic Filters</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-md font-medium mb-2 text-slate-700">Vessel Type</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleShipTypeChange('all')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedShipType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Vessels
            </button>
            <button
              onClick={() => handleShipTypeChange('cargo')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedShipType === 'cargo'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Container Ships
            </button>
            <button
              onClick={() => handleShipTypeChange('tanker')}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedShipType === 'tanker'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tankers
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2 text-slate-700">Time Period (2021)</h3>
          <select
            value={selectedMonth}
            onChange={handleTimeFrameChange}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;