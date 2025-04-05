"use client";

import { useState, useEffect } from 'react';

function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    // Update time every second
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="terminal-header py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-mono font-bold text-terminal-blue-light mr-2">
            GMTV
          </h1>
          <span className="text-sm text-gray-400 px-2 py-1 rounded bg-gray-800 font-mono">
            Global Maritime Traffic Visualization
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-xs text-gray-400 font-mono">
            <span className="text-terminal-green mr-1">SYS:</span> ONLINE
          </div>
          <div className="text-xs text-gray-400 font-mono">
            <span className="text-terminal-yellow mr-1">DATE:</span> {currentDate}
          </div>
          <div className="text-xs text-gray-400 font-mono">
            <span className="text-terminal-yellow mr-1">TIME:</span> {currentTime}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TerminalHeader;