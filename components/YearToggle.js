"use client";

function YearToggle({ selectedYear, onYearChange }) {
  // Calculate the last 5 years from current date (2025)
  const currentYear = 2025;
  const years = [];
  for (let i = 0; i < 5; i++) {
    years.push(currentYear - i);
  }

  return (
    <div>
      <div className="mb-2">
        <span className="terminal-data-label">YEAR</span>
        <span className="text-xs text-terminal-green ml-2">[SELECT]</span>
      </div>
      <div className="flex space-x-2 flex-wrap">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-3 py-1 text-xs rounded mb-1 ${
              selectedYear === year
                ? 'terminal-button-active'
                : 'terminal-button'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

export default YearToggle;