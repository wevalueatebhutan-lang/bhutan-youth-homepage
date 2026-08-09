import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import IconicCenter from './pages/IconicCenter/IconicCenter';
import Programs from './pages/Programs/Programs';
import Community from './pages/Community/Community';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes wrapped in shared Layout (Header + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/iconic-center" element={<IconicCenter />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/community" element={<Community />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
