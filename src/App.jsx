import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import Inventory from './pages/Inventory.jsx';
import AddEditProduct from './pages/AddEditProduct.jsx';
import Priscriptions from './pages/Prescriptions.jsx';
import PrescriptionDetails from './pages/PrescriptionDetails.jsx';
import SalesDashboard from './pages/Sales.jsx';
import OrderListPage from './pages/OrderListPage.jsx';
import OrderFormPage from './pages/OrderFromPage.jsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/prescription-validation" element={<PrescriptionValidation />} /> */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add" element={<AddEditProduct />} />
            <Route path="/inventory/edit/:id" element={<AddEditProduct />} />
            <Route path="/admin/prescriptions" element={<Priscriptions />} />
            <Route path="/admin/prescriptions/:id" element={<PrescriptionDetails />} />
            <Route path="/admin/sales" element={<SalesDashboard />} />
            <Route path="/admin/orders" element={<OrderListPage />} />
            <Route path="/admin/orders/edit/:id" element={<OrderFormPage />} />
            {/* <Route path="/reports" element={<Reports />} /> */}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;