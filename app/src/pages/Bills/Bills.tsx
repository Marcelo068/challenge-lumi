import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Pagination,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  CloudDownload as DownloadIcon,
  Event as EventIcon,
  MonetizationOn as MonetizationIcon
} from '@mui/icons-material';

import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';

interface Item {
  id: string;
  numeroCliente: string;
  numeroInstalacao: string;
  mesReferencia: string;
  dataEmissao: string;
  vencimento: string;
  totalPagar: string;
  fileName: string;
}

const ITEMS_PER_PAGE = 10;

const Bills: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [clienteFilter, setClienteFilter] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const take = ITEMS_PER_PAGE;

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/energy-bills`, {
          params: {
            skip: skip,
            take: take,
            numeroCliente: clienteFilter
          }
        });

        setItems(response.data.data);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    fetchItems();
  }, [page, clienteFilter]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDownload = (filePath: string) => {
    if (!filePath) {
      console.error('Caminho do arquivo não fornecido.');
      return;
    }

    fetch(filePath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filePath.substring(filePath.lastIndexOf('/') + 1);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      })
      .catch(error => console.error('Erro ao baixar o arquivo:', error));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClienteFilter(event.target.value);
    setPage(1);
  };

  return (
    <MainLayout>
      <Box p={2} sx={{ marginBottom: 2 }}>
        <TextField
          label="Número do Cliente"
          variant="outlined"
          value={clienteFilter}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }} // Ajuste de espaçamento inferior
        />
        {items.length === 0 ? (
          <Typography variant="body1">Não há itens para exibir.</Typography>
        ) : (
          <>
            <List>
              {items.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <Card sx={{ width: '100%' }}>
                      <CardHeader
                        title={`Cliente: ${item.numeroCliente}`}
                        subheader={`Instalação: ${item.numeroInstalacao} - Mês: ${item.mesReferencia}`}
                        action={
                          <Tooltip title="Baixar Arquivo">
                            <IconButton
                              color="primary"
                              onClick={() => handleDownload(`${process.env.REACT_APP_API_URL}/files/${item.fileName}`)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon sx={{ mr: 1 }} fontSize="small" /> Data de Emissão: {item.dataEmissao}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon sx={{ mr: 1 }} fontSize="small" /> Vencimento: {item.vencimento}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationIcon sx={{ mr: 1 }} fontSize="small" /> Total a Pagar: {item.totalPagar}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            {totalItems > 0 && (
              <Pagination
                count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 2 }}
              />
            )}
          </>
        )}
      </Box>
    </MainLayout>
  );
};

export default Bills;
