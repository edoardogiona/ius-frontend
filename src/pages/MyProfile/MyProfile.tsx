import React, { useContext, useEffect, useState } from "react";
import styles from "./MyProfile.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { UserContext } from "../../context/userContext";
import { UserInfo } from "../../types/User.type";
import { getUserInfo } from "../../services/getUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const MyProfile = ({}) => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/editProfile");
  };
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    const fetchRole = async () => {
      const user: UserInfo = await getUserInfo(currentUser.uid);
      setUser(user);
    };

    fetchRole();
  }, [currentUser.uid]);

  console.log(user);

  return (
    <>
      <Navbar />
      <div className={styles.mainCointainer}>
        <div className={styles.container}>
          <div className={styles.titleField}>Name:</div>
          <div className={styles.contentField}>{user?.firstName}</div>
          <div className={styles.titleField}>Last name:</div>
          <div className={styles.contentField}>{user?.lastName}</div>
          <div className={styles.titleField}>DateBirth:</div>
          <div className={styles.contentFieldDate}>{user?.birthDate}</div>
        </div>
        <button className={styles.button} onClick={handleEditProfileClick}>
          Edit Profile
        </button>
        <div className={styles.logoutContainer}>
          <FontAwesomeIcon icon={faRightToBracket} />
          <a href="/" className={styles.link}>
            Log out
          </a>
        </div>
      </div>
    </>
  );
};
