"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import CardInfoTraffic from './CardInfoTraffic';
import MapLegend from './MapLegend';
import TerminalHeader from './TerminalHeader';
import StatusBar from './StatusBar';

// Dynamically import the MapDensity component to prevent SSR issues with Leaflet
const MapDensity = dynamic(() => import('./MapDensity'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] flex items-center justify-center bg-gray-900 border border-gray-800 rounded">
      <div className="text-gray-400 font-mono text-sm">
        <span className="text-terminal-yellow">LOADING</span> MARITIME DATA...
      </div>
    </div>
  ),
});

function MaritimeDashboard() {
  const [shipType, setShipType] = useState('all');
  const [timeFrame, setTimeFrame] = useState('01');

  const handleShipTypeChange = (type) => {
    setShipType(type);
  };

  const handleTimeFrameChange = (month) => {
    setTimeFrame(month);
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
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-3">
            <MapDensity 
              shipType={shipType} 
              timeFrame={timeFrame} 
              key={`map-container-${shipType}-${timeFrame}`}
            />
          </div>
          <div className="space-y-4">
            <CardInfoTraffic shipType={shipTypeToText[shipType]} timeFrame={timeFrame} />
            <MapLegend />
            
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
            INDICATING CONCENTRATION OF MARITIME TRAFFIC. PERIOD: 2011-2021.
          </p>
        </div>
      </div>
      
      <StatusBar />
    </div>
  );
}

export default MaritimeDashboard;