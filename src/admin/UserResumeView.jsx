import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../utils/api';
import { Box, Typography, Grid, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, CircularProgress, Alert } from '@mui/material';
import AdminLayout from './AdminLayout';

const UserResumeView = ({ breadcrumbs }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      const res = await getUserInfo(userId);
      if (res.ok && res.data.data && res.data.data.user) {
        setUser(res.data.data.user);
      } else {
        setError(res.data.message || 'Failed to fetch user info');
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <AdminLayout breadcrumbs={breadcrumbs}><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}><CircularProgress /></Box></AdminLayout>;
  }
  if (error) {
    return <AdminLayout breadcrumbs={breadcrumbs}><Alert severity="error">{error}</Alert></AdminLayout>;
  }
  if (!user) return null;

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 2, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography variant="h4" gutterBottom>{user.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{user.email} | {user.phone}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{user.status} | Added: {user.added_date}</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Date of Birth:</Typography>
              <Typography>{user.date_of_birth}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Gender:</Typography>
              <Typography>{user.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Current Salary:</Typography>
              <Typography>{user.current_salary}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Zipcode:</Typography>
              <Typography>{user.zipcode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Address:</Typography>
              <Typography>{user.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2">Country:</Typography>
              <Typography>{user.country}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2">State:</Typography>
              <Typography>{user.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2">City:</Typography>
              <Typography>{user.city}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Skills */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>Skills</Typography>
          {user.skills && user.skills.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {user.skills.map((s, i) => (
                <Chip key={i} label={s.skill} color="primary" />
              ))}
            </Box>
          ) : <Typography color="text.secondary">No skills listed.</Typography>}
        </Paper>

        {/* Education */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>Education</Typography>
          {user.education && user.education.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Degree</TableCell>
                    <TableCell>Institute</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>CGPA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.education.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.degree}</TableCell>
                      <TableCell>{e.institute}</TableCell>
                      <TableCell>{e.start_date}</TableCell>
                      <TableCell>{e.end_date}</TableCell>
                      <TableCell>{e.percentage}</TableCell>
                      <TableCell>{e.cgpa || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : <Typography color="text.secondary">No education listed.</Typography>}
        </Paper>

        {/* Experience */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>Experience</Typography>
          {user.experience && user.experience.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Current Job</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.experience.map((ex, i) => (
                    <TableRow key={i}>
                      <TableCell>{ex.company_name}</TableCell>
                      <TableCell>{ex.job_title}</TableCell>
                      <TableCell>{ex.is_current_job ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{ex.start_date}</TableCell>
                      <TableCell>{ex.end_date === '0000-00-00 00:00:00' ? '-' : ex.end_date}</TableCell>
                      <TableCell>{ex.country}</TableCell>
                      <TableCell>{ex.state}</TableCell>
                      <TableCell>{ex.city || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : <Typography color="text.secondary">No experience listed.</Typography>}
        </Paper>

        {/* Resumes */}
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>Resumes</Typography>
          {user.resumes && user.resumes.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Resume Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Added</TableCell>
                    <TableCell>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.resumes.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.resume_name}</TableCell>
                      <TableCell>{r.status}</TableCell>
                      <TableCell>{r.added_date}</TableCell>
                      <TableCell>{r.updated_date || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : <Typography color="text.secondary">No resumes found.</Typography>}
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default UserResumeView; 