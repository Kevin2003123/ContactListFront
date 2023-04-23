import React, { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import fluentValidator from "fluent-validator";
import conectionString from "../../conection/conection";
const ContactForm = () => {
  const { id } = useParams();
  const status = Number.isNaN(Number(id));
  const history = useHistory();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cellphone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nameValidate, setNameValidate] = useState("");
  const [lastNameValidate, setLastNameValidate] = useState("");
  const [cellphoneValidate, setPhoneValidate] = useState("");
  const [emailValidate, setEmailValidate] = useState("");

  const getContact = async (id) => {
    try {
      const { data } = await axios.get(`${conectionString.Db}/contact/${id}`);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!status) {
        try {
          const { name, lastName, cellphone, email } = await getContact(id);
          setName(name);
          setLastName(lastName);
          setPhone(cellphone);
          setEmail(email);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id, status]);

  const validation = (name, lastName, cellphone, email) => {
    let validation = fluentValidator()
      .validate(name)
      .isAlpha()
      .isNotEmpty()
      .isNotNull()
      .isNotUndefined()
      .validate(lastName)
      .isAlpha()
      .isNotEmpty()
      .isNotNull()
      .isNotUndefined()
      .validate(cellphone)
      .isNotEmpty()
      .matches(/^[\+\(]?[0-9\-\(\)\s]{9,}[0-9]$/)
      .isNotNull()
      .isNotUndefined()
      .validate(email)
      .isNotEmpty()
      .isNotNull()
      .isNotUndefined()
      .isEmail()
      .check();

    return validation;
  };

  const inputHandler = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'lastName') {
      setLastName(e.target.value);
    }
    if (e.target.name === 'cellphone') {
      setPhone(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };
  
  useEffect(() => {
    if (!fluentValidator().validate(name).isAlpha().isNotEmpty().isNotNull().isNotUndefined().check()) {
      setNameValidate('Please enter a valid name');
    } else {
      setNameValidate('');
    }
  
    if (!fluentValidator().validate(lastName).isAlpha().isNotEmpty().isNotNull().isNotUndefined().check()) {
      setLastNameValidate('Please enter a valid last name');
    } else {
      setLastNameValidate('');
    }
  
    if (!fluentValidator().validate(cellphone).isNotEmpty().matches(/^[\+\(]?[0-9\-\(\)\s]{9,}[0-9]$/).isNotNull().isNotUndefined().check()) {
      setPhoneValidate('Please enter a valid cellphone');
    } else {
      setPhoneValidate('');
    }
  
    if (!fluentValidator().validate(email).isNotEmpty().isNotNull().isNotUndefined().isEmail().check()) {
      setEmailValidate('Please enter a valid email');
    } else {
      setEmailValidate('');
    }
  }, [name, lastName, cellphone, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let validate = validation(name, lastName, cellphone, email);

      if (status && validate) {
        const { data } = await axios.post(`${conectionString.Db}/contact`, {
          name,
          lastName,
          cellphone,
          email,
        });
        if (data === true) {
          history.push("/");
        }
      } else if (validate) {
        const { data } = await axios.put(`${conectionString.Db}/contact`, {
          id: Number(id),
          name,
          lastName,
          cellphone,
          email,
        });
        if (data === true) {
          history.push("/");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.contactFormContainer}>
        <h1>{status ? "Create New Contact" : "Update Contact"}</h1>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <label>
            First Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={inputHandler}
              placeholder="Enter First Name"
              className={styles.inputField}
            />
          </label>
          <span>{nameValidate}</span>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={inputHandler}
              placeholder="Enter Last Name"
              className={styles.inputField}
            />
          </label>
          <span>{lastNameValidate}</span>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              name="cellphone"
              value={cellphone}
              onChange={inputHandler}
              placeholder="Enter Phone Number"
              className={styles.inputField}
            />
          </label>
          <span>{cellphoneValidate}</span>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={inputHandler}
              placeholder="Enter Email"
              className={styles.inputField}
            />
          </label>
          <span>{emailValidate}</span>
          <br />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
