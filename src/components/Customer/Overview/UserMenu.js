import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import './Overview.css';

const StyledMenu = withStyles({
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
}))(MenuItem);

export default function UserMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/Logout";
  }

  return (
    <div>
      <Button
        className="userMenuDd"
        aria-controls="UserMenu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
      <ListItemIcon className="userName">
        <AccountCircleIcon className="userMenuPerson"/>
         {props.name}
         <ArrowDropDownIcon className="userMenuArrow"/>
      </ListItemIcon>
      </Button>
      <StyledMenu
        id="UserMenu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Profile " />
            <PersonIcon fontSize="small" className="userMenuIcon"/>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Settings" />
            <SettingsIcon fontSize="small" className="userMenuIcon"/>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Logout" onClick={logout} />
            <MeetingRoomIcon fontSize="small" className="userMenuIcon" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
