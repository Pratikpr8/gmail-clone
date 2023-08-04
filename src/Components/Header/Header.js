import React from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Avatar, IconButton } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";

// mui component drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SidebarOption from "../SideBar/SidebarOption";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import NearMeIcon from "@mui/icons-material/NearMe";
import NoteIcon from "@mui/icons-material/Note";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import DuoIcon from "@mui/icons-material/Duo";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import { openSendMessage } from "../../features/mailSlice";

function Header() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={54}
          selected={true}
        />
        <SidebarOption Icon={StarIcon} title="Starred" number={54} />
        <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={54} />
        <SidebarOption
          Icon={LabelImportantIcon}
          title="Important"
          number={54}
        />
        <SidebarOption Icon={NearMeIcon} title="Sent" number={54} />
        <SidebarOption Icon={NoteIcon} title="Drafts" number={54} />
        <SidebarOption Icon={ExpandMoreIcon} title="More" number={54} />
        <div className="sidebar__footer">
          <div className="sidebar__footerIcons">
            <IconButton>
              <PersonIcon />
            </IconButton>
            <IconButton>
              <DuoIcon />
            </IconButton>
            <IconButton>
              <PhoneIcon />
            </IconButton>
          </div>
        </div>
      </List>
    </Box>
  );

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton className="header__leftBurger">
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </IconButton>
        <img
          src="https://th.bing.com/th/id/OIP.48fC0MnDnBVSuAXnHZNv4wAAAA?pid=ImgDet&rs=1"
          alt=""
        />
      </div>

      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDownIcon className="header__inputCaret" />
      </div>
      <div className="header__right">
        <IconButton className="header__rightSmall">
          <AppsIcon />
        </IconButton>
        <IconButton className="header__rightSmall">
          <NotificationsIcon />
        </IconButton>

        <Avatar
          className="avatarIcon"
          style={{ cursor: "pointer" }}
          src={user?.photoUrl}
          onClick={signOut}
        />
      </div>

      <Button
        className="sidebar__compose headerCompose"
        startIcon={<AddIcon fontSize="large" />}
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
    </div>
  );
}

export default Header;
