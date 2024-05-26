import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, TextField, Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import MainLayout from '../../layouts/MainLayout';
import { PieChart } from '@mui/x-charts/PieChart';

interface EnergyData {
  numeroCliente: string;
  consumoEnergiaEletricaKWh: number;
  energiaCompensadaKWh: number;
  valorTotalSemGDReais: number;
  economiaGDReais: number;
  dataEmissao: string;
}

interface AggregatedData {
  mes: string;
  consumoEnergiaEletricaKWh: number;
  energiaCompensadaKWh: number;
  valorTotalSemGDReais: number;
  economiaGDReais: number;
}

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const formatDateToMonth = (data: EnergyData[]): AggregatedData[] => {
  const aggregatedData: { [key: string]: AggregatedData } = {};

  data.forEach(item => {
    const [day, month, year] = item.dataEmissao.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const monthName = monthNames[date.getMonth()];

    if (!aggregatedData[monthName]) {
      aggregatedData[monthName] = {
        mes: monthName,
        consumoEnergiaEletricaKWh: 0,
        energiaCompensadaKWh: 0,
        valorTotalSemGDReais: 0,
        economiaGDReais: 0,
      };
    }

    aggregatedData[monthName].consumoEnergiaEletricaKWh += item.consumoEnergiaEletricaKWh;
    aggregatedData[monthName].energiaCompensadaKWh += item.energiaCompensadaKWh;
    aggregatedData[monthName].valorTotalSemGDReais += item.valorTotalSemGDReais;
    aggregatedData[monthName].economiaGDReais += item.economiaGDReais;
  });

  return Object.values(aggregatedData).sort((a, b) => monthNames.indexOf(a.mes) - monthNames.indexOf(b.mes));
};

const Dashboard: React.FC = () => {
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<EnergyData[]>(`${process.env.REACT_APP_API_URL}/energy-bills/data-for-charts`, {
          params: { numeroCliente: selectedClient }
        });
        const formattedData = formatDateToMonth(response.data);
        setEnergyData(formattedData);
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

  const valueFormatter = (value: number | null) => `${value}mm`;

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número do Cliente"
              variant="outlined"
              value={selectedClient}
              onChange={handleClientChange}
            />
          </Grid>
          <Grid item xs={12} md={8} paddingBottom={5}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Consumo de Energia e Economia
              </Typography>
              <BarChart
                dataset={energyData}
                xAxis={[{ scaleType: 'band', dataKey: 'mes' }]}
                series={[
                  { dataKey: 'consumoEnergiaEletricaKWh', label: 'Energia Elétrica', valueFormatter },
                  { dataKey: 'energiaCompensadaKWh', label: 'Energia Compensada', valueFormatter },
                ]}
                height={400}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} paddingBottom={5}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Total de Consumo de Energia
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: totals.totalConsumoEnergiaKWh, label: 'A'},
                      { id: 1, value: totals.totalEnergiaCompensadaKWh, label: 'B'},
                    ],
                  },
                ]}
                width={300}
                height={300}
                style={{ margin: 'auto', display: 'block' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Valores Monetários
              </Typography>
              <BarChart
                dataset={energyData}
                xAxis={[{ scaleType: 'band', dataKey: 'mes' }]}
                series={[
                  { dataKey: 'valorTotalSemGDReais', label: 'Total sem GD', valueFormatter },
                  { dataKey: 'economiaGDReais', label: 'Economia GD', valueFormatter },
                ]}
                height={400}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Total de Valores Monetários
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: totals.totalValorSemGDReais, label: 'A'},
                      { id: 1, value: totals.totalEconomiaGDReais, label: 'B'},
                    ],
                  },
                ]}
                width={300}
                height={300}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
