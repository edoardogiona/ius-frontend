import React, { useContext, useRef, useState } from "react";
import styles from "./Register.module.scss";
import backgroundImage from "../../assets/backgroundImage.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat";

export const Register = ({}) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Set and manage message for the user
  const [validation, setValidation] = useState("");

  // Retrieve user information for the form
  const inputs = useRef<any[]>([]);
  const addInputs = (el: any) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    if (inputs.current[3].value !== inputs.current[4].value) {
      setValidation("Passwords do not match");
      return;
    } else {
      const firstName = inputs.current[0].value;
      const lastName = inputs.current[1].value;
      const email = inputs.current[2].value;
      const pwd = inputs.current[3].value;
      const role = inputs.current[6].value;
      createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
          const userDocRef = doc(db, "users", userCredential.user.uid);

          // Utilisez setDoc pour définir les données du document
          return setDoc(userDocRef, {
            role: role,
            cv: "",
            firstName: firstName,
            lastName: lastName,
            birthdate: selectedDate,
          });
        })
        .then(() => {
          navigate("/myProfile");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setValidation("Email format invalid");
          } else if (error.code === "auth/invalid-already-in-use") {
            setValidation("Email already used");
          } else {
            console.error(error);
            setValidation("An error has occurred, try again!");
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className={styles.frontTitle}>ITS a match!</div>
        <div
          className={styles.container}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.formConatiner}>
            <div className={styles.title}>Registrati gratis!</div>
            <div className={styles.namesInputs}>
              <input
                  ref={addInputs}
                  type="text"
                  placeholder="Nome"
                  className={styles.input}
              />
              <input
                  ref={addInputs}
                  type="text"
                  placeholder="Cognome"
                  className={styles.input}
              />
            </div>
            <input
                ref={addInputs}
                type="text"
                placeholder="Indirizzo e-mail"
                className={styles.input}
            />
            <input
                ref={addInputs}
                type="password"
                placeholder="Password"
                className={styles.input}
            />
            <input
                ref={addInputs}
                type="password"
                placeholder="Ripeti password"
                className={styles.input}
            />
            <div className={styles.passwordText}>
              Use at least one letter and one numeral
            </div>
            <div ref={addInputs} className={styles.dateContainer}>
              <DatePicker
                  selected={selectedDate}
                  className={styles.datePicker}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                  placeholderText="Data di nascita"
              />
            </div>
            <select ref={addInputs} className={styles.input}>
              <option value="student">Studente</option>
              <option value="teacher">Fondazione ITS</option>
              <option value="company">Azienda</option>
            </select>
            <p> {validation} </p>
            <fieldset>
              <legend>Autorizzo il trattamento dei miei dati personali ai sensi del Dlgs 196 del 30 giugno 2003 e dell’art. 13 GDPR</legend>

              <div>
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">Acconsento</label>
              </div>

            </fieldset>
            <button type="submit" className={styles.button}>
              Registrati
            </button>
            <a href="/login" className={styles.link}>
              Ho già un account
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
