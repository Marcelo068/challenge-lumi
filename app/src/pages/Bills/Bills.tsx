import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Pagination,
  Box
} from '@mui/material';

import MainLayout from '../../layouts/MainLayout';

interface Item {
  id: number;
  name: string;
}

const items: Item[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`
}));

const ITEMS_PER_PAGE = 10;

const Bills: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <MainLayout>

      <Box>
        <List>
          {paginatedItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Pagination
          count={Math.ceil(items.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </MainLayout>
  );
};

export default Bills;
