import React from "react";
import styles from "./CandidateInfo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

type Candidate = {
  name: string;
  age: number;
  profileImage: string;
};

export const CandidateInfo = ({ candidate }: { candidate: Candidate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.candidateInfoContainer}>
        <img
          src={candidate.profileImage}
          alt={`${candidate.name}'s profile`}
          className={styles.profileImage}
        />
        <div className={styles.candidateInfo}>
          <div className={styles.candidateName}>
            {`${candidate.name}, ${candidate.age} years`}
          </div>
          <div className={styles.download}>
            <FontAwesomeIcon
              icon={faDownload}
              className={styles.downloadIcon}
            />
            <div>Download curriculum</div>
          </div>
        </div>
      </div>
      <button className={styles.buttonSelect}>Select candidate</button>
    </div>
  );
};
