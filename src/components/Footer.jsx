import { Box, Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      px: 2, 
      mt: 'auto', 
      backgroundColor: (theme) => 
        theme.palette.mode === 'light' 
          ? theme.palette.grey[200] 
          : theme.palette.grey[800] 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Pharmacy CMS
            </Typography>
            <Typography variant="body2">
              Comprehensive pharmacy management system for modern healthcare providers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <MuiLink component={Link} to="/admin/prescriptions" color="inherit" underline="hover">
                  <ListItemText primary="Prescription Validation" />
                </MuiLink>
              </ListItem>
              <ListItem disablePadding>
                <MuiLink component={Link} to="/inventory" color="inherit" underline="hover">
                  <ListItemText primary="Inventory Management" />
                </MuiLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              &nbsp;
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <MuiLink component={Link} to="/admin/orders" color="inherit" underline="hover">
                  <ListItemText primary="Order Management" />
                </MuiLink>
              </ListItem>
              <ListItem disablePadding>
                <MuiLink component={Link} to="/reports" color="inherit" underline="hover">
                  <ListItemText primary="Reports & Analytics" />
                </MuiLink>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Pharmacy CMS. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;