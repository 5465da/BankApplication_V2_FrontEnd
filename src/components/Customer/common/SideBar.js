import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import "./css/SideBar.css"

const paymentListItems = (
  <div>
    <ListItem button className="overviewText">
      <ListItemIcon>
        <HomeIcon className="blackColIcon" />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItem>
    <ListSubheader className="navSubHeader">PAYMENT</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PhoneIphoneIcon className="whiteColIcon" />
      </ListItemIcon>
      <ListItemText primary="Mobile Bills" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SyncAltIcon className="whiteColIcon" />
      </ListItemIcon>
      <ListItemText primary="Transfer Money" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon className="whiteColIcon" />
      </ListItemIcon>
      <ListItemText primary="Pay Tax" />
    </ListItem>
  </div>
);

const serviceListItems = (
  <div>
    <ListSubheader className="navSubHeader">SERVICE</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CreditCardIcon className="whiteColIcon" />
      </ListItemIcon>
      <ListItemText primary="Apply for Credit Card" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NotificationsIcon className="whiteColIcon" />
      </ListItemIcon>
      <ListItemText primary="Credit Card Status" />
    </ListItem>
  </div>
);

export default function SideBar() {
  return (
      <Drawer
        variant="permanent"
        classes={{
          paper: "drawerPaperx",
        }}
      >
        <Typography component="p" variant="h6" className="digiBankText">
          Optimum DigiBank
        </Typography>
        <List>{paymentListItems}</List>
        <Divider />
        <List>{serviceListItems}</List>
      </Drawer>
  );
}
