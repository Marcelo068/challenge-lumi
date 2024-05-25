import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MainLayout from '../../layouts/MainLayout';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, TextField } from '@mui/material';

const Dashboard: React.FC = () => {
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/energy-bills/data-for-charts`, {
          params: { numeroCliente: selectedClient }
        });
        setEnergyData(response.data);
      } catch (error) {
        throw new Error('Erro ao buscar faturas de energia: ' + error);
      }
    };

    fetchData();
  }, [selectedClient]);

  const calculateSums = () => {
    let totalConsumoEnergiaKWh = 0;
    let totalEnergiaCompensadaKWh = 0;
    let totalValorSemGDReais = 0;
    let totalEconomiaGDReais = 0;

    energyData.forEach(data => {
      totalConsumoEnergiaKWh += data.consumoEnergiaEletricaKWh;
      totalEnergiaCompensadaKWh += data.energiaCompensadaKWh;
      totalValorSemGDReais += data.valorTotalSemGDReais;
      totalEconomiaGDReais += data.economiaGDReais;
    });

    return {
      totalConsumoEnergiaKWh,
      totalEnergiaCompensadaKWh,
      totalValorSemGDReais,
      totalEconomiaGDReais,
    };
  };

  const totals = calculateSums();

  const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClient(event.target.value);
  };

  return (
    <MainLayout>
      <h1>Welcome to the Dashboard Page</h1>
      <Box sx={{ p: 3 }}>
        <TextField
          label="Número do Cliente"
          variant="outlined"
          value={selectedClient}
          onChange={handleClientChange}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <BarChart
          series={[
            { data: [totals.totalConsumoEnergiaKWh, totals.totalEnergiaCompensadaKWh] },
          ]}
          height={290}
          xAxis={[{ data: ['Consumo de Energia Elétrica', 'Energia Compensada'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <BarChart
          series={[
            { data: [totals.totalValorSemGDReais, totals.totalEconomiaGDReais] },
          ]}
          height={290}
          xAxis={[{ data: ['Valor Total sem GD', 'Economia GD'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
