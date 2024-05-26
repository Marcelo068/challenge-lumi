import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Dashboard', () => {
  const mockedData = [
    {
      consumoEnergiaEletricaKWh: 100,
      energiaCompensadaKWh: 50,
      valorTotalSemGDReais: 200,
      economiaGDReais: 75,
      dataEmissao: '01/01/2021',
    },
    {
      consumoEnergiaEletricaKWh: 150,
      energiaCompensadaKWh: 60,
      valorTotalSemGDReais: 250,
      economiaGDReais: 85,
      dataEmissao: '01/02/2021',
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedData });
  });

  it('fetches and displays data correctly on client change', async () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    expect(screen.getByLabelText('Número do Cliente')).toBeInTheDocument();

    const input = screen.getByLabelText('Número do Cliente');
    await act(async () => {
      fireEvent.change(input, { target: { value: '12345' } });
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/energy-bills/data-for-charts`, {
        params: { numeroCliente: '12345' },
      });
    });

    expect(screen.getAllByText('Energia Elétrica')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Energia Compensada')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Total sem GD')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Economia GD')[0]).toBeInTheDocument();
  });
});
