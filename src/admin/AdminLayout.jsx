import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminNavigation from './AdminNavigation';
import { Toolbar, Box, CssBaseline } from '@mui/material';

const AdminLayout = ({ children, breadcrumbs }) => {
  return (
    <Box className="admin-app" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AdminHeader />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminNavigation />
        <Box sx={{ flexGrow:1, display: 'flex', flexDirection: 'column' }}>
          {breadcrumbs && <Box sx={{ px: 3, pt: 2 }}>{breadcrumbs}</Box>}
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
            {children}
          </Box>
        </Box>
      </Box>
      <AdminFooter />
    </Box>
  );
};

export default AdminLayout; 