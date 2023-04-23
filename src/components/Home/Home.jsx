import React from 'react'
import Navbar from '../Navbar/Navbar'
import Contacts from '../Contacts/Contacts'
import Pagination from '../Pagination/Pagination'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'
const Home = () => {
  return (
    <>
    <ConfirmDelete/>
    <Navbar/>
    <Contacts/>
   
    <Pagination/>
    </>
    
  )
}

export default Home