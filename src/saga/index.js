import * as actions from "../actions";

import {
  getBook,
  getAuthor,
  getCategory,
  getBookDetail,
  getAuthorDetail,
  getFamousAuthor,
  findBookByKeyword,
} from "../api";

import {all, call, fork, put, takeLatest} from "redux-saga/effects";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchBook(action) {
  let result = {};

  try {
    if (action.type === actions.GET_BOOK)
      result.book = yield call(loadBook, action);
    else if (action.type === actions.FIND_BOOK_BY_OPTIONS)
      result.book = yield call(findByOptions, action);
    else if (action.type === actions.FIND_BOOK_BY_KEYWORD)
      result = yield call(findByKeyword, action);
    else if (action.type === actions.GET_AUTHOR)
      result.author = yield call(fetchAuthor, action);

    yield put(actions.getBookSucceeded(result));
  } catch (e) {
    yield put(actions.getBookFailed(e));
  }
}

function* findByOptions(action) {
  yield put(actions.waitingForUserDone());
  yield delay(1000);
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

function* fetchCategory() {
  yield put(actions.categoriesGetting());
  try {
    const categories = yield call(getCategory);
    yield put(actions.getCategorySucceeded(categories));
  } catch (e) {
    yield put(actions.getCategoryFailed(e));
  }
}

function* fetchAuthor() {
  yield put(actions.authorGetting());
  return yield call(getAuthor);
}

function* fetchAuthorDetail(action) {
  yield put(actions.authorGetting());
  try {
    const author = yield call(getAuthorDetail, action.alias);
    yield put(actions.getAuthorSucceeded(author));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* fetchBookDetail(action) {
  yield put(actions.bookGetting());
  try {
    const book = yield call(getBookDetail, action.alias);
    yield put(actions.getBookSucceeded(book));
  } catch (e) {
    yield put(actions.getBookFailed(e));
  }
}

function* watchFetchDetailInfo() {
  yield takeLatest(actions.GET_BOOK_DETAIL, fetchBookDetail);
  yield takeLatest(actions.GET_AUTHOR_DETAIL, fetchAuthorDetail);
}

function* fetchFamousAuthor() {
  yield put(actions.authorGetting());
  try {
    const author = yield call(getFamousAuthor);
    yield put(actions.getAuthorSucceeded(author));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* watchFetchMenuData() {
  yield takeLatest(actions.GET_CATEGORY, fetchCategory);
  yield takeLatest(actions.GET_FAMOUS_AUTHOR, fetchFamousAuthor);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchBook),
    fork(watchFetchMenuData),
    fork(watchFetchDetailInfo),
  ]);
}
