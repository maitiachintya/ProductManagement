import { all } from 'redux-saga/effects';
import authSaga from './AuthSaga';
import productSaga from './ProductSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    // Add other sagas here
  ]);
}
