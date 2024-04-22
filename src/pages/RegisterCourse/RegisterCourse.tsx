import React, { ChangeEvent, useState, useContext } from "react";
import Select from "react-select";
import styles from "./RegisterCourse.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CourseCreation } from "../../types/Course.type";
import { registerCourse } from "../../services/registerCourse";


export const RegisterCourse = ({}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [offers, setJobOffers] = useState<
    { target: string; value: string }[] | null
  >(null);
  const [duration, setDuration] = useState<string>("");
  const [opportunities, setOpportunities] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");



  const { currentUser } = useContext(UserContext);


  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleOpportunitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpportunities(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };
  const handleJobOffersChange = (
    selectedOptions: any,
    _actionMeta: { action: string }
  ) => {
    if (selectedOptions) {
      setJobOffers(selectedOptions);
    }
  };

  const options = [
    { value: "data_engineer", label: "Data engineer" },
    { value: "computer_scientist", label: "Computer scientist" },
    { value: "back_dev", label: "Back-end developer" },
  ];

  const handleSubmit = async () => {
    if (title && description && offers && opportunities && duration) {
      const newCourse: CourseCreation = {
        title,
        description,
        offers: offers.map((option) => option.value),
        teacherId: currentUser.uid,
        opportunities,
        duration,
      };
      await registerCourse(newCourse);
      navigate("/myPublishedOffers");
    } else setError("All fields must be fullfiled");
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.title}>Register a new course</div>

      <div className={styles.containerByTwo}>
        <div className="containerByTwo">
          <div className={styles.leftContainer}>
            {
              /* Contenu du conteneur de gauche */

              <div className={styles.namesInputs}>
                <div>
                  <label className={styles.header}>Title:</label>
                  <br />
                  <input type="text" 
                  className={styles.input}
                  onChange={handleTitleChange}
                   />

                </div>

                <div>
                  <label className={styles.header}>Duration (h):</label>
                  <br />
                  <input type="text" 
                  onChange={handleDurationChange}
                  className={styles.input} />
                </div>

                <div>
                  <label className={styles.header}>
                    Associated Job Offers:
                  </label>
                  <br />
                  <Select
                    options={options}
                    isMulti={true} // Activer la sélection multiple
                    onChange={handleJobOffersChange}
                  />
                </div>
                <br />

                <div>
                  <label className={styles.header}>Career opportunities:</label>
                  <br />
                  <input type="text" 
                  className={styles.input}
                  onChange={handleOpportunitiesChange}
                   />
                </div>
              </div>
            }
          </div>
        </div>
        <div className={styles.rightContainer}>
          <label className={styles.header}>Description:</label>
          <br />
          <input
            //rows={30}
            //cols={60}
            placeholder={"Write here"} 
            onChange={handleDescriptionChange}
            className={styles.textarea}
          />
        </div>
        <div>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.buttonTopRight} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};
