import { combineReducers } from "redux";
import {
  initState,
  BOOKGETTING,
  GETBOOKFAILED,
  GETBOOKSUCCEEDED,
} from "../actions";

export const fetchBook = (state, action) => {
  switch (action.type) {
    case BOOKGETTING:
      return { ...state, isLoading: true };
    case GETBOOKSUCCEEDED:
      return { ...state, books: action.books, isLoading: false, error: false };
    case GETBOOKFAILED:
      return {
        ...state,
        error: true,
        isLoading: false,
        message: action.message,
      };
  }
};

export const initState = {
  fetchBook: initBook,
};

export const reducer = combineReducers({
  fetchBook,
});

export default rootReducer = (state = initState, action) =>
  reducer(state, action);
