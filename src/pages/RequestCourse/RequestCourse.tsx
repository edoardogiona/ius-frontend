import React, { ChangeEvent, useState, useContext } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './RequestCourse.module.scss';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/backgroundImage.jpg';
import DatePicker from "react-datepicker";
import { UserContext } from "../../context/userContext";
import "react-datepicker/dist/react-datepicker.css";
import { RequestOfCourse } from "../../types/Course.type";
import { Navbar } from '../../Navbar';
import { requestCourse } from "../../services/requestCourse";




export const RequestCourse = ({}) => {
  const [courseType, setCourseType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { currentUser } = useContext(UserContext);


  const handleCourseTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseType(e.target.value);
  };
  

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  
  const handleSubmit = async () => {
    if (courseType && description) {
      const requestaCourse: RequestOfCourse = {
        courseType,
        description,
        companyId: currentUser.uid,
      };
      await requestCourse(requestaCourse);
      navigate("/myPublishedOffers");
    } else setError("All fields must be fullfiled");
  };

  const options = [
    { value: "efficienza_energetica", label: "Efficienza energetica" },
    { value: "mobilita_sostenibile", label: "Mobilità sostenibile" },
    { value: "nuove_tec_vita", label: "Nuove tecnologie della vita" },
    { value: "nuove_tec_MiI", label: "Nuove tecnologie per il Made in Italy" },
    { value: "tec_inn_turismo", label: "Tecnologie innovative per i beni e le attività culturali (turismo)" },
    { value: "tec_inn_ICT", label: "Tecnologie della informazione e della comunicazionea" },
  ];

  return (

    <>
    <div><Navbar /></div>
    <div className={styles.title}>Richiedi l'attivazione di un nuovo corso ITS</div>

      <div className={styles.container}>
        <div className={styles.containerLarge}>


          <label className={styles.header}>Che tipo di corso vorresti vedere attivato?</label><br/>
          <div className={styles.namesInputs}>
            <input type="text" onChange={handleCourseTypeChange} className={styles.input}/>

          </div>

          <label className={styles.header}>In quale ambito ITS esistente?</label><br/>
          <div className={styles.namesInputs}>
            <Select
                options={options}
                isMulti={true}
            />

          </div>
          <br/>

          <div className={styles.rightContainer}>
            <label className={styles.header}>Descrizione:</label><br/>
            <input
                //rows={20}
                //cols={60}
                placeholder={"Write here"}
                className={styles.textarea}
                onChange={handleDescriptionChange}
            />
          </div>

        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} onClick={handleSubmit}>Richiedi</button>

      </div>
    </>
  );
};
