import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import BarChartIcon from "@mui/icons-material/BarChart";
import ClassIcon from '@mui/icons-material/Class';
import LanIcon from "@mui/icons-material/Lan";
import { Link } from "react-router-dom";

export const adminMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="users" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Users" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <Link to="categories" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DynamicFormIcon />
      </ListItemIcon>
      <Link to="courses" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Courses" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </React.Fragment>
);

export const userMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="users" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Users" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <Link to="categories" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DynamicFormIcon />
      </ListItemIcon>
      <Link to="courses" style={{ textDecoration: "none", color: "black" }}>
        <ListItemText primary="Courses" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);
