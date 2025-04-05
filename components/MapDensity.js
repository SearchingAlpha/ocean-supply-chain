"use client";

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, WMSTileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

function MapDensity({ shipType, timeFrame }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  
  // Set default bounds for the map (world view)
  const bounds = [
    [-60, -180], // Southwest corner
    [75, 180]    // Northeast corner
  ];

  useEffect(() => {
    // Fix Leaflet icon issues when component mounts
    fixLeafletIcons();
    setMapLoaded(true);
    
    return () => {
      // Clean up if needed
    };
  }, []);

  // Construct CQL filter based on shipType
  const getCqlFilter = () => {
    if (shipType === 'all') {
      return "category_column='All' AND category='All'";
    } else if (shipType === 'cargo') {
      return "category_column='ShipTypeAgg' AND category='Cargo Ships'";
    } else if (shipType === 'tanker') {
      return "category_column='ShipTypeAgg' AND category='Tankers'";
    }
    return "category_column='All' AND category='All'";
  };

  // Format the time parameter based on the timeFrame
  const getTimeParam = () => {
    // Default to current year's January 1st
    // Since GMTDS data ranges from 2011-2021, we'll use 2021 as default
    return `2021-${timeFrame}-01T00:00:00Z`;
  };

  if (!mapLoaded) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-900 border border-gray-800 rounded">
        <div className="text-gray-400 font-mono text-sm">
          <span className="text-terminal-yellow">LOADING</span> MARITIME DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] rounded overflow-hidden border border-gray-700 bg-gray-900 relative">
      {/* Map title overlay */}
      <div className="absolute top-0 left-0 z-[1000] bg-black bg-opacity-50 text-white px-3 py-1 text-xs font-mono m-2 rounded">
        <span className="text-terminal-blue-light mr-1">MAP:</span>
        GLOBAL MARITIME TRAFFIC {shipType === 'all' ? 'ALL VESSELS' : shipType === 'cargo' ? 'CONTAINER SHIPS' : 'TANKERS'}
      </div>
      
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        zoom={2}
        minZoom={1}
        maxZoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className="dark-map"
      >
        {/* Base map layer - using a dark style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* GMTDS WMS Layer */}
        <WMSTileLayer
          url="https://gmtds.maplarge.com/ogc/ais:density/wms"
          params={{
            service: 'WMS',
            version: '1.3.0',
            request: 'GetMap',
            layers: 'ais:density',
            format: 'image/png',
            transparent: true,
            time: getTimeParam(),
            cql_filter: getCqlFilter()
          }}
          opacity={0.85}
        />
        
        {/* Add zoom control to bottom right */}
        <ZoomControl position="bottomright" />
        
        {/* We're not showing attribution control - it will be in our StatusBar */}
      </MapContainer>
    </div>
  );
}

export default MapDensity;