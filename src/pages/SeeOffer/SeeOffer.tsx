import React from "react";
import styles from "./SeeOffer.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../Navbar/Navbar";
import Select from "react-select";



const options = [
  { value: "data_engineer", label: "Data engineer" },
  { value: "computer_scientist", label: "Computer scientist" },
  { value: "back_dev", label: "Back-end developer" },
];

export const SeeOffer = ({}) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}> See offer</div>

      <div className={styles.container}>
        <label className={styles.header}>Computer Engineer - Amazon </label>
        <br />
        <br />
        <br />
        <div>
          <label className={styles.header2}>Skills required</label>
          <br />
          Fluent english, project management, communication, teamwork spirit
        </div>
        <br />
        <br />
        <div>
          <label className={styles.header2}>Courses to follow</label>
          <br />
          Software engineering, Computer ethics
        </div>{" "}
        <br />
        <br />
        <div>
          <label className={styles.header2}>About the job offer</label>
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <br />
        <br />
        <button className={styles.button}>Apply</button>
      </div>
    </>
  );
};
