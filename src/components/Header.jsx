import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pharmacy CMS
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/admin/prescriptions">Prescriptions</Button>
          <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
          <Button color="inherit" component={Link} to="/admin/orders">Orders</Button>
          <Button color="inherit" component={Link} to="/admin/sales">Reports</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;