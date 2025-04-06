"use client";

import { useState, useEffect, useRef } from 'react';

function RouteVolumeChart({ route, shipType, year }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  // Generate simulated historical data for the route
  const generateRouteData = (route, shipType, selectedYear) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Seasonal patterns: Different patterns for different routes
    const seasonalFactors = {
      // Seasonal factors for different route types
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
    
    // Generate data for each month
    return months.map((month, index) => {
      // Calculate volume with seasonal pattern and some randomness
      const randomVariation = Math.random() * 0.1 + 0.95; // 0.95 to 1.05
      const volumeFactor = seasonalPattern[index] * yearFactors[selectedYear] * shipTypeFactors[shipType] * randomVariation;
      const volume = Math.round(baseline * volumeFactor);
      
      // Calculate year-over-year comparison (for prev year)
      const prevYearVolume = Math.round(baseline * seasonalPattern[index] * yearFactors[selectedYear - 1] * shipTypeFactors[shipType] * (Math.random() * 0.1 + 0.95));
      
      return {
        month,
        volume,
        prevYearVolume
      };
    });
  };

  // Load the Plotly script dynamically
  const loadPlotlyScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Plotly is already loaded
      if (window.Plotly) {
        resolve(window.Plotly);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/plotly.js@2.29.1/dist/plotly.min.js';
      script.async = true;
      script.onload = () => resolve(window.Plotly);
      script.onerror = (err) => reject(new Error('Failed to load Plotly script'));
      document.body.appendChild(script);
    });
  };

  // Render the chart using Plotly
  const renderChart = (data) => {
    if (!chartRef.current || !window.Plotly || !data.length) return;
    
    const months = data.map(item => item.month);
    const currentYearVolume = data.map(item => item.volume);
    const prevYearVolume = data.map(item => item.prevYearVolume);
    
    const plotData = [
      {
        name: `${year}`,
        x: months,
        y: currentYearVolume,
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#3584e4',
          width: 4
        },
        marker: {
          color: '#3584e4',
          size: 10
        }
      },
      {
        name: `${year-1}`,
        x: months,
        y: prevYearVolume,
        type: 'scatter',
        mode: 'lines+markers',
        line: {
          color: '#2ec27e',
          width: 4,
          dash: 'dot'
        },
        marker: {
          color: '#2ec27e',
          size: 10
        }
      }
    ];
    
    const layout = {
      autosize: true,
      height: 280,
      margin: {
        l: 50,
        r: 40,
        b: 40,
        t: 30,
        pad: 4
      },
      paper_bgcolor: '#1e1e1e',
      plot_bgcolor: '#1e1e1e',
      font: {
        family: 'Roboto Mono, monospace',
        size: 10,
        color: '#e1e1e1'
      },
      title: {
        text: 'MONTHLY TRAFFIC VOLUMES',
        font: {
          family: 'Roboto Mono, monospace',
          size: 12,
          color: '#e1e1e1'
        },
        x: 0.5
      },
      xaxis: {
        title: '',
        tickfont: {
          family: 'Roboto Mono, monospace',
          size: 11,
          color: '#cccccc'
        },
        gridcolor: '#333333',
        linecolor: '#444444',
        showgrid: true,
        tickmode: 'array',
        tickvals: months,
        ticktext: months
      },
      yaxis: {
        title: 'VOLUME',
        titlefont: {
          family: 'Roboto Mono, monospace',
          size: 11,
          color: '#cccccc'
        },
        tickfont: {
          family: 'Roboto Mono, monospace',
          size: 11,
          color: '#cccccc'
        },
        gridcolor: '#333333',
        linecolor: '#444444',
        showgrid: true,
        zeroline: true,
        zerolinecolor: '#444444',
        zerolinewidth: 1
      },
      legend: {
        x: 0.02,
        y: 0.98,
        bgcolor: '#252525',
        bordercolor: '#444444',
        borderwidth: 1,
        font: {
          family: 'Roboto Mono, monospace',
          size: 9,
          color: '#e1e1e1'
        },
        orientation: 'h'
      },
      hovermode: 'closest',
      showlegend: true
    };
    
    const config = {
      displayModeBar: false,
      responsive: true,
      toImageButtonOptions: {
        format: 'png',
        filename: `${route.name}-traffic-volume`,
        height: 500,
        width: 900,
        scale: 2
      }
    };
    
    window.Plotly.newPlot(chartRef.current, plotData, layout, config);
  };

  useEffect(() => {
    if (!route) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Generate route data
    const routeData = generateRouteData(route, shipType, year);
    setChartData(routeData);

    // Load Plotly and render chart
    const initChart = async () => {
      try {
        await loadPlotlyScript();
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          renderChart(routeData);
          setIsLoading(false);
          
          // Force a resize after a brief delay to ensure proper rendering
          setTimeout(() => {
            if (chartRef.current && window.Plotly) {
              window.Plotly.Plots.resize(chartRef.current);
            }
          }, 200);
        }, 50);
      } catch (error) {
        console.error('Failed to initialize chart:', error);
        setIsLoading(false);
      }
    };

    initChart();

    // Cleanup function
    return () => {
      if (chartRef.current && window.Plotly) {
        window.Plotly.purge(chartRef.current);
      }
    };
  }, [route, shipType, year]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && window.Plotly && chartData.length) {
        window.Plotly.Plots.resize(chartRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartData]);

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
    <div className="terminal-panel p-4 h-[40vh]" style={{ minHeight: "350px" }}>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-terminal-green rounded-full mr-2"></div>
        <h3 className="terminal-section-title text-sm font-semibold">
          TRAFFIC VOLUME: {route.name.toUpperCase()}
        </h3>
      </div>
      
      <div className="text-xs text-gray-400 mb-2 font-mono">
        Region: {route.region} | Distance: {route.distance}
      </div>
      
      <div className="h-[calc(100%-40px)] relative" style={{ minHeight: "280px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-panel-bg bg-opacity-50 z-10">
            <div className="text-terminal-yellow font-mono text-sm">
              LOADING VOLUME DATA...
            </div>
          </div>
        )}
        <div 
          ref={chartRef} 
          className="w-full h-full" 
          id="volume-chart"
          style={{ zIndex: 5 }}
        ></div>
      </div>
    </div>
  );
}

export default RouteVolumeChart;