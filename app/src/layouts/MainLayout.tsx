import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.css';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WorkIcon from '@mui/icons-material/Work';

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
            backgroundColor: '#121621', 
            color: '#b3b9c6', 
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
            <WorkIcon sx={{ fontSize: '2rem', marginRight: '10px', color: '#b3b9c6' }} /> 
            <h2 style={{ color: '#b3b9c6', fontSize: '1.2rem' }}>Projeto</h2>
          </div>
        </Toolbar>
        <Divider sx={{ backgroundColor: '#b3b9c6', marginBottom: '10px' }} />
        <List sx={{ padding: '10px' }}>
          <ListItem
            component={Link}
            to="/"
            sx={{
              color: location.pathname === '/' ? '#fff' : '#b3b9c6',
              backgroundColor: location.pathname === '/' ? '#635bff' : 'transparent',
              borderRadius: '8px',
              margin: '10px 0px',
            }}
          >
            <DashboardIcon sx={{ marginRight: '10px' }} /> 
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            component={Link}
            to="/bills"
            sx={{
              color: location.pathname === '/bills' ? '#fff' : '#b3b9c6',
              backgroundColor: location.pathname === '/bills' ? '#635bff' : 'transparent',
              borderRadius: '8px',
              margin: '10px 0px',
            }}
          >
            <ReceiptIcon sx={{ marginRight: '10px' }} />
            <ListItemText primary="Bills" />
          </ListItem>
        </List>
      </Drawer>
      <div className={styles.content}>
        <AppBar position="static" elevation={0} style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}>
          <Toolbar>
            <h2 style={{ color: '#333' }}>Painel Administrativo</h2>
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
