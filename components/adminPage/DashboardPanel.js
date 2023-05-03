import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import axios from "axios";
import { ListItems } from "./ListItems.js";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: teal[800],
    },
  },
});

const DashboardContent = ({ window, children, orders }) => {
  const router = useRouter();

  const qtyOfPendingOrders = orders
    .map((order) => order.status === "Pending")
    .filter(Boolean).length;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogOut = async () => {
    const response = await axios("/api/auth/logout");

    if (response.status === 200) {
      router.push("/login");
    }
  };

  const drawer = (
    <Box sx={{ height: "auto" }}>
      <DrawerHeader></DrawerHeader>
      <Divider />
      <List component="nav">
        <ListItems qty={qtyOfPendingOrders} />
      </List>
      <Divider />
    </Box>
  );

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              Logo
            </Typography>
            <Button
              className="logOut-btn"
              sx={{ color: "#fff", borderColor: "#fff" }}
              variant="outlined"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "auto",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 11, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default function DashboardPanel({ orders, children }) {
  return <DashboardContent orders={orders}>{children}</DashboardContent>;
}
