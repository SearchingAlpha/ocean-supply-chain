"use client";

import { useState } from 'react';

function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'map', label: 'DENSITY MAP' },
    { id: 'deviations', label: 'MOM DEVIATIONS' }
  ];

  return (
    <div className="terminal-tabs mb-4 border-b border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-xs font-mono border-b-2 focus:outline-none transition-colors ${
              activeTab === tab.id
                ? 'border-terminal-blue-light text-terminal-blue-light'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabNavigation;