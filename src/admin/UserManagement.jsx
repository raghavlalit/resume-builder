import React from 'react';
import AdminLayout from './AdminLayout';
import { getUsers, updateUserStatus, deleteUser } from '../utils/api';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Typography, Snackbar, Alert, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const UserManagement = ({ breadcrumbs }) => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // Modal state
  const [openStatus, setOpenStatus] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [statusValue, setStatusValue] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    const res = await getUsers();
    if (res.ok) {
      setUsers((res.data.data && Array.isArray(res.data.data.users)) ? res.data.data.users : []);
    } else {
      setError(res.data.message || 'Failed to fetch users');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  // Update Status
  const handleUpdateStatus = async () => {
    if (!statusValue) {
      setFormError('Status is required');
      return;
    }
    setFormError('');
    setLoading(true);
    const res = await updateUserStatus(selectedUser.user_id, statusValue);
    if (res.ok) {
      setOpenStatus(false);
      setSelectedUser(null);
      setStatusValue('');
      setSuccess('User status updated successfully');
      fetchUsers();
    } else {
      setError(res.data.message || 'Update status failed');
    }
    setLoading(false);
  };

  // Delete User
  const handleDelete = async (user_id) => {
    if (!window.confirm('Delete this user?')) return;
    setLoading(true);
    const res = await deleteUser(user_id);
    if (res.ok) {
      setSuccess('User deleted successfully');
      fetchUsers();
    } else {
      setError(res.data.message || 'Delete failed');
    }
    setLoading(false);
  };

  // Open Status Modal
  const openStatusModal = (user) => {
    setSelectedUser(user);
    setStatusValue(user.status || '');
    setFormError('');
    setOpenStatus(true);
  };

  // View Resume
  const handleViewResume = (user_id) => {
    navigate(`/admin/users/${user_id}`);
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary.main">User Management</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Snackbar open autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>{success}</Alert>
        </Snackbar>}
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
              {users.map(user => (
                <TableRow key={user.user_id} hover>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => openStatusModal(user)}><EditIcon /></IconButton>
                    <IconButton color="info" onClick={() => handleViewResume(user.user_id)}><VisibilityIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user.user_id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Update Status Modal */}
        <Dialog open={openStatus} onClose={() => setOpenStatus(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Update User Status</DialogTitle>
          <DialogContent>
            <TextField label="Status" fullWidth margin="normal" value={statusValue} onChange={e => setStatusValue(e.target.value)} error={!!formError} helperText={formError} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStatus(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatus} variant="contained" color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default UserManagement; 