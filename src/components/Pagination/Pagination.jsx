import React, { useEffect, useState } from "react";
import s from "./Pagination.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/action.js";

const Pagination = () => {
  const nextContacts = useSelector((state) => state.nextContacts);
 
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(changePage(page));
  }, [page,dispatch]);



  const prevHandler = () => {
    if (page !== 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const nextHandler = () => {
    if (nextContacts.length>0) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={s.container}>
      <button className={s.prev} onClick={prevHandler}>
        &lt; Prev
      </button>
      <button className={s.next} onClick={nextHandler}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
