import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getTemplates, deleteTemplate } from '../../utils/api';
import AdminLayout from '../AdminLayout';

const categoryColors = {
  Professional: 'primary',
  Creative: 'secondary',
  Modern: 'success',
  Classic: 'info',
};

const statusColors = {
  Active: 'success',
  Inactive: 'default',
};

const TemplateList = ({ breadcrumbs }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await getTemplates();
      setTemplates(response.data?.data?.templates || []);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch templates', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => navigate('/admin/templates/add');
  const handleEdit = (id) => navigate(`/admin/templates/edit/${id}`);
  const handleDeleteClick = (template) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      await deleteTemplate(templateToDelete.template_id);
      setSnackbar({ open: true, message: 'Template deleted successfully', severity: 'success' });
      fetchTemplates();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete template', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">Resume Templates</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Add Template
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Added Date</TableCell>
                <TableCell>Updated Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Loading...</TableCell>
                </TableRow>
              ) : templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">No templates found</TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow key={template.template_id} hover>
                    <TableCell>{template.template_name}</TableCell>
                    <TableCell>{template.template_description}</TableCell>
                    <TableCell>
                      <Chip label={template.category} color={categoryColors[template.category] || 'default'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={template.status} color={statusColors[template.status] || 'default'} size="small" />
                    </TableCell>
                    <TableCell>{template.added_date ? new Date(template.added_date).toLocaleString() : ''}</TableCell>
                    <TableCell>{template.updated_date ? new Date(template.updated_date).toLocaleString() : ''}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(template.template_id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteClick(template)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Template</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the template "{templateToDelete?.template_name}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default TemplateList; 