
import styles from './Contact.module.css';
import { BsPencilSquare, BsEye,BsTrash } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {dysplayModal} from '../../redux/action'

const Contact = ({ id, name, lastName, cellphone, email, dateOfRegistration }) => {

  const dispatch = useDispatch(); 
  const history = useHistory();
  const updateHandler = ()=>{
    history.push(`/contactForm/${id}`)
  }

  const deleteHandler = ()=>{
    dispatch(dysplayModal(id, true))
  }

  const detailHandler = () =>{
    history.push(`/contactDetail/${id}`)
  }

  return (
    <div className={styles.contact}>
      <div className={styles.id}>{id}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.lastName}>{lastName}</div>
      <div className={styles.cellphone}>{cellphone}</div>
      <div className={styles.email}>{email}</div>
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={updateHandler}><BsPencilSquare /></button>
        <button className={styles.actionButton} onClick={detailHandler}><BsEye /></button>
        <button className={styles.actionButton} onClick={deleteHandler}><BsTrash /></button>
      </div>
    
    </div>
  );
};

export default Contact;