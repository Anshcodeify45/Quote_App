import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';

const Nav = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#121212',
  padding: '0.8rem 2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem 1rem',
  },
}));

const AppTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#ffffff',
  letterSpacing: '1.5px',
  marginLeft: '10px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#00e6e6',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    width: '100%',
  },

  '& a': {
    textDecoration: 'none',
    color: '#ffffff',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  },
  '& a:hover': {
    color: '#00e6e6',
  },
  '& button': {
    color: '#ffffff',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  '& button:hover': {
    color: '#00e6e6',
  },
}));

const AppTitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export default function Navbar({ user }) {
  const [name, setName] = useState(user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setName(user);
  }, [user]);

  const handleSignOutClick = () => {
    setOpen(true);
  };

  const handleSignOut = () => {
    setName(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav position="static" elevation={4}>
        <StyledToolbar>
          <AppTitleWrapper>
            <AppTitle variant="h6">SoulLines</AppTitle>
          </AppTitleWrapper>

          <NavLinks>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/saved">Drop</Button>
            {name ? (
              <Button onClick={handleSignOutClick}>{name}</Button>
            ) : (
              <Button component={Link} to="/login">Login</Button>
            )}
            <Button component={Link} to="/register">Register</Button>
          </NavLinks>
        </StyledToolbar>
      </Nav>

      {/* Sign-out confirmation dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>Sign Out</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to sign out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#00e6e6' }}>
            Cancel
          </Button>
          <Button onClick={handleSignOut} sx={{ color: '#f44336' }}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
