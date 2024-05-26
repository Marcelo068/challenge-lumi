import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
 
  return (
    <div className={styles.mainLayout}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#121621', // Cor da sidebar
            color: '#b3b9c6', // Cor padrão do texto
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List sx={{ padding: '10px' }}>
          <ListItem
            component={Link}
            to="/"
            sx={{
              color: location.pathname === '/' ? '#fff' : '#b3b9c6', // Cor do texto selecionado ou não
              backgroundColor: location.pathname === '/' ? '#635bff' : 'transparent', // Cor de fundo do item selecionado
              borderRadius: '8px', // Borda arredondada no canto direito
              margin: '10px 0px', // Margem superior e inferior
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            component={Link}
            to="/bills"
            sx={{
              color: location.pathname === '/bills' ? '#fff' : '#b3b9c6', // Cor do texto selecionado ou não
              backgroundColor: location.pathname === '/bills' ? '#635bff' : 'transparent', // Cor de fundo do item selecionado
              borderRadius: '8px', // Borda arredondada no canto direito
              margin: '10px 0px', // Margem superior e inferior
            }}
          >
            <ListItemText primary="Bills" />
          </ListItem>
        </List>
      </Drawer>
      <div className={styles.content}>
        <AppBar position="static" elevation={0} style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}>
          <Toolbar>
            <h2 style={{ color: '#333' }}>App Title</h2>
          </Toolbar>
        </AppBar>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
