import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AdminFooter = () => {
  return (
    <Box sx={{ bgcolor: 'grey.100', py: 2, textAlign: 'center', mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </Typography>
    </Box>
  );
};

export default AdminFooter; 