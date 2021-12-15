import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import TerminalIcon from '@mui/icons-material/Terminal';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/dashboard/user">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to="/dashboard/scooter">
    <ListItem button>
      <ListItemIcon>
        <ElectricScooterIcon />
      </ListItemIcon>
      <ListItemText primary="Scooters" />
    </ListItem>
  </Link>
  <Link to="/dashboard/location">
    <ListItem button>
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Locations" />
    </ListItem>
  </Link>
  </div>
);
