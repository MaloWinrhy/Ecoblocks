import React from 'react';
import Stats from '../components/dashboard/Stats';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartContainer from '../components/dashboard/ChartContainer';
import DataTable from '../components/dashboard/Datatable';
import { processData, blockchainData } from '../services/blockDataServices';
import './DashboardPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const { totalBlocks, averageData, blocks } = processData(blockchainData);

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="main-content-dashboard">
        <main className="content">
          <h1>Dashboard</h1>
          <Stats totalBlocks={totalBlocks} />
          <ChartContainer averageData={averageData} />
          <DataTable blocks={blocks} />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
