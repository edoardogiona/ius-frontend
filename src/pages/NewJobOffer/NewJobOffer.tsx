import React, { ChangeEvent, useState, useContext } from "react";
import Select from "react-select";
import styles from "./NewJobOffer.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../Navbar";
import { createJobOffer } from "../../services/createJobOffer";
import { UserContext } from "../../context/userContext";
import { JobOfferCreation } from "../../types/Job.type";
import { useNavigate } from "react-router-dom";

export const NewOffer = ({}) => {
  const [description, setDescription] = useState<string>("");
  const [courses, setCourse] = useState<
    { target: string; value: string }[] | null
  >(null);
  const [dateInit, setDateInit] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [hours, setHours] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleDateIniChange = (date: Date) => {
    setDateInit(date);
  };
  const handleDateEndChange = (date: Date) => {
    setDateEnd(date);
  };
  const { currentUser } = useContext(UserContext);

  const options = [
    { value: "efficienza_energetica", label: "Efficienza energetica" },
    { value: "mobilita_sostenibile", label: "Mobilità sostenibile" },
    { value: "nuove_tec_vita", label: "Nuove tecnologie della vita" },
    { value: "nuove_tec_MiI", label: "Nuove tecnologie per il Made in Italy" },
    { value: "tec_inn_turismo", label: "Tecnologie innovative per i beni e le attività culturali (turismo)" },
    { value: "tec_inn_ICT", label: "Tecnologie della informazione e della comunicazionea" },
  ];
  const offerta = [
    { value: "tempo_determinato", label: "Tempo Determinato" },
    { value: "tempo_indeterminato", label: "Tempo Indeterminato" },
  ];

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleCourseChange = (
    selectedOptions: any,
    _actionMeta: { action: string }
  ) => {
    if (selectedOptions) {
      setCourse(selectedOptions);
    }
  };

  const handleHoursChange = (
      selectedOptions: any,
      _actionMeta: { action: string }
  ) => {
    if (selectedOptions) {
      setHours(selectedOptions);
    }
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Agrega un cero al mes si es necesario
    const day = String(date.getDate()).padStart(2, "0"); // Agrega un cero al día si es necesario
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (dateInit && dateEnd && dateInit > dateEnd)
      setError("Errore - La data di fine non può essere precedente alla data di inizio");
    else if (description && courses && dateInit && dateEnd && hours && salary) {
      const newJob: JobOfferCreation = {
        description,
        courses: courses.map((option) => option.value),
        companyId: currentUser.uid,
        dateInit: formatDate(dateInit),
        dateEnd: formatDate(dateEnd),
        hours,
        salary,
      };
      await createJobOffer(newJob);
      navigate("/myPublishedOffers");
    } else setError("All fields must be fullfiled");
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.container}>
        <div className={styles.new_container}>
          <div className={styles.title}>Inserisci una nuova offerta di lavoro</div>
          Descrizione Ruolo
          <div className={styles.namesInputs}>
            <input
                type="text"
                className={styles.input}
                onChange={handleDescriptionChange}
            />
          </div>
          <label>Ambito ITS</label>
          <div>
            <Select
                options={options}
                isMulti={true}
                onChange={handleCourseChange}
            />
            <a href="/" className={styles.link}>
              Non trovi l'ambito che desideri? Chiedilo!
            </a>
          </div>
          <br/>
          <label>Data di inizio</label>
          <br/>
          <div>
            <div className={styles.dateContainer}>
              <DatePicker
                  selected={dateInit}
                  className={styles.datePicker}
                  onChange={handleDateIniChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Start"
              />
            </div>
            <div className={styles.dateContainer}>
              <DatePicker
                  selected={dateEnd}
                  className={styles.datePicker}
                  onChange={handleDateEndChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="End"
              />
            </div>
          </div>
          <br/>
          <div className={styles.namesInputs}>
            <label>Tipologia Contratto</label>
            <br/>
            <Select
                options={offerta}
                isMulti={true}
                onChange={handleHoursChange}
            />
          </div>
          <br/>
          <label>Offerta Economica € (RAL)</label>
          <br/>
          <input
              type="text"
              className={styles.input}
              onChange={handleSalaryChange}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} onClick={handleSubmit}>
          Pubblica
        </button>
      </div>
    </>
  );
};
