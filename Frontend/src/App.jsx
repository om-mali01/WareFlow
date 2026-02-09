import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import Sidebar from './components/sideBar';
import ParticleBackground from './components/ParticleBackground';
import Login from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/updateProduct';
import UpdateInventoryForm from './pages/updateInventory';

// Protected route wrapper - checks for auth token
const ProtectedRoute = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
};

// Main app layout with sidebar
const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-cyber-dark cyber-grid-bg">
      <ParticleBackground />
      <div className="scan-line-overlay" />
      <Sidebar />
      <main className="flex-1 ml-[260px] transition-all duration-300 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected routes with sidebar layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/update-inventory" element={<UpdateInventoryForm />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
