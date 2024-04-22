import React, { useContext, useState, useEffect } from "react";
import {
  MenuItemsStudent,
  MenuItemsCompany,
  MenuItemsTeacher,
} from "./menuItems";
import { Nav } from "react-bootstrap";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { getUserInfo } from "../services/getUserInfo";

import type { UserInfo } from "../types/User.type";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<any>([]);

  const handleNavbarClick = () => {
    navigate("/");
  };

  const currentURL = window.location.pathname;
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRole = async () => {
      const user: UserInfo = await getUserInfo(currentUser.uid);
      const role = user.role;
      if (role === "student") {
        setMenuItems(MenuItemsStudent);
      } else if (role === "teacher") {
        setMenuItems(MenuItemsTeacher);
      } else {
        setMenuItems(MenuItemsCompany);
      }
    };

    fetchRole();
  }, [currentUser.uid]);

  return (
    <Nav className={styles.NavbarItems}>
      <h1 className={styles.logo} onClick={handleNavbarClick}>
        ITS a Match!
      </h1>
      <div className={styles.menuIcon}></div>
      <ul className={styles["navbar-ul"]}>
        {menuItems?.map((item, index) => (
          <li key={index}>
            <a
              className={`${styles["nav-links"]} ${
                currentURL.includes(item.url) ? styles.activeLink : ""
              }`}
              href={item.url}
            >
              {item.Title}
            </a>
          </li>
        ))}
      </ul>
    </Nav>
  );
};
