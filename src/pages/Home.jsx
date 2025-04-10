// Update your Home.jsx to include low stock notifications
import { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Alert,
  AlertTitle,
  Collapse,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function Home() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Fetch low stock products
    const fetchLowStockProducts = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/cms/low-stock');
        const data = await response.json();
        setLowStockProducts(data);
      } catch (error) {
        console.error('Error fetching low stock products:', error);
      }
    };
    fetchLowStockProducts();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Collapse in={showAlert}>
            <Alert
              severity="warning"
              sx={{ mb: 3 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Low Stock Alert</AlertTitle>
              {lowStockProducts.length} product(s) are running low on stock.
              <Button
                color="inherit"
                size="small"
                component={Link}
                to="/inventory"
                sx={{ ml: 1 }}
              >
                View Inventory
              </Button>
            </Alert>
          </Collapse>
        )}

        <Box textAlign="center" my={5}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box textAlign="center" my={5}>
              <Typography variant="h3" gutterBottom>
                Pharmacy Management System
              </Typography>
              <Typography variant="h5" paragraph>
                Comprehensive solution for your pharmacy operations
              </Typography>
              <Button variant="contained" color="primary" size="large" component={Link} to="/orders" sx={{ mt: 3 }}>
                Get Started
              </Button>
            </Box>

            {/* Features Section */}
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Prescription Validation
                  </Typography>
                  <Typography paragraph>
                    Approve or reject orders based on prescription validity and doctor authorization.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/admin/prescriptions">
                    Manage Prescriptions
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Inventory Management
                  </Typography>
                  <Typography paragraph>
                    Track stock levels, receive alerts for low inventory, and manage suppliers.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/inventory">
                    View Inventory
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Order Management
                  </Typography>
                  <Typography paragraph>
                    View and manage pending, shipped, and delivered orders with tracking.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/orders">
                    Manage Orders
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Reports & Analytics
                  </Typography>
                  <Typography paragraph>
                    Track user engagement, sales trends, and business performance metrics.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/reports">
                    View Reports
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default Home;