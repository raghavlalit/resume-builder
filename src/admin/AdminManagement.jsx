import React from 'react';
import AdminLayout from './AdminLayout';
import { getAdmins, createAdmin, updateAdmin, getAdminInfo, deleteAdmin } from '../utils/api';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Typography, Grid, Snackbar, Alert, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminManagement = ({ breadcrumbs }) => {
  const [admins, setAdmins] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Modal state
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = React.useState({});

  const fetchAdmins = async () => {
    setLoading(true);
    setError('');
    const res = await getAdmins();
    if (res.ok) {
      setAdmins((res.data.data && Array.isArray(res.data.data.admins)) ? res.data.data.admins : []);
    } else {
      setError(res.data.message || 'Failed to fetch admins');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAdmins();
  }, []);

  // Add Admin
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password) {
      setFormError({
        name: !form.name ? 'Name is required' : '',
        email: !form.email ? 'Email is required' : '',
        password: !form.password ? 'Password is required' : '',
      });
      return;
    }
    setFormError({});
    setLoading(true);
    const res = await createAdmin(form);
    if (res.ok) {
      setOpenAdd(false);
      setForm({ name: '', email: '', password: '' });
      setSuccess('Admin added successfully');
      fetchAdmins();
    } else {
      setError(res.data.message || 'Create failed');
    }
    setLoading(false);
  };

  // Edit Admin
  const handleEdit = async () => {
    if (!form.name || !form.email) {
      setFormError({
        name: !form.name ? 'Name is required' : '',
        email: !form.email ? 'Email is required' : '',
      });
      return;
    }
    setFormError({});
    setLoading(true);
    const res = await updateAdmin(selectedAdmin.admin_id, { name: form.name, email: form.email });
    if (res.ok) {
      setOpenEdit(false);
      setForm({ name: '', email: '', password: '' });
      setSelectedAdmin(null);
      setSuccess('Admin updated successfully');
      fetchAdmins();
    } else {
      setError(res.data.message || 'Update failed');
    }
    setLoading(false);
  };

  // Delete Admin
  const handleDelete = async (admin_id) => {
    if (!window.confirm('Delete this admin?')) return;
    setLoading(true);
    const res = await deleteAdmin(admin_id);
    if (res.ok) {
      setSuccess('Admin deleted successfully');
      fetchAdmins();
    } else {
      setError(res.data.message || 'Delete failed');
    }
    setLoading(false);
  };

  // Info Admin
  const handleInfo = async (admin_id) => {
    setLoading(true);
    const res = await getAdminInfo(admin_id);
    setLoading(false);
    if (res.ok) {
      setSelectedAdmin(res.data.data);
      setOpenInfo(true);
    } else {
      setError(res.data.message || 'Failed to fetch admin info');
    }
  };

  // Open Edit Modal
  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setForm({ name: admin.name, email: admin.email, password: '' });
    setOpenEdit(true);
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">Admin Management</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Snackbar open autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
        </Snackbar>}
        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
            Add Admin
          </Button>
        </Grid>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map(admin => (
                <TableRow key={admin.admin_id} hover>
                  <TableCell>{admin.admin_id}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => openEditModal(admin)}><EditIcon /></IconButton>
                    <IconButton color="info" onClick={() => handleInfo(admin.admin_id)}><InfoIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(admin.admin_id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Admin Modal */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogContent>
            <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} error={!!formError.name} helperText={formError.name} />
            <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} error={!!formError.email} helperText={formError.email} />
            <TextField label="Password" type="password" fullWidth margin="normal" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} error={!!formError.password} helperText={formError.password} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Admin Modal */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogContent>
            <TextField label="Name" fullWidth margin="normal" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} error={!!formError.name} helperText={formError.name} />
            <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} error={!!formError.email} helperText={formError.email} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleEdit} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Info Modal */}
        <Dialog open={openInfo} onClose={() => setOpenInfo(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Admin Info</DialogTitle>
          <DialogContent>
            {selectedAdmin && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2"><b>ID:</b> {selectedAdmin.admin_id}</Typography>
                <Typography variant="subtitle2"><b>Name:</b> {selectedAdmin.name}</Typography>
                <Typography variant="subtitle2"><b>Email:</b> {selectedAdmin.email}</Typography>
                <Typography variant="subtitle2"><b>Status:</b> {selectedAdmin.status}</Typography>
                <Typography variant="subtitle2"><b>Added:</b> {selectedAdmin.added_date}</Typography>
                <Typography variant="subtitle2"><b>Updated:</b> {selectedAdmin.updated_date || '-'}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInfo(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminManagement; 