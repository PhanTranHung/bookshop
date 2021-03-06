export const GET_BOOK = "GET_BOOK";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const FIND_BOOK_BY_OPTIONS = "FIND_BOOK_BY_OPTIONS";
export const FIND_BOOK_BY_KEYWORD = "FIND_BOOK_BY_KEYWORD";
export const WAITING_FOR_USER_DONE = "WAITING_FOR_USER_DONE";
export const BOOK_GETTING = "BOOK_GETTING";
export const GET_BOOK_SUCCEEDED = "GET_BOOK_SUCCEEDED";
export const GET_BOOK_FAILED = "GET_BOOK_FAILED";

export const initBook = {
  isLoading: true,
};

export const getBook = () => ({type: GET_BOOK});
export const getBookDetail = (alias) => ({type: GET_BOOK_DETAIL, alias});
export const findBookByOptions = (authorID, categoryID) => ({
  type: FIND_BOOK_BY_OPTIONS,
  authorID,
  categoryID,
});
export const findBookByKeyword = (keyword) => ({
  type: FIND_BOOK_BY_KEYWORD,
  keyword,
});
export const waitingForUserDone = () => ({type: WAITING_FOR_USER_DONE});
export const bookGetting = () => ({type: BOOK_GETTING});
export const getBookSucceeded = ({book, author}) => ({
  type: GET_BOOK_SUCCEEDED,
  book,
  author,
});
export const getBookFailed = (message) => ({type: GET_BOOK_FAILED, message});

export const GET_CATEGORY = "GET_CATEGORY";
export const CATEGORY_GETTING = "CATEGORY_GETTING";
export const GET_CATEGORY_SUCCEEDED = "GET_CATEGORY_SUCCEEDED";
export const GET_CATEGORY_FAILED = "GET_CATEGORY_FAILED";

export const initCategory = {isLoading: true, categories: []};

export const getCategory = (params) => ({type: GET_CATEGORY, params});
export const categoriesGetting = () => ({type: CATEGORY_GETTING});
export const getCategorySucceeded = (categories) => ({
  type: GET_CATEGORY_SUCCEEDED,
  categories,
});
export const getCategoryFailed = (message) => ({
  type: GET_CATEGORY_FAILED,
  message,
});

export const GET_AUTHOR = "GET_AUTHOR";
export const GET_FAMOUS_AUTHOR = "GET_FAMOUS_AUTHOR";
export const AUTHOR_GETTING = "AUTHOR_GETTING";
export const GET_AUTHOR_SUCCEEDED = "GET_AUTHOR_SUCCEEDED";
export const GET_AUTHOR_FAILED = "GET_AUTHOR_FAILED";
export const GET_AUTHOR_DETAIL = "GET_AUTHOR_DETAIL";

export const initAuthor = {isLoading: true, author: []};

export const getAuthor = (params) => ({type: GET_AUTHOR, params});
export const getFamousAuthor = (params) => ({
  type: GET_FAMOUS_AUTHOR,
  params,
});
export const authorGetting = () => ({type: AUTHOR_GETTING});
export const getAuthorSucceeded = (author) => ({
  type: GET_AUTHOR_SUCCEEDED,
  author,
});
export const getAuthorFailed = (message) => ({
  type: GET_AUTHOR_FAILED,
  message,
});
export const getAuthorDetail = (alias) => ({
  type: GET_AUTHOR_DETAIL,
  alias,
});

export const CLEAR_DATA = "CLEAR_DATA";
export const clearData = (initData) => ({type: CLEAR_DATA, initData});

export const initAuthentication = {isAuthenticating: true};
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATE_SUCCEEDED = "AUTHENTICATE_SUCCEEDED";
export const AUTHENTICATE_FAILED = "AUTHENTICATE_FAILED";
export const LOGIN = "LOGIN";
export const LOGGING = "LOGGING";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const CLEAR_TOKEN_SUCCEEDED = "CLEAR_TOKEN_SUCCEEDED";
export const CLEAR_TOKEN_FAILED = "CLEAR_TOKEN_FAILED";

export const authenticateUser = () => ({type: AUTHENTICATE_USER});
export const authenticating = () => ({type: AUTHENTICATING});
export const authenticateSucceeded = (user) => ({type: AUTHENTICATE_SUCCEEDED, user});
export const authenticateFailed = (message) => ({type: AUTHENTICATE_FAILED, message});
export const login = (username, password, remember) => ({
  type: LOGIN,
  username,
  password,
  remember
});
export const logging = () => ({type: LOGGING});
export const loginSucceeded = (token, item) => ({
  type: LOGIN_SUCCEEDED,
  token,
  item,
});
export const loginFailed = (message) => ({type: LOGIN_FAILED, message});
export const logout = () => ({type: LOGOUT});
export const clearToken = () => ({type: CLEAR_TOKEN});
export const clearTokenSucceeded = () => ({type: CLEAR_TOKEN_SUCCEEDED});
export const clearTokenFailed = (message) => ({type: CLEAR_TOKEN_FAILED, message});
