import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
import Link from "next/link";

export function ListItems({ qty }) {
  return (
    <React.Fragment>
      <Link href={"/admin/dashboard"}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link href={"/admin/list/orders"}>
        <ListItemButton>
          <ListItemIcon>
            <Badge badgeContent={qty} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>

      {/* <Link href={"/admin/list/customers"}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
      </Link>

      <Link href={"/admin/list/reports"}>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </Link> */}
    </React.Fragment>
  );
}
