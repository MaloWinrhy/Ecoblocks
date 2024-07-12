import React from 'react';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';

const ChartContainer = ({ averageData }) => {
  const barData = {
    labels: Object.keys(averageData),
    datasets: [
      {
        label: 'Average Environmental Data',
        backgroundColor: 'rgba(106, 155, 107, 0.8)',
        borderColor: '#4F7648',
        borderWidth: 1,
        hoverBackgroundColor: '#9E9E9E',
        hoverBorderColor: '#4F7648',
        data: Object.values(averageData)
      }
    ]
  };

  const lineData = {
    labels: Object.keys(averageData),
    datasets: [
      {
        label: 'Average Environmental Data Over Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(106, 155, 107, 0.4)',
        borderColor: '#4F7648',
        pointBorderColor: '#3A5735',
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#4F7648',
        pointHoverBorderColor: '#9E9E9E',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(averageData)
      }
    ]
  };

  const doughnutData = {
    labels: Object.keys(averageData),
    datasets: [
      {
        data: Object.values(averageData),
        backgroundColor: [
          '#4F7648',
          '#283747',
          '#666666',
          'rgba(106, 155, 107, 0.8)',
          'rgba(62, 85, 113, 0.8)',
          '#1B2734',
          '#3A5735',
          '#9E9E9E',
          '#333333',
          '#f9f9f9',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.1)',
          '#d3e4cd'
        ],
        hoverBackgroundColor: [
          '#9E9E9E',
          '#283747',
          '#666666',
          '#4F7648',
          'rgba(62, 85, 113, 0.8)',
          '#1B2734',
          '#3A5735',
          'rgba(106, 155, 107, 0.8)',
          '#333333',
          '#f9f9f9',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.1)',
          '#d3e4cd'
        ]
      }
    ]
  };

  const radarData = {
    labels: Object.keys(averageData),
    datasets: [
      {
        label: 'Average Environmental Data',
        backgroundColor: 'rgba(75, 118, 72, 0.2)',
        borderColor: '#4F7648',
        pointBackgroundColor: '#4F7648',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#4F7648',
        data: Object.values(averageData)
      }
    ]
  };

  return (
    <div className="chart-container">
      <div className="chart">
        <h2>Average Environmental Data</h2>
        <Bar data={barData} />
      </div>
      <div className="chart">
        <h2>Average Environmental Data Over Time</h2>
        <Line data={lineData} />
      </div>
      <div className="chart">
        <h2>Distribution of Environmental Data</h2>
        <Doughnut data={doughnutData} />
      </div>
      <div className="chart">
        <h2>Radar Chart of Environmental Data</h2>
        <Radar data={radarData} />
      </div>
    </div>
  );
}

export default ChartContainer;
