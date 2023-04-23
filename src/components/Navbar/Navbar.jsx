import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import React,{useState, useEffect} from 'react';
import { getContacts, searchContacts} from '../../redux/action';
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
    const page = useSelector((state) => state.page);
    const dispatch = useDispatch();
    const[search,setSearch] = useState('')
    const[filter, setfilter] = useState(false)
    useEffect(() => {
        const sort = document.getElementById('sort').value
        const order = document.getElementById('order').value
        if(filter)dispatch(searchContacts(page,search,order,sort))
        else dispatch(getContacts(page,order,sort))
      }, [page,dispatch,filter,search]);
    
    
    const sortHandler = (e)=>{
        const sort = e.target.value;
        const order = document.getElementById('order').value
        dispatch(getContacts(1,order,sort))
        setSearch('')
        setfilter(false)
    }

    const orderHandler = (e)=>{
        const order = e.target.value;
        const sort = document.getElementById('sort').value
        dispatch(getContacts(1,order,sort))
        setSearch('')
        setfilter(false)
    }


    const inputHandler =(e)=>{
        setSearch(e.target.value)
    }
    const searchHandler = (e)=>{
        setfilter(true)
        const sort = document.getElementById('sort').value
        const order = document.getElementById('order').value
        dispatch(searchContacts(1,search,order,sort))
    }


  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Contact List</div>
      <div className={styles.select}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={sortHandler}>
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className={styles.select}>
        <label htmlFor="order">Order:</label>
        <select id="order" onChange={orderHandler}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div className={styles.searchBar}>
        <input type="text" value={search} placeholder="Search bar" onChange={inputHandler}/>
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/contactForm/create">
          <button className={styles.newButton}>New Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;