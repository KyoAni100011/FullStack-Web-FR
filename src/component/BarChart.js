import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function BarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { arrDailySales: 1, count: 1231000 },
      { arrDailySales: 2, count: 3125000 },
      { arrDailySales: 3, count: 7125300 },
      { arrDailySales: 4, count: 5210000 },
      { arrDailySales: 5, count: 6123000 },
      { arrDailySales: 6, count: 6123000 },
      { arrDailySales: 7, count: 6123000 },
      { arrDailySales: 8, count: 1234565 },
      { arrDailySales: 9, count: 5363534 },
      { arrDailySales: 10, count: 3284889 },
      { arrDailySales: 11, count: 4395959 },
      { arrDailySales: 12, count: 8548543 },
      { arrDailySales: 13, count: 4384848 },
      { arrDailySales: 14, count: 4294949 },
    ];

    const chartConfig = {
      type: 'bar',
      data: {
        labels: data.map((row) => row.arrDailySales),
        datasets: [
          {
            label: 'VNĐ',
            data: data.map((row) => row.count),
          },
        ],
      },
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart('acquisitions', chartConfig);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="ml-10 w-2/3 h-full">
      <canvas id="acquisitions"></canvas>
    </div>
  );
}
