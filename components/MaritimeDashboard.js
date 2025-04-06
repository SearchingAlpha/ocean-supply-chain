"use client";

import { useState } from 'react';
import ControlPanel from './ControlPanel';
import CardInfoTraffic from './CardInfoTraffic';
import MapLegend from './MapLegend';
import TerminalHeader from './TerminalHeader';
import StatusBar from './StatusBar';
import TabsContainer from './TabsContainer';
import DataTrendIndicator from './DataTrendIndicator';

function MaritimeDashboard() {
  const [shipType, setShipType] = useState('all');
  const [timeFrame, setTimeFrame] = useState('01');
  const [selectedYear, setSelectedYear] = useState(2025); // Default to current year

  const handleShipTypeChange = (type) => {
    setShipType(type);
  };

  const handleTimeFrameChange = (month) => {
    setTimeFrame(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Map ship type to display text
  const shipTypeToText = {
    'all': 'All Vessels',
    'cargo': 'Container Ships',
    'tanker': 'Tankers'
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TerminalHeader />
      
      <div className="flex-grow container mx-auto px-4 py-4">
        <ControlPanel 
          onShipTypeChange={handleShipTypeChange} 
          onTimeFrameChange={handleTimeFrameChange} 
          onYearChange={handleYearChange}
          selectedShipType={shipType}
          selectedMonth={timeFrame}
          selectedYear={selectedYear}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-3">
            <TabsContainer 
              shipType={shipType} 
              timeFrame={timeFrame}
              year={selectedYear}
              key={`tab-container-${shipType}-${timeFrame}-${selectedYear}`}
            />
          </div>
          <div className="space-y-4">
            <CardInfoTraffic 
              shipType={shipTypeToText[shipType]} 
              timeFrame={timeFrame} 
              year={selectedYear}
            />
            <MapLegend />
            <DataTrendIndicator year={selectedYear} />
            
            {/* Adding a mini metrics panel */}
            <div className="terminal-panel p-4">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-terminal-red rounded-full mr-2"></div>
                <h3 className="terminal-section-title text-sm font-semibold">KEY METRICS</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="terminal-data-label">TOTAL TRACKED:</span>
                  <span className="terminal-data-value text-sm">70,842</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="terminal-data-label">SIGNALS/DAY:</span>
                  <span className="terminal-data-value text-sm">2.3M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="terminal-data-label">DATA QUALITY:</span>
                  <span className="terminal-data-value text-sm">97.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="terminal-panel p-4 mb-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-terminal-blue rounded-full mr-2"></div>
            <h2 className="terminal-section-title text-sm font-semibold">DATA SOURCE INFORMATION</h2>
          </div>
          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            VISUALIZATION USES DATA FROM THE GLOBAL MARITIME TRAFFIC DENSITY SERVICE (GMTDS).
            DATA IS PROCESSED FROM AUTOMATIC IDENTIFICATION SYSTEM (AIS) SIGNALS TRANSMITTED
            BY VESSELS WORLDWIDE. DENSITY IS MEASURED IN HOURS PER SQUARE KILOMETER,
            INDICATING CONCENTRATION OF MARITIME TRAFFIC. PERIOD: 2020-2025.
          </p>
        </div>
      </div>
      
      <StatusBar />
    </div>
  );
}

export default MaritimeDashboard;