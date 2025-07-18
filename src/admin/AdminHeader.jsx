import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <MenuBookIcon sx={{ mr: 2, fontSize: 32 }} />
        <Link component={RouterLink} to="/admin/dashboard" underline="none" color="inherit" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="span" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            EasyCVCraft
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: 18 }}>
            {JSON.parse(localStorage.getItem('admin'))?.name?.[0] || 'A'}
          </Avatar>
          <IconButton color="inherit" edge="end" aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader; 