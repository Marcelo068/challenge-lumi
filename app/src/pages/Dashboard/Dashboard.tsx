import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import MainLayout from '../../layouts/MainLayout';

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Número do Cliente"
              variant="outlined"
              value={selectedClient}
              onChange={handleClientChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <BarChart
              series={[
                { data: [totals.totalConsumoEnergiaKWh, totals.totalEnergiaCompensadaKWh] },
              ]}
              height={290}
              xAxis={[{ data: ['Consumo de Energia Elétrica', 'Energia Compensada'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              colors={['#2196f3', '#4caf50']}
            />

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }}>
            <BarChart
              series={[
                { data: [totals.totalValorSemGDReais, totals.totalEconomiaGDReais] },
              ]}
              height={290}
              xAxis={[{ data: ['Valor Total sem GD', 'Economia GD'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              colors={['#2196f3', '#4caf50']}
            />
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
