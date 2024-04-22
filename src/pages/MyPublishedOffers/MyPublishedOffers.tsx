import React, { useEffect, useState, useContext } from "react";
import styles from "./MyPublishedOffers.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../Navbar";
import type { JobOffer } from "../../types/Job.type";
import { getMyPublishedOffers } from "../../services/getMyPublishedOffers";
import { UserContext } from "../../context/userContext";

export const MyPublishedOffers = ({}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<JobOffer[]>();
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useContext(UserContext);

  const handleOfferOnClick = (offer) => {
    navigate(`/myPublishedOffers/${offer}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offers: JobOffer[] = await getMyPublishedOffers(currentUser.uid);
        setData(offers);
        console.log(offers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}> Le mie offerte di lavoro</div>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Cerca per Job Title"
            className={styles.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className={styles.customTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Job Description</th>
              <th>Numero Candidati</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                ?.filter((offer) =>
                  offer.description
                    .toLowerCase()
                    .startsWith(searchTerm.toLowerCase())
                )
                .map((val, key) => (
                  <tr key={key}>
                    <td onClick={() => handleOfferOnClick(val.description)}>
                      {val.description}
                    </td>
                    <td>{val.applicants?.length}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
