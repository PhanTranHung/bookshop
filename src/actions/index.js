export const GETBOOK = "GETBOOK";
export const BOOKGETTING = "BOOKGETTING";
export const GETBOOKSUCCEEDED = "GETBOOKSUCCEEDED";
export const GETBOOKFAILED = "GETBOOKFAILED";

export const initBook = { isLoading: true, books: [] };

export const getBook = () => ({ type: GETBOOK });
export const bookGetting = () => ({ type: BOOKGETTING });
export const getBookSucceeded = (books) => ({ type: GETBOOKSUCCEEDED, books });
export const getBookFailed = (message) => ({ type: GETBOOKFAILED, message });
