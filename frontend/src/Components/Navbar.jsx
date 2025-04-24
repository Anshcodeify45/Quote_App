import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material';


const Nav = styled(AppBar)`
  background-color: #121212;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const AppTitle = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1.5px;
  margin-left: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #00e6e6;
  }
`;


const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`;

const NavLinks = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  & a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  & a:hover {
    color: #00e6e6;
  }

  & button {
    color: #ffffff;
    font-weight: 500;
    text-transform: none;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  & button:hover {
    color: #00e6e6;
  }
`;

const AppTitleWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;



export default function Navbar({user}) {

  const [name, setName] = useState(user);
 // or empty string or null when logged out
  const [open, setOpen] = useState(false); // Dialog open state


  useEffect(() => {
   
    setName(user);
  }, [user]);

  
  const handleSignOutClick = () => {
    setOpen(true); // Open the dialog
  };


  const handleSignOut = () => {
    setName(null); // Set user to null or empty to log out
    setOpen(false); // Close dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Nav position="static" elevation={4}>
        <StyledToolbar>
          <AppTitleWrapper>
            <AppTitle variant="h6">
              SoulLines
            </AppTitle>
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
          }
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
