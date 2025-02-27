import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Logout, AccountCircle } from "@mui/icons-material";

const Profile = ({ username, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 36, height: 36 }}>{username?.charAt(0).toUpperCase()}</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <AccountCircle sx={{ marginRight: 1 }} />
          <Typography variant="body1">{username}</Typography>
        </MenuItem>
        <MenuItem  onClick={() => {
            handleClose(); 
            onLogout(); 
          }}>
          <Logout sx={{ marginRight: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
