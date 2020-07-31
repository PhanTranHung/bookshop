import * as actions from "../actions";

import {findBookByKeyword, getAuthor, getBook, getCategory} from "../api";

import {all, call, fork, put, takeLatest} from "redux-saga/effects";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchBook(action) {
  let result = {};
  try {
    if (action.type === actions.GET_BOOK)
      result.books = yield call(loadBook, action);
    else if (action.type === actions.FIND_BOOK_BY_OPTIONS)
      result.books = yield call(findByOptions, action);
    else result = yield call(findByKeyword, action);

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
  debugger;
  yield put(actions.bookGetting());
  return yield call(getBook);
}

function* watchFetchBook() {
  yield takeLatest(
    [
      actions.GET_BOOK,
      actions.FIND_BOOK_BY_OPTIONS,
      actions.FIND_BOOK_BY_KEYWORD,
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
  try {
    const authors = yield call(getAuthor);
    yield put(actions.getAuthorSucceeded(authors));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* watchFetchMenuData() {
  yield takeLatest(actions.GET_CATEGORY, fetchCategory);
  yield takeLatest(actions.GET_AUTHOR, fetchAuthor);
}

export default function* rootSaga() {
  yield all([fork(watchFetchBook), fork(watchFetchMenuData)]);
}
