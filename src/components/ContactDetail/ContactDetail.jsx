import React,{useEffect, useState} from 'react';
import styles from './ContactDetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import conectionString from '../../conection/conection';
const ContactDetail = () => {
    const { id } = useParams();
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cellphone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfRegistration, setDateOfRegistration] = useState('')


    const getContact= async(id) =>{
        try {
            const { data } = await axios.get(`${conectionString.Db}/contact/${id}`);
            return data
        } catch (err) {
            console.log(err.message)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const { name, lastName, cellphone, email, dateOfRegistration } = await getContact(id);
              setName(name);
              setLastName(lastName);
              setPhone(cellphone);
              setEmail(email);
              setDateOfRegistration(dateOfRegistration)
            } catch (error) {
              console.log(error);
            }
        };
      
        fetchData();
      }, [id]);

      const formatDate = (dateString) => {
        if(dateString){
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);}
        else return ""
      }

  return (
    <div className={styles.firstContainer}>
    <div className={styles.container}>
      <h2>Contact Detail</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>Cellphone:</td>
            <td>{cellphone}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Date of Registration:</td>
            <td>{formatDate(dateOfRegistration)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ContactDetail;