import ListNav from "./ListNav";
import { useState } from "react";
import {
    faUser,
    faRss,
    faComments,
    faPen,
    faSearch,
    faBell,
    faCog
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const navigationItems = [
    { order: 1, path: "/profile", label: "Profile", icon: faUser, subItems: [] },
    { order: 2, path: "/feed", label: "Feed", icon: faRss, subItems: [] },
    { order: 3, path: "/post", label: "Post", icon: faPen, subItems: [] },
    { order: 4, path: "/", label: "Explore", icon: faSearch, subItems: [] },
    { order: 5, path: "/chats", label: "Chats", icon: faComments, subItems: [] },
    { order: 6, path: "/notifications", label: "Notifications", icon: faBell, subItems: [] },
    { order: 7, path: "/setting", label: "Settings", icon: faCog, subItems: [] },
];

const NavBar = ({ authorized = 0 }) => {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <ListNav navigationItems={navigationItems} authorized={!!user} />
    );
}

export default NavBar;
