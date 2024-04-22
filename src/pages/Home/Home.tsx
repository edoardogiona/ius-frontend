import React, { useState } from "react";
import styles from "./Home.module.scss";
import backgroundImage from "../../assets/backgroundImage.jpg";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const title = "Benvenuto in IUS - ITS a match!, \n il portale per scegliere il tuo futuro";
const textExplanation =
  "IUS - ITS a match! è un portale per connettere studenti di scuole superiori, diplomati, ITS e PMI. La nostra mission è fornire un'esperienza integrata per gli ITS e per giovani diplomati in cerca di lavoro, per indirizzarli verso un lavoro dopo un corso altamente professionalizzante.";

export const Home = ({}) => {
  
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className={styles.frontTitle}>ITS a match!</div>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.infoConatiner}>
          <div className={styles.title}>{title}</div>
          <div className={styles.title2}>{textExplanation}</div>
          <button className={styles.button} onClick={handleSignUpClick}>
            Sign up for free!
          </button>
          <a href="/login" className={styles.link}>
            I already have an account
          </a>
        </div>
      </div>
    </>
  );
};
