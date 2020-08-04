import {combineReducers} from "redux";
import * as actions from "../actions";

export const gettingAction = (prevState, action) => ({
  ...prevState,
  isLoading: true,
});
export const failedAction = (prevState, action) => ({
  ...prevState,
  error: true,
  isLoading: false,
  message: action.message,
});

export const fetchBook = (state = actions.initBook, action) => {
  switch (action.type) {
    case actions.CLEAR_DATA:
      return action.initData;
    case actions.BOOK_GETTING:
      return gettingAction(state, action);
    case actions.WAITING_FOR_USER_DONE:
      return state;
    case actions.GET_BOOK_SUCCEEDED:
      return {
        ...state,
        book: action.book || [],
        author: action.author || [],
        isLoading: false,
        error: false,
      };

    case actions.GET_BOOK_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const fetchCategory = (state = actions.initCategory, action) => {
  switch (action.type) {
    case actions.CATEGORY_GETTING:
      return gettingAction(state, action);
    case actions.GET_CATEGORY_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: action.categories,
      };
    case actions.GET_CATEGORY_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const fetchAuthor = (state = actions.initAuthor, action) => {
  switch (action.type) {
    case actions.AUTHOR_GETTING:
      return gettingAction(state, action);
    case actions.GET_AUTHOR_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: false,
        author: action.author,
      };
    case actions.GET_AUTHOR_FAILED:
      return failedAction(state, action);
    default:
      return state;
  }
};

export const authentication = (state = actions.initAuthentication, action) => {
  switch (action.type) {
    case actions.AUTHENTICATING:
      return {isAuthenticating: true};
    case actions.AUTHENTICATE_FAILED:
      return {authenticateFailed: true, message: action.message};
    case actions.AUTHENTICATE_SUCCEEDED:
      return {token: action.token, user: action.user};
    case actions.LOGGING:
      return {isAuthenticating: true};
    case actions.LOGIN_FAILED:
      return {authenticateFailed: true, message: action.message};
    case actions.LOGIN_SUCCEEDED:
      return {token: action.token, user: action.item};
    case actions.LOGOUT:
      return {logout: true};
    case actions.CLEAR_TOKEN_FAILED:
      return {
        clearTokenError: true,
        message: action.message
      };
    case actions.CLEAR_TOKEN_SUCCEEDED:
      return {message: action.message};
    default:
      return state;
  }
};

export const initState = {
  fetchBook: actions.initBook,
  fetchCategory: actions.initCategory,
  fetchAuthor: actions.initAuthor,
  authentication: actions.initAuthentication,
};

export const reducer = combineReducers({
  fetchBook,
  fetchCategory,
  fetchAuthor,
  authentication,
});

export default (state = initState, action) => {
  // if (action.type === CLEAR_DATA) state = initState;
  return reducer(state, action);
};
