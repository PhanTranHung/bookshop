import * as actions from "../actions";

import * as api from "../api";

import {all, call, fork, put, take, takeLatest} from "redux-saga/effects";

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
  return yield call(api.getBook, action.authorID, action.categoryID);
}

function* findByKeyword(action) {
  yield put(actions.bookGetting());
  return yield call(api.findBookByKeyword, action.keyword);
}

function* loadBook() {
  yield put(actions.bookGetting());
  return yield call(api.getBook);
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
    const categories = yield call(api.getCategory);
    yield put(actions.getCategorySucceeded(categories));
  } catch (e) {
    yield put(actions.getCategoryFailed(e));
  }
}

function* fetchAuthor() {
  yield put(actions.authorGetting());
  return yield call(api.getAuthor);
}

function* fetchAuthorDetail(action) {
  yield put(actions.authorGetting());
  try {
    const author = yield call(api.getAuthorDetail, action.alias);
    yield put(actions.getAuthorSucceeded(author));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* fetchBookDetail(action) {
  yield put(actions.bookGetting());
  try {
    const book = yield call(api.getBookDetail, action.alias);
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
    const author = yield call(api.getFamousAuthor);
    yield put(actions.getAuthorSucceeded(author));
  } catch (e) {
    yield put(actions.getAuthorFailed(e));
  }
}

function* watchFetchMenuData() {
  yield takeLatest(actions.GET_CATEGORY, fetchCategory);
  yield takeLatest(actions.GET_FAMOUS_AUTHOR, fetchFamousAuthor);
}

function* authenticateUser() {
  try {
    yield put(actions.authenticating());
    const user = yield call(api.authentication);
    if (user) yield put(actions.authenticateSucceeded(user));
    return user;
  } catch (e) {
    yield put(actions.authenticateFailed(e));
  }
}

function* login(username, password) {
  try {
    yield put(actions.logging());
    const {token, item} = yield call(api.login, username, password);
    yield put(actions.loginSucceeded(token, item));
    return {token, item};
  } catch (e) {
    yield put(actions.loginFailed(e));
  }
}

function* clearToken() {
  try {
    yield put(actions.logout());
    const {success} = yield call(actions.clearToken);
    if (success)
      yield put(
        actions.clearTokenSucceeded({message: "Ready for you sign in"})
      );
  } catch (e) {
    yield put(
      actions.clearTokenFailed({
        message:
          "An errors was occurs when we trying to clear token. Please check your Internet connection!",
      })
    );
  }
}

function* authentication() {
  try {
    while (true) {
      yield take(actions.AUTHENTICATE_USER);
      const user = yield call(authenticateUser);
      if (!user) {
        const {username, password, remember} = yield take(actions.LOGIN);
        const {token} = yield call(login, username, password);
        if (token) yield call(api.saveToken, token, remember);
      }
      yield take([actions.LOGOUT, actions.CLEAR_TOKEN]);
      yield yield call(clearToken);
    }
  } catch (e) {
    console.trace(e);
  } finally {
    if (!localStorage.getItem("remember"))
      api.clearToken({clearOnServer: true});
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchBook),
    fork(watchFetchMenuData),
    fork(watchFetchDetailInfo),
    fork(authentication),
  ]);
}
