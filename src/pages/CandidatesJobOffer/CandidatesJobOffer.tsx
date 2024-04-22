import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../Navbar";
import styles from "./CandidatesJobOffer.module.scss";
import { CandidateInfo } from "./CandidateInfo/CandidateInfo";

type Candidate = {
  name: string;
  age: number;
  profileImage: string;
};

const candidates: Candidate[] = [
  {
    name: "John Doe",
    age: 25,
    profileImage:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  },
  {
    name: "Jane Doe",
    age: 30,
    profileImage:
      "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg",
  },
];

export const CandidatesJobOffer = () => {
  const { title } = useParams<{ title: string }>();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.candidatesContainer}>
        {candidates.map((candidate) => (
          <CandidateInfo candidate={candidate} />
        ))}
      </div>
    </>
  );
};
