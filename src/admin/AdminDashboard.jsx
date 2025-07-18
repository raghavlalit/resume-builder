import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Description as TemplateIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  PersonAdd as PersonAddIcon,
  Description as TemplateAddIcon,
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getAdmins, getUsers, getTemplates } from '../utils/api';

const AdminDashboard = ({ breadcrumbs }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalUsers: 0,
    totalTemplates: 0,
    activeUsers: 0,
    activeTemplates: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [adminsRes, usersRes, templatesRes] = await Promise.all([
        getAdmins(),
        getUsers(),
        getTemplates()
      ]);

      const admins = adminsRes.data?.data?.admins || [];
      const users = usersRes.data?.data?.users || [];
      const templates = templatesRes.data?.data?.templates || [];

      setStats({
        totalAdmins: admins.length,
        totalUsers: users.length,
        totalTemplates: templates.length,
        activeUsers: users.filter(user => user.status === 'Active').length,
        activeTemplates: templates.filter(template => template.status === 'Active').length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        boxShadow: 2,
        '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: 6 } : {}
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: color, mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 64, height: 64 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: 2,
        boxShadow: 1,
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2, width: 48, height: 48 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  const RecentActivityItem = ({ title, description, time, type }) => (
    <ListItem sx={{ px: 0, py: 1.5 }}>
      <ListItemIcon>
        <Avatar sx={{ 
          bgcolor: type === 'admin' ? 'primary.main' : 
                   type === 'user' ? 'success.main' : 
                   type === 'template' ? 'warning.main' : 'info.main',
          width: 40, 
          height: 40 
        }}>
          {type === 'admin' ? <AdminIcon /> : 
           type === 'user' ? <PeopleIcon /> : 
           type === 'template' ? <TemplateIcon /> : <DashboardIcon />}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
        }
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <TimeIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" color="text.secondary">
              {time}
            </Typography>
          </Box>
        }
      />
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', minWidth: '120px' }}>
        {description}
      </Typography>
    </ListItem>
  );

  if (loading) {
    return (
      <AdminLayout breadcrumbs={breadcrumbs}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography variant="h6">Loading dashboard...</Typography>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Box sx={{ p: 4, maxWidth: '1400px', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's an overview of your resume builder platform.
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Admins"
              value={stats.totalAdmins}
              icon={<AdminIcon />}
              color="primary.main"
              onClick={() => navigate('/admin/admins')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon />}
              color="success.main"
              onClick={() => navigate('/admin/users')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<TrendingUpIcon />}
              color="info.main"
              onClick={() => navigate('/admin/users')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Templates"
              value={stats.totalTemplates}
              icon={<TemplateIcon />}
              color="warning.main"
              onClick={() => navigate('/admin/templates')}
            />
          </Grid>
        </Grid>

        {/* Quick Actions and Recent Activity */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Quick Actions */}
          <Grid item xs={12} lg={7}>
            <Paper sx={{ p: 4, height: '100%', borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold" sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <QuickActionCard
                    title="Add Admin"
                    description="Create a new admin account"
                    icon={<PersonAddIcon />}
                    color="primary.main"
                    onClick={() => navigate('/admin/admins')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <QuickActionCard
                    title="Add Template"
                    description="Create a new resume template"
                    icon={<TemplateAddIcon />}
                    color="warning.main"
                    onClick={() => navigate('/admin/templates/add')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <QuickActionCard
                    title="Manage Users"
                    description="View and manage user accounts"
                    icon={<PeopleIcon />}
                    color="success.main"
                    onClick={() => navigate('/admin/users')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <QuickActionCard
                    title="View Templates"
                    description="Browse and edit templates"
                    icon={<TemplateIcon />}
                    color="info.main"
                    onClick={() => navigate('/admin/templates')}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} lg={5}>
            <Paper sx={{ p: 4, height: '100%', borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold" sx={{ mb: 3 }}>
                Recent Activity
              </Typography>
              <List sx={{ pt: 0 }}>
                <RecentActivityItem
                  title="Template Updated"
                  description="Professional template modified"
                  time="2 hours ago"
                  type="template"
                />
                <Divider sx={{ my: 1 }} />
                <RecentActivityItem
                  title="New User Registered"
                  description="john.doe@example.com"
                  time="4 hours ago"
                  type="user"
                />
                <Divider sx={{ my: 1 }} />
                <RecentActivityItem
                  title="Admin Login"
                  description="Admin panel accessed"
                  time="6 hours ago"
                  type="admin"
                />
                <Divider sx={{ my: 1 }} />
                <RecentActivityItem
                  title="Template Created"
                  description="Modern template added"
                  time="1 day ago"
                  type="template"
                />
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Platform Overview */}
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold" sx={{ mb: 4 }}>
            Platform Overview
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                  User Statistics
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  <Chip 
                    label={`${stats.activeUsers} Active Users`} 
                    color="success" 
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                  <Chip 
                    label={`${stats.totalUsers - stats.activeUsers} Inactive Users`} 
                    color="default" 
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary.main">
                  Template Statistics
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  <Chip 
                    label={`${stats.activeTemplates} Active Templates`} 
                    color="warning" 
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                  <Chip 
                    label={`${stats.totalTemplates - stats.activeTemplates} Inactive Templates`} 
                    color="default" 
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard; 