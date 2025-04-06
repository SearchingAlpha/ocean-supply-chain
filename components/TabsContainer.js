"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import TabNavigation from './TabNavigation';

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

// Dynamically import the ShippingDeviations component for consistency
const ShippingDeviations = dynamic(() => import('./ShippingDeviations'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] flex items-center justify-center bg-gray-900 border border-gray-800 rounded">
      <div className="text-gray-400 font-mono text-sm">
        <span className="text-terminal-yellow">LOADING</span> DEVIATION DATA...
      </div>
    </div>
  ),
});

// Dynamically import the RouteVolumeChart component
const RouteVolumeChart = dynamic(() => import('./RouteVolumeChart'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[30vh] flex items-center justify-center bg-gray-900 border border-gray-800 rounded">
      <div className="text-gray-400 font-mono text-sm">
        <span className="text-terminal-yellow">LOADING</span> CHART DATA...
      </div>
    </div>
  ),
});

function TabsContainer({ shipType, timeFrame, year }) {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {activeTab === 'map' && (
        <MapDensity 
          shipType={shipType} 
          timeFrame={timeFrame}
          year={year}
          key={`map-container-${shipType}-${timeFrame}-${year}`}
        />
      )}
      
      {activeTab === 'deviations' && (
        <div className="space-y-4">
          <ShippingDeviations 
            shipType={shipType} 
            timeFrame={timeFrame}
            year={year}
            onRouteSelect={handleRouteSelect}
            selectedRoute={selectedRoute}
            key={`deviations-${shipType}-${timeFrame}-${year}`}
          />
          
          {selectedRoute && (
            <RouteVolumeChart
              route={selectedRoute}
              shipType={shipType}
              year={year}
              key={`chart-${selectedRoute.id}-${shipType}-${year}`}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TabsContainer;