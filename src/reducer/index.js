import { combineReducers } from "redux";
import {
  initBook,
  BOOK_GETTING,
  GET_BOOK_FAILED,
  GET_BOOK_SUCCEEDED,
  WAITING_FOR_USER_DONE,
  initCategory,
  CATEGORY_GETTING,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_SUCCEEDED,
  initAuthor,
  AUTHOR_GETTING,
  GET_AUTHOR_FAILED,
  GET_AUTHOR_SUCCEEDED,
} from "../actions";

export const gettingAction = (prevState, action) => ({
  ...prevState,
  isLoading: true,
});
export const failedAction = (prevState, action) => ({
  ...prevState,
  error: true,
  isLoading: false,
  message: action.message,
  constructing: undefined,
});

export const fetchBook = (state = initBook, action) => {
  switch (action.type) {
    case BOOK_GETTING:
      return gettingAction(state, action);
    case WAITING_FOR_USER_DONE:
      return state;
    case GET_BOOK_SUCCEEDED:
      return {
        ...state,
        books: action.books || [],
        authors: action.authors || [],
        isLoading: false,
        error: false,
        constructing: undefined,
      };
    case GET_BOOK_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const fetchCategory = (state = initCategory, action) => {
  switch (action.type) {
    case CATEGORY_GETTING:
      return gettingAction(state, action);
    case GET_CATEGORY_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: action.categories,
      };
    case GET_CATEGORY_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const fetchAuthor = (state = initAuthor, action) => {
  switch (action.type) {
    case AUTHOR_GETTING:
      return gettingAction(state, action);
    case GET_AUTHOR_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: false,
        authors: action.authors,
      };
    case GET_AUTHOR_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const initState = {
  fetchBook: initBook,
  fetchCategory: initCategory,
  fetchAuthor: initAuthor,
};

export const reducer = combineReducers({
  fetchBook,
  fetchCategory,
  fetchAuthor,
});

export default (state = initState, action) => reducer(state, action);
