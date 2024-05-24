import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

const Dashboard: React.FC = () => {

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <h1>Welcome to the Dashboard Page</h1>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
