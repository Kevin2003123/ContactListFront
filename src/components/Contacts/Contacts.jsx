import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Contact from '../Contact/Contact';
import styles from './Contacts.module.css';
import { getContacts } from '../../redux/action';

const Contacts = () => {
    const contacts = useSelector((state) => state.contacts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getContacts(1,"asc",'Id'));
      }, [dispatch]);


  return (
    <div className={styles.contacts}>

    

      <div className={styles.header}>
        <div className={styles.id}>ID</div>
        <div className={styles.name}>Name</div>
        <div className={styles.lastName}>Last Name</div>
        <div className={styles.cellphone}>Cellphone</div>
        <div className={styles.email}>Email</div>
        <div className={styles.actions}>Actions</div>
      </div>
      {contacts.map((contact,i) => (
        <Contact key={i} {...contact} />
      ))}


    </div>
  );
};

export default Contacts;