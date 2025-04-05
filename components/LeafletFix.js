// File: components/LeafletFix.js
"use client";

import { useEffect } from 'react';

// Fix Leaflet's icon loading issue
const LeafletFix = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Dynamically import Leaflet when in the browser
      const L = require('leaflet');
      
      // Fix Leaflet's default icon path issues
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    }
  }, []);

  return null;
};

export default LeafletFix;