// File: components/MaritimeDashboard.jsx
"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import CardInfoTraffic from './CardInfoTraffic';
import MapLegend from './MapLegend';

// Dynamically import the MapDensity component to prevent SSR issues with Leaflet
const MapDensity = dynamic(() => import('./MapDensity'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-500">Loading map...</div>
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
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Global Maritime Traffic Density</h1>
        <p className="text-slate-600 mt-2">
          Visualize maritime traffic patterns and density for commercial shipping routes
        </p>
      </header>

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
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2 text-slate-800">About This Data</h2>
        <p className="text-slate-600">
          This visualization uses data from the Global Maritime Traffic Density Service (GMTDS), 
          which processes Automatic Identification System (AIS) signals from vessels worldwide. 
          The density is measured in hours per square kilometer, indicating the concentration 
          of maritime traffic in different regions. Data shown ranges from 2011 to 2021.
        </p>
      </div>
    </div>
  );
}

export default MaritimeDashboard;