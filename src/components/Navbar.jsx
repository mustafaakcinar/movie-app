import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthContext } from "../context/AuthProvider";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { userLogOut, currentUser } = useAuthContext();

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

const handleLoginMenu = () => {
  navigate("/login")
  handleMenuClose()
}

const handleRegisterMenu = () => {
  navigate("/register")
  handleMenuClose()
}

const handleMobileLoginMenu = () =>
{
  navigate("/login")
  handleMenuClose()
}

const handleMobileRegisterMenu = () =>
  {
    navigate("/login")
    handleMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // tıklama eventine iki farklı işlev vereceğimiz için bu şekilde birleştirdik tek eventi iki kere kullanıp iki farklı işlev veremeyiz
  const handleLogOut = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    userLogOut();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser ? (
        <>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleLoginMenu}>Login</MenuItem>
          <MenuItem onClick={handleRegisterMenu}>Register</MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser ? (
        <>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundColor:"black"
      }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            POSEIDON TV-SERIES MOVIES
          </Typography>
          <Typography
            sx={{
              ml: 2,
            }}
          >
            {currentUser?.displayName}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(e) => handleProfileMenuOpen(e)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(e) => handleMobileMenuOpen(e)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );
}
