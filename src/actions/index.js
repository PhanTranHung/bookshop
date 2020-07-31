export const GET_BOOK = "GET_BOOK";
export const FIND_BOOK_BY_OPTIONS = "FIND_BOOK_BY_OPTIONS";
export const FIND_BOOK_BY_KEYWORD = "FIND_BOOK_BY_KEYWORD";
export const WAITING_FOR_USER_DONE = "WAITING_FOR_USER_DONE";
export const BOOK_GETTING = "BOOK_GETTING";
export const GET_BOOK_SUCCEEDED = "GET_BOOK_SUCCEEDED";
export const GET_BOOK_FAILED = "GET_BOOK_FAILED";

export const initBook = {constructing: true, isLoading: true, books: [], authors: []};

export const getBook = () => ({type: GET_BOOK});
export const findBookByOptions = (authorID, categoryID) => ({type: FIND_BOOK_BY_OPTIONS, authorID, categoryID});
export const findBookByKeyword = (keyword) => ({type: FIND_BOOK_BY_KEYWORD, keyword});
export const waitingForUserDone = () => ({type: WAITING_FOR_USER_DONE});
export const bookGetting = () => ({type: BOOK_GETTING});
export const getBookSucceeded = ({books, authors}) => ({type: GET_BOOK_SUCCEEDED, books, authors});
export const getBookFailed = (message) => ({type: GET_BOOK_FAILED, message});


export const GET_CATEGORY = "GET_CATEGORY";
export const CATEGORY_GETTING = "CATEGORY_GETTING";
export const GET_CATEGORY_SUCCEEDED = "GET_CATEGORY_SUCCEEDED";
export const GET_CATEGORY_FAILED = "GET_CATEGORY_FAILED";

export const initCategory = {isLoading: true, categories: []};

export const getCategory = (params) => ({type: GET_CATEGORY, params});
export const categoriesGetting = () => ({type: CATEGORY_GETTING});
export const getCategorySucceeded = (categories) => ({type: GET_CATEGORY_SUCCEEDED, categories});
export const getCategoryFailed = (message) => ({type: GET_CATEGORY_FAILED, message});


export const GET_AUTHOR = "GET_AUTHOR";
export const AUTHOR_GETTING = "AUTHOR_GETTING";
export const GET_AUTHOR_SUCCEEDED = "GET_AUTHOR_SUCCEEDED";
export const GET_AUTHOR_FAILED = "GET_AUTHOR_FAILED";

export const initAuthor = {isLoading: true, authors: []};

export const getAuthor = (params) => ({type: GET_AUTHOR, params});
export const authorGetting = () => ({type: AUTHOR_GETTING});
export const getAuthorSucceeded = (authors) => ({type: GET_AUTHOR_SUCCEEDED, authors});
export const getAuthorFailed = (message) => ({type: GET_AUTHOR_FAILED, message});

