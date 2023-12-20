import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AreaChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current?.destroy();

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My Dataset',
              data: [63, 59, 81, 75, 53, 51, 40],
              backgroundColor: '#d3d4d7',
              borderColor: '#a4a1a1',
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: 10,
              max: 90,
            },
          },
        },
      });

      chartInstance.current = chart; 
    }
  }, []);

  return <canvas ref={chartRef} />;
}

export default AreaChart;
