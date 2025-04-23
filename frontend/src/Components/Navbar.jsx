import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Navbar({user}) {
  console.log("User prop:", user);
  const [name, setName] = useState(user);
  console.log("User prop:", name); // or empty string or null when logged out
  const [open, setOpen] = useState(false); // Dialog open state


  useEffect(() => {
    console.log("User prop:", user);
    setName(user);
  }, [user]);

  console.log("name here>>>",name)
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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/saved">
            Saved
          </Button>
          {name ? (
            // If user is logged in, show name and add a click handler to sign out
            <Button color="inherit" onClick={handleSignOutClick}>
              {name}
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

    {/* Sign-out confirmation dialog */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign Out</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to sign out?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignOut} color="secondary">
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
}
