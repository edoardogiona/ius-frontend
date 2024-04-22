import React, { useRef, useState } from "react";
import styles from "./Login.module.scss";
import backgroundImage from "../../assets/backgroundImage.jpg";
import "react-datepicker/dist/react-datepicker.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export const Login = ({}) => {
  const navigate = useNavigate();

  // Set and manage message for the user
  const [validation, setValidation] = useState("");

  // Retrieve user information for the form
  const inputs = useRef<any[]>([]);
  const addInputs = (el: any) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const email = inputs.current[0].value;
    const pwd = inputs.current[1].value;
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        navigate("/myProfile");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setValidation("Email format invalid");
        } else {
          setValidation("email or password incorrect, try again!");
        }
      });
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
            <p>{validation}</p>
            <button className={styles.button} type={"submit"}>
              Login
            </button>
            <a href="/register" className={styles.link}>
              I do not have an account
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
