import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Pagination,
  Box,
  Button,
  Typography
} from '@mui/material';
import axios from 'axios';

import MainLayout from '../../layouts/MainLayout';

interface Item {
  id: string;
  numeroCliente: string;
  mesReferencia: string;
  fileName: string; // Adicionando filePath ao Item para o caminho do arquivo
}

const ITEMS_PER_PAGE = 10;

const Bills: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchItems = async () => {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const take = ITEMS_PER_PAGE;

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/energy-bills`, {
          params: {
            skip: skip,
            take: take
          }
        });

        setItems(response.data.data);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    fetchItems();
  }, [page]);

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
        downloadLink.download = filePath.substring(filePath.lastIndexOf('/') + 1); // Extrai o nome do arquivo do caminho
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      })
      .catch(error => console.error('Erro ao baixar o arquivo:', error));
  };

  return (
    <MainLayout>
      <Box>
        {items.length === 0 ? (
          <Typography variant="body1">Não há itens para exibir.</Typography>
        ) : (
          <>
            <List>
              {items.map(item => (
                <ListItem key={item.id}>
                  <ListItemText primary={`${item.numeroCliente} - ${item.mesReferencia}`} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownload(`${process.env.REACT_APP_API_URL}/files/${item.fileName}`)}
                  >
                    Baixar Arquivo
                  </Button>
                </ListItem>
              ))}
            </List>
            {totalItems > 0 && (
              <Pagination
                count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            )}
          </>
        )}
      </Box>
    </MainLayout>
  );
};

export default Bills;
