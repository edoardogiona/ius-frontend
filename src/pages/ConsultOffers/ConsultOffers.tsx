import React from "react";
import styles from "./ConsultOffers.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../Navbar";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const data = [
  { title: "Assistant", nb_candidates: 40, company: "Marc&Co" },
  { title: "IT Project Manager", nb_candidates: 39, company: "Tuttofare" },
  { title: "Computer scientist", nb_candidates: 25, company: "Amazon" },
  { title: "Product owner", nb_candidates: 19, company: "Liberta" },
  { title: "Back-end developer", nb_candidates: 89, company: "Altne" },
  { title: "Marketing manager", nb_candidates: 8, company: "Google" },
];

const options = [
  { value: "data_engineer", label: "Data engineer" },
  { value: "computer_scientist", label: "Computer scientist" },
  { value: "back_dev", label: "Back-end developer" },
];

export const ConsultOffers = ({}) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}>Le mie offerte di lavoro</div>

      <div className={styles.container}>
        {/* <input
          type="text"
          placeholder="Search by offer title"
          className={styles.input}
        /> */}
        <div className={styles.headerContainer}>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Cerca per Job Title"
              className={styles.input}
            />
          </div>
          <div className={styles.type}>
            <Select options={options} placeholder="Type" />
          </div>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.tables}>
            <table>
              <tr className={styles.tableHeader}>
                <th>Job title</th>
                <th>Company</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.title}</td>
                    <td>{val.company}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
