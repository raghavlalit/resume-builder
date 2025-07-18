import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ResumeBuilder from './pages/ResumeBuilder';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedAdminRoute, { AdminLoginRoute } from './admin/ProtectedAdminRoute';
import AdminManagement from './admin/AdminManagement';
import UserManagement from './admin/UserManagement';
import UserResumeView from './admin/UserResumeView';
import TemplateList from './admin/templates/TemplateList';
import AddTemplate from './admin/templates/AddTemplate';
import EditTemplate from './admin/templates/EditTemplate';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const navigate = useNavigate();

  // Breadcrumbs for admin pages
  let adminBreadcrumbs = null;
  if (isAdminRoute && location.pathname !== '/admin/dashboard') {
    const pathnames = location.pathname.split('/').filter(x => x);
    const crumbs = [];
    let path = '';
    for (let i = 0; i < pathnames.length; i++) {
      path += '/' + pathnames[i];
      if (i === 0) continue; // skip 'admin'
      const label = pathnames[i].charAt(0).toUpperCase() + pathnames[i].slice(1);
      crumbs.push(
        <Button key={path} color="inherit" onClick={() => navigate(path)} size="small">
          {label}
        </Button>
      );
    }
    
    // Check if this is a detail page (has parameters or specific detail routes)
    const isDetailPage = location.pathname.includes('/users/') || 
                        location.pathname.includes('/admins/') ||
                        location.pathname.includes('/templates/') ||
                        location.pathname.includes('/add') ||
                        location.pathname.includes('/edit');
    
    adminBreadcrumbs = (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        margin: '16px 0 8px 0'
      }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" onClick={() => navigate('/admin/dashboard')} size="small">Home</Button>
          {crumbs}
        </Breadcrumbs>
        {isDetailPage && (
          <Button 
            startIcon={<NavigateBeforeIcon />} 
            onClick={() => navigate(-1)} 
            size="small" 
            variant="outlined"
          >
            Back
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/resume-builder" 
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin" element={
            <AdminLoginRoute>
              <AdminLogin />
            </AdminLoginRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <AdminDashboard breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/admins" element={
            <ProtectedAdminRoute>
              <AdminManagement breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedAdminRoute>
              <UserManagement breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/users/:userId" element={
            <ProtectedAdminRoute>
              <UserResumeView breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/templates" element={
            <ProtectedAdminRoute>
              <TemplateList breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/templates/add" element={
            <ProtectedAdminRoute>
              <AddTemplate breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/templates/edit/:templateId" element={
            <ProtectedAdminRoute>
              <EditTemplate breadcrumbs={adminBreadcrumbs} />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
