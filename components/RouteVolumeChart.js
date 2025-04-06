"use client";

import { useState, useEffect, useRef } from 'react';

function RouteVolumeChart({ route, shipType, year }) {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Generate simulated historical data for the route for all years
  const generateRouteData = (route, shipType, selectedYear) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Seasonal patterns: Different patterns for different routes
    const seasonalFactors = {
      'Asia - Europe': [1.1, 0.9, 0.8, 1.0, 1.1, 1.2, 1.3, 1.2, 1.0, 0.9, 0.8, 1.0],
      'Asia - Middle East': [1.2, 1.1, 1.0, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'North America - Asia': [0.8, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 1.0, 1.2, 1.3, 1.2, 1.0],
      'North America - Europe': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'South America - Africa': [1.0, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2],
      'North America - South America': [1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.0, 1.1],
      'Europe - North America': [0.7, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.3, 1.2, 1.0, 0.9, 0.8],
      'Asia - Oceania': [1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2],
      'Middle East - South Asia': [1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3],
      'Global Key Point': [1.0, 1.0, 1.1, 1.1, 1.2, 1.2, 1.1, 1.0, 0.9, 0.9, 0.9, 1.0],
    };

    // Year-over-year growth patterns (simulate different years)
    const yearFactors = {
      2021: 0.8,
      2022: 0.9,
      2023: 1.0,
      2024: 1.1,
      2025: 1.2
    };
    
    // Ship type factors
    const shipTypeFactors = {
      'all': 1.0,
      'cargo': 1.2,
      'tanker': 0.9
    };

    // Get the baseline for this route
    const baseline = route.baseline;
    
    // Get the seasonal factors for this route's region
    const seasonalPattern = seasonalFactors[route.region] || seasonalFactors['Global Key Point'];
    
    // Create data structure for all years and all months
    const results = {};
    
    // We'll use same seed for randomness to ensure consistency between renders
    const getConsistentRandomFactor = (year, month) => {
      // Use a simple hash function to generate consistent random numbers
      const seed = (year * 100 + month) * route.id;
      return ((seed * 9301 + 49297) % 233280) / 233280 * 0.1 + 0.95; // 0.95 to 1.05
    };
    
    // Generate data for each year (2021-2025)
    const years = [2021, 2022, 2023, 2024, 2025];
    years.forEach(yr => {
      results[yr] = months.map((month, index) => {
        const randomVariation = getConsistentRandomFactor(yr, index);
        const volumeFactor = seasonalPattern[index] * yearFactors[yr] * shipTypeFactors[shipType] * randomVariation;
        return Math.round(baseline * volumeFactor);
      });
    });
    
    return {
      months,
      yearData: results
    };
  };

  // Load Chart.js script dynamically
  const loadChartScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Chart is already loaded
      if (window.Chart) {
        resolve(window.Chart);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      script.onload = () => resolve(window.Chart);
      script.onerror = (err) => reject(new Error('Failed to load Chart.js script'));
      document.body.appendChild(script);
    });
  };

  // Render the chart using Chart.js with Bloomberg Terminal styling
  const renderChart = (data) => {
    if (!chartRef.current || !window.Chart || !data.months) return;
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Define Bloomberg-like colors for each year
    const yearColors = {
      2021: { line: '#FFCC00', point: '#FFCC00' }, // Yellow
      2022: { line: '#66FF66', point: '#66FF66' }, // Green
      2023: { line: '#FF6666', point: '#FF6666' }, // Red
      2024: { line: '#66CCFF', point: '#66CCFF' }, // Light Blue
      2025: { line: '#FFFFFF', point: '#FFFFFF' }  // White (current year)
    };
    
    // Create datasets for each year
    const datasets = Object.keys(data.yearData).map(yearKey => {
      const yr = parseInt(yearKey);
      const isCurrentYear = yr === year;
      
      return {
        label: `${yr}`,
        data: data.yearData[yr],
        borderColor: yearColors[yr].line,
        backgroundColor: 'transparent',
        borderWidth: isCurrentYear ? 3 : 2,
        pointRadius: isCurrentYear ? 4 : 2,
        pointHoverRadius: isCurrentYear ? 6 : 4,
        pointBackgroundColor: yearColors[yr].point,
        tension: 0.2,
        fill: false,
        borderDash: yr < year - 2 ? [3, 3] : [], // Dash older years
        z: isCurrentYear ? 10 : 5 - (year - yr), // Stack current year on top
        pointBorderColor: '#000000',
        pointBorderWidth: 1
      };
    });
    
    const ctx = chartRef.current.getContext('2d');
    
    // Create Bloomberg-inspired Chart.js instance
    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.months,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'TRAFFIC VOLUME (2021-2025)',
            color: '#FFFFFF',
            font: {
              family: 'Roboto Mono, monospace',
              size: 14,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          subtitle: {
            display: true,
            text: `${route.name.toUpperCase()} | ${route.region}`,
            color: '#AAAAAA',
            font: {
              family: 'Roboto Mono, monospace',
              size: 11
            },
            padding: {
              bottom: 10
            }
          },
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: '#FFFFFF',
              font: {
                family: 'Roboto Mono, monospace',
                size: 11,
                weight: 'bold'
              },
              boxWidth: 15,
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            titleColor: '#FFFFFF',
            bodyColor: '#FFFFFF',
            bodyFont: {
              family: 'Roboto Mono, monospace',
              weight: 'bold'
            },
            titleFont: {
              family: 'Roboto Mono, monospace',
              weight: 'bold'
            },
            borderColor: '#333333',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            intersect: false,
            mode: 'index',
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${value.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'VESSELS',
              color: '#AAAAAA',
              font: {
                family: 'Roboto Mono, monospace',
                size: 11,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#AAAAAA',
              font: {
                family: 'Roboto Mono, monospace',
                size: 10,
                weight: 'bold'
              },
              callback: function(value) {
                if (value >= 1000) {
                  return value / 1000 + 'K';
                }
                return value;
              }
            },
            grid: {
              color: '#222222',
              drawBorder: true,
              borderColor: '#333333',
              lineWidth: 1
            },
            border: {
              color: '#333333'
            }
          },
          x: {
            ticks: {
              color: '#AAAAAA',
              font: {
                family: 'Roboto Mono, monospace',
                size: 10,
                weight: 'bold'
              }
            },
            grid: {
              color: '#222222',
              drawBorder: true,
              borderColor: '#333333',
              lineWidth: 1
            },
            border: {
              color: '#333333'
            }
          }
        },
        animation: {
          duration: 800,
          easing: 'linear'
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5
          },
          line: {
            tension: 0.2
          }
        },
        layout: {
          padding: {
            top: 10,
            right: 20,
            bottom: 10,
            left: 10
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  };

  useEffect(() => {
    if (!route) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Generate route data for all years
    const routeData = generateRouteData(route, shipType, year);
    setChartData(routeData);

    // Load Chart.js and render chart
    const initChart = async () => {
      try {
        await loadChartScript();
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          renderChart(routeData);
          setIsLoading(false);
        }, 50);
      } catch (error) {
        console.error('Failed to initialize chart:', error);
        setIsLoading(false);
      }
    };

    initChart();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [route, shipType, year]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!route) {
    return (
      <div className="terminal-panel p-4 h-[30vh] flex items-center justify-center">
        <div className="text-gray-400 font-mono text-sm">
          <span className="text-terminal-yellow">SELECT A ROUTE</span> TO VIEW VOLUME CHART
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-chart-panel h-[40vh]" style={{ minHeight: "350px" }}>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
        <h3 className="text-sm font-mono text-white font-bold uppercase flex items-center">
          <span className="text-yellow-400 mr-2">[B29]</span>
          <span>TRAFFIC VOLUME ANALYSIS</span>
        </h3>
      </div>
      
      <div className="text-xs text-yellow-400 mb-2 font-mono flex items-center justify-between">
        <span>ROUTE: {route.name.toUpperCase()}</span>
        <span className="text-white">DIST: {route.distance}</span>
      </div>
      
      <div className="h-[calc(100%-40px)] relative bg-black rounded border border-gray-800" style={{ minHeight: "280px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
            <div className="text-yellow-400 font-mono text-sm font-bold">
              LOADING DATA [BBG/MAR/TR-VOL] <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        
        {/* Bloomberg-style chart header */}
        <div className="absolute top-0 right-0 mr-2 mt-2 z-20 text-xs font-mono text-gray-400">
          <span className="bg-black px-2 py-1">GMTV/CHART</span>
        </div>
        
        <canvas 
          ref={chartRef} 
          className="w-full h-full chartjs-bg" 
          id="volume-chart"
          style={{ zIndex: 5 }}
        ></canvas>
        
        {/* Bloomberg-style chart footer */}
        <div className="absolute bottom-0 right-0 left-0 flex justify-between items-center text-xs font-mono p-1 bg-black bg-opacity-70 border-t border-gray-800">
          <span className="text-gray-400">SOURCE: GMTDS/AIS</span>
          <span className="text-yellow-400">{new Date().toISOString().split('T')[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default RouteVolumeChart;