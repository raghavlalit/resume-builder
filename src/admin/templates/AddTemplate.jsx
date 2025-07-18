import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Paper, Snackbar, Alert, Grid, Divider
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createTemplate } from '../../utils/api';
import AdminLayout from '../AdminLayout';
import HtmlEditor from './HtmlEditor';

const AddTemplate = ({ breadcrumbs }) => {
  const [formData, setFormData] = useState({
    template_name: '',
    template_description: '',
    template_html: '',
    template_css: '',
    category: 'Professional',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTemplate(formData);
      setSnackbar({ open: true, message: 'Template created successfully', severity: 'success' });
      setTimeout(() => navigate('/admin/templates'), 1500);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create template', severity: error });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          {/* Header Section */}
          <Box sx={{ mb:4 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight="bold">
              Create New Resume Template
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add a new resume template with custom HTML and CSS styling
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Template Name"
                name="template_name"
                value={formData.template_name}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              
              <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                <InputLabel>Category</InputLabel>
                <Select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  label="Category"
                >
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Creative">Creative</MenuItem>
                  <MenuItem value="Modern">Modern</MenuItem>
                  <MenuItem value="Classic">Classic</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                <InputLabel>Status</InputLabel>
                <Select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Description"
                name="template_description"
                value={formData.template_description}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                helperText="Brief description of the template's design and purpose"
              />
              
              <HtmlEditor
                label="HTML Template"
                name="template_html"
                value={formData.template_html}
                onChange={handleChange}
                required
                helperText="Enter the HTML structure for the resume template. Use placeholders like {{name}}, {{email}}, etc."
              />
              
              <TextField
                fullWidth
                label="CSS Styles"
                name="template_css"
                value={formData.template_css}
                onChange={handleChange}
                multiline
                rows={8}
                variant="outlined"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: 'monospace' } }}
                helperText="Enter the CSS styles for the resume template"
              />
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/admin/templates')}
                  size="large"
                  sx={{ borderRadius: 2, px: 4, py: 1.5 }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<SaveIcon />} 
                  disabled={loading}
                  size="large"
                  sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 'bold' }}
                >
                  {loading ? 'Creating Template...' : 'Create Template'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
        
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
           {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AddTemplate; 