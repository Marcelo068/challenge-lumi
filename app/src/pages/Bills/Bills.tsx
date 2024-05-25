import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Pagination,
  Box
} from '@mui/material';
import axios from 'axios';

import MainLayout from '../../layouts/MainLayout';

interface Item {
  id: string;
  numeroCliente: string;
  mesReferencia: string;
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

  return (
    <MainLayout>
      <Box>
        <List>
          {items.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={`${item.numeroCliente} - ${item.mesReferencia}`} />
            </ListItem>
          ))}
        </List>
        <Pagination
          count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </MainLayout>
  );
};

export default Bills;
