import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import styles from "./EditProfile.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { type UserInfo, Roles } from "../../types/User.type";
import { getUserInfo } from "../../services/getUserInfo";
import { UserContext } from "../../context/userContext";
import { updateUserInfo } from "../../services/updateUserInfo";

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [dateBirth, setDateBirth] = useState<string>("");
  const [role, setRole] = useState<Roles>(Roles.Student);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRole = async () => {
      const user: UserInfo = await getUserInfo(currentUser.uid);
      setName(user.firstName);
      setSurname(user.lastName);
      setDateBirth(user.birthDate);
      setRole(user.role);
    };

    fetchRole();
  }, [currentUser.uid]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleDateBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateBirth(e.target.value);
  };

  const handleEditProfileClick = async () => {
    await updateUserInfo({
      userId: currentUser.uid,
      newUserInfo: {
        firstName: name,
        lastName: surname,
        birthDate: dateBirth,
        role: role,
      },
    });
    navigate("/myProfile");
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.titleField}>Name:</div>
          <input
            type="text"
            className={styles.contentField}
            value={name}
            onChange={handleNameChange}
          />
          <div className={styles.titleField}>Last name:</div>
          <input
            type="text"
            className={styles.contentField}
            value={surname}
            onChange={handleSurnameChange}
          />
          <div className={styles.titleField}>Date Birth:</div>
          <input
            type="date"
            className={styles.contentFieldDate}
            value={dateBirth}
            onChange={handleDateBirthChange}
          />
        </div>
        <button className={styles.button} onClick={handleEditProfileClick}>
          Save Changes
        </button>
      </div>
    </>
  );
};
