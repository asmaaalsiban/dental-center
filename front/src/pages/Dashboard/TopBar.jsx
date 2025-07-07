/** @format */
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
const drawerWidth = 240;
function TopBar({ open, handleDrawerOpen }) {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='end'
          sx={[
            {
              marginRight: 5,
              alignItems: "start",
            },
            open && { display: "none" },
          ]}>
          <MenuIcon />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ textAlign: "start" }}>
            لوحة التحكم
          </Typography>
          <Typography variant='h6' noWrap component='div'>
            <Link to='/' style={{ color: "white" }}>
              العودة الى الموقع
            </Link>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
