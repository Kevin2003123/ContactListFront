import axios from "axios";
import {

  
  CHANGE_PAGE,
  GET_CONTACTS,
  SEARCH_CONTACTS,
  NEXT_CONTACTS,
  DYSPLAY_MODAL
} from "./types";

import conectionString from "../conection/conection";



export const nextContacts =(PageNumber,SearchTerm,Order, OrderBy)=>{
  return async (dispatch) => { // Devuelve la función asíncrona que se ejecuta dentro de nextContacts
    try {
      let url;
      if(SearchTerm){
        url = `${conectionString.Db}/contact/search?PageNumber=${PageNumber+1}&SearchTerm=${SearchTerm}&Order=${Order}&OrderBy=${OrderBy}`;
      }else{
        url = `${conectionString.Db}/contact/page?PageNumber=${PageNumber+1}&Order=${Order}&OrderBy=${OrderBy}`;
      }
      const { data } = await axios.get(url);
      return dispatch({
        type: NEXT_CONTACTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };  
}

export const getContacts = (PageNumber,Order, OrderBy) => {
  return async (dispatch) => { 
    try {
      const { data } = await axios.get(`${conectionString.Db}/contact/page?PageNumber=${PageNumber}&Order=${Order}&OrderBy=${OrderBy}`);
      
      dispatch({
        type: GET_CONTACTS,
        payload: data,
      });

      dispatch(nextContacts(PageNumber,'',Order, OrderBy)); 
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchContacts = (PageNumber,SearchTerm,Order, OrderBy) => {
  return async (dispatch) => { 
    try {
      const { data } = await axios.get(`${conectionString.Db}/contact/search?PageNumber=${PageNumber}&SearchTerm=${SearchTerm}&Order=${Order}&OrderBy=${OrderBy}`);
      
      dispatch({
        type: SEARCH_CONTACTS,
        payload: data,
      });

      dispatch(nextContacts(PageNumber,SearchTerm,Order, OrderBy)); 
    } catch (error) {
      console.log(error.message);
    }
  };
};



export const changePage = (page) => {
  return { type: CHANGE_PAGE, payload: page };
};


export const dysplayModal = (id, hide) => {
  return { type: DYSPLAY_MODAL, payload: {id,hide} };
};