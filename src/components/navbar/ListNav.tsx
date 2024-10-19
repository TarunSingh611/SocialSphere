"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Logoutconfirm from "@/components/logout/LogoutConfirm";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { setAuthModal } from "@/redux/slicers/authSlice";
import style from "./navbar.module.css";

const ListNav = ({navigationItems, authorized}: {navigationItems: any , authorized: boolean}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [signInConfirm, setSignInConfirm] = useState(false);
    const [submenuVisible, setSubmenuVisible] = useState({}); // State to handle submenu visibility
    const authModal = useSelector((state: any) => state.auth.modal);
    const dispatch = useDispatch();

    const handleLogout = () => {
        setLogoutConfirm(true);
    };

    const handleLogin = () => {
        setSignInConfirm(true)
        dispatch(setAuthModal('login'));
    };

    const toggleSubmenu = (path: any) => {
        setSubmenuVisible((prevState) => ({
            ...prevState,
            [path]: !prevState[path],
        }));
    };

    useEffect(() => {
        if (authModal) {
            setSignInConfirm(true);
        }else{
            setSignInConfirm(false);
        }    
    }, [authModal]);

    return (
        <nav className="relative transition-all duration-300 mb-0 mt-auto">
            <ul className={`
                flex flex-row space-x-2 py-1 mx-2
                overflow-x-auto whitespace-nowrap
                scrollbar-hide
                overflow-y-hidden
                -webkit-overflow-scrolling
                -webkit-overflow-scrolling-auto
                -webkit-overflow-scrolling-touch
                sm:mx-0 sm:flex-col sm:py-4 sm:my-8
            `}>
                {navigationItems?.map((item: any) => (
                    <li
                        key={item?.path}
                        className={`inline-block ${style.liNav} ${pathname === item?.path ? `${style.selected}` : ``}`}
                    >
                        <div
                            className={`${style.tabHN} flex items-center py-3 px-3 space-x-2 whitespace-nowrap`}
                            onClick={() => {
                                if (pathname !== item?.path) router.push(item?.path);
                            }}
                        >
                            {<FontAwesomeIcon icon={item?.icon} className={style.iconSize} />}
                           <span className="hidden md:block">{item.label}</span>
                            {item?.subItems?.length ? (
                                <FontAwesomeIcon
                                    icon={submenuVisible[item?.path] ? faChevronUp : faChevronDown}
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        if (item?.subItems) {
                                            toggleSubmenu(item?.path);
                                        } else if (pathname !== item?.path) {
                                            router.push(item?.path);
                                        }
                                    }}
                                    className={style.iconSize}
                                />
                            ) : ""}
                        </div>
                        {item?.subItems && submenuVisible[item?.path] && (
                            <ul className={`${style.submenu} absolute left-0 right-0 mt-2`}>
                                {item.subItems.map((subItem: any) => (
                                    <li
                                        key={subItem?.path}
                                        className={`{${style.liNav} ${pathname === subItem?.path ? `${style.selected}` : ``}`}
                                        onClick={() => {
                                            if (pathname !== subItem?.path) router.push(subItem?.path);
                                        }}
                                    >
                                        <div className={`${style.tabHN} flex items-center py-3 px-3 space-x-2`}>
                                            {<FontAwesomeIcon icon={subItem?.icon} className={style.iconSize} />}
                                            <span className="hidden md:block">{subItem.label}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
                {authorized ? (
                    <li className={`inline-block ${logoutConfirm ? `${style.liNavLogoutSelected}` : `${style.liNav}`}`}>
                        <div className={`${style.tabHN} flex items-center py-3 px-3 space-x-2`} onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className={style.iconSize} />
                            <span className="hidden md:block">LogOut</span>
                        </div>
                    </li>
                ) : (
                    <li className={`inline-block ${signInConfirm ? `${style.liNavSignInSelected}` : `${style.liNav}`}`}>
                        <div className={`${style.tabHN} flex items-center py-3 px-3 space-x-2`} onClick={handleLogin}>
                            <FontAwesomeIcon icon={faSignInAlt} className={style.iconSize} />
                            <span className="hidden md:block">SignIn</span>
                        </div>
                    </li>
                )}
            </ul>
            {logoutConfirm && (
                <Logoutconfirm onClose={() => setLogoutConfirm(false)} />
            )}
        </nav>
    );
};

export default ListNav;
