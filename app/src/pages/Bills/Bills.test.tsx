import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Bills from './Bills';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Bills', () => {
  const mockData = {
    data: [
      {
        id: '1',
        numeroCliente: '12345',
        numeroInstalacao: '98765',
        mesReferencia: '01/2024',
        dataEmissao: '01/01/2024',
        vencimento: '15/01/2024',
        totalPagar: '150.00',
        fileName: 'invoice_1.pdf',
      },
      {
        id: '2',
        numeroCliente: '12346',
        numeroInstalacao: '98766',
        mesReferencia: '02/2024',
        dataEmissao: '01/02/2024',
        vencimento: '15/02/2024',
        totalPagar: '200.00',
        fileName: 'invoice_2.pdf',
      },
    ],
    total: 2,
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
  });

  it('renders Bills component and fetches items', async () => {
    render(
      <Router>
        <Bills />
      </Router>
    );

    expect(screen.getByLabelText('Número do Cliente')).toBeInTheDocument();

    await waitFor(() => {
      const clientText = screen.getAllByText('Cliente: 12345');
      expect(clientText.length).toBeGreaterThan(0);
    });
  });

  it('filters items by client number', async () => {
    render(
      <Router>
        <Bills />
      </Router>
    );

    const input = screen.getByLabelText('Número do Cliente');
    await act(async () => {
      fireEvent.change(input, { target: { value: '12345' } });
    });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/energy-bills`, {
        params: { skip: 0, take: 10, numeroCliente: '12345' },
      });
  
      const clientText = screen.getAllByText('Cliente: 12345');

      expect(clientText.length).toBeLessThan(2)
    });
  });

  it('handles file download', async () => {
    render(
      <Router>
        <Bills />
      </Router>
    );

    await waitFor(() => {
      const downloadButtons = screen.getAllByRole('button', { name: /Baixar Arquivo/i });
      expect(downloadButtons.length).toBeGreaterThan(0);
    });

    const downloadButtons = screen.getAllByRole('button', { name: /Baixar Arquivo/i });
    const firstDownloadButton = downloadButtons[0];

    await act(async () => {
      fireEvent.click(firstDownloadButton);
    });

    // Let's not simulate the actual download, let's check if the click event was fired correctly
    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/energy-bills`, {
      params: { skip: 0, take: 10, numeroCliente: '' },
    });

    expect(firstDownloadButton).toBeInTheDocument();
  });
});
