import {
  CHANGE_PAGE,
  GET_CONTACTS,
  SEARCH_CONTACTS,
  NEXT_CONTACTS,
  DYSPLAY_MODAL,
} from "./types";

const initialState = {
  contacts: [],
  page: 1,
  nextContacts: [],
  deleteId: 0,
  displayModal: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS:
      return { ...state, contacts: payload };

    case SEARCH_CONTACTS:
      return { ...state, contacts: payload };

    case NEXT_CONTACTS:
      return { ...state, nextContacts: payload };

    case DYSPLAY_MODAL:
      return { ...state, displayModal: payload.hide, deleteId: payload.id };

    case CHANGE_PAGE:
      return { ...state, page: payload };
    default:
      return state;
  }
};

export default rootReducer;
