import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People as PeopleIcon, 
  AdminPanelSettings as AdminIcon,
  Description as TemplateIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Admins', icon: <AdminIcon />, path: '/admin/admins' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Templates', icon: <TemplateIcon />, path: '/admin/templates' },
  ];

  return (
    <Paper sx={{ width: 240, minHeight: '100vh', borderRadius: 0 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: (theme) => theme.palette.primary.light
                },
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.light
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? (theme) => theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  color: location.pathname === item.path ? (theme) => theme.palette.primary.main : 'inherit',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminNavigation; 