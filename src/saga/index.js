import * as actions from "../actions";

import {
  findBookByKeyword,
  getAuthor,
  getBook,
  getCategory,
  getFamousAuthor,
} from "../api";

import {all, call, fork, put, takeLatest} from "redux-saga/effects";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchBook(action) {
  let result = {};
  try {
    if (action.type === actions.GET_BOOK)
      result.books = yield call(loadBook, action);
    else if (action.type === actions.FIND_BOOK_BY_OPTIONS)
      result.books = yield call(findByOptions, action);
    else if (action.type === actions.FIND_BOOK_BY_KEYWORD)
      result = yield call(findByKeyword, action);
    else if (action.type === actions.GET_AUTHOR)
      result.authors = yield call(fetchAuthor, action);

    yield put(actions.getBookSucceeded(result));
  } catch (e) {
    yield put(actions.getBookFailed(e));
  }
}

function* findByOptions(action) {
  yield put(actions.waitingForUserDone());
  yield delay(1500);
  yield put(actions.bookGetting());
  return yield call(getBook, action.authorID, action.categoryID);
}

function* findByKeyword(action) {
  yield put(actions.bookGetting());
  return yield call(findBookByKeyword, action.keyword);
}

function* loadBook() {
  yield put(actions.bookGetting());
  return yield call(getBook);
}

function* watchFetchBook() {
  yield takeLatest(
    [
      actions.GET_BOOK,
      actions.FIND_BOOK_BY_OPTIONS,
      actions.FIND_BOOK_BY_KEYWORD,
      actions.GET_AUTHOR,
    ],
    fetchBook
  );
}

function* fetchCategory(action) {
  yield put(actions.categoriesGetting());
  try {
    const categories = yield call(getCategory);
    yield put(actions.getCategorySucceeded(categories));
  } catch (e) {
    yield put(actions.getCategoryFailed(e));
  }
}

function* fetchAuthor(action) {
  yield put(actions.authorGetting());
  return yield call(getAuthor);
}

function* fetchFamousAuthor(action) {
  yield put(actions.authorGetting());
  try {
    const authors = yield call(getFamousAuthor);
    yield put(actions.getAuthorSucceeded(authors));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* watchFetchMenuData() {
  yield takeLatest(actions.GET_CATEGORY, fetchCategory);
  yield takeLatest(actions.GET_FAMOUS_AUTHOR, fetchFamousAuthor);
}

export default function* rootSaga() {
  yield all([fork(watchFetchBook), fork(watchFetchMenuData)]);
}
