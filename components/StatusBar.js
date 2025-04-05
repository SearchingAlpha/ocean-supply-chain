"use client";

import { useState, useEffect } from 'react';

function StatusBar() {
  const [dataUpdateTime, setDataUpdateTime] = useState('');
  
  useEffect(() => {
    // Generate a random time in the past hour for the "last updated" info
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 60);
    now.setMinutes(now.getMinutes() - minutesAgo);
    
    setDataUpdateTime(now.toLocaleTimeString('en-US', { hour12: false }));
  }, []);

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-1 px-4 text-xs font-mono">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="text-terminal-green">GMTDS</span>
          <span className="text-gray-400">SOURCE: AIS DATA</span>
          <span className="text-gray-400">
            LAST UPDATE: <span className="text-terminal-yellow">{dataUpdateTime}</span>
          </span>
        </div>
        
        <div className="flex space-x-4">
          <span className="text-gray-400">F1: HELP</span>
          <span className="text-gray-400">F5: REFRESH</span>
          <span className="text-gray-400">ESC: CLEAR</span>
        </div>
      </div>
    </footer>
  );
}

export default StatusBar;