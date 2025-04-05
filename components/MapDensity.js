// File: components/MapDensity.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
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
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100 rounded-lg shadow-md">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] rounded-lg overflow-hidden shadow-md bg-white">
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        zoom={2}
        minZoom={1}
        maxZoom={13}
        scrollWheelZoom={true}
      >
        {/* Base map layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
          opacity={0.8}
        />
      </MapContainer>
    </div>
  );
}

export default MapDensity;