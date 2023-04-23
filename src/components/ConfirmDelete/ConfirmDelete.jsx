import React,{useEffect, useState} from 'react';
import styles from './ConfirmDelete.module.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {dysplayModal} from "../../redux/action"
import conectionString from '../../conection/conection';
const ConfirmDelete = () => {
    const hide = useSelector((state) => state.displayModal)
    const deleteId = useSelector((state)=> state.deleteId)
    const dispatch = useDispatch();


    const acceptHandler = async()=>{
        try {
            const { data } = await axios.delete(`${conectionString.Db}/contact/${deleteId}`);

        } catch (error) {
            console.log(error.message)
        }
        dispatch(dysplayModal(0,false))
        window.location.reload();
    }

    const cancelHandler =()=>{
        dispatch(dysplayModal(0,false))
    }
    
  return (
    <div className={`${styles.container} ${!hide? styles.display : ""}`}>
    <div className={`${styles.modal} ${!hide? styles.display : ""}`}>
      <p className={styles.message}>Are you sure you want to delete contact {deleteId} ? </p>
      <div className={styles.buttons}>
        <button className={styles.acceptButton} onClick={acceptHandler}>Accept</button>
        <button className={styles.cancelButton} onClick={cancelHandler}>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default ConfirmDelete;