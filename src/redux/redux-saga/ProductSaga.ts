import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API } from '../../utils/constant';
import { instance } from '../../utils/server/instance';
import showMessage from '../../utils/helper/showMessage';
import {
  productCreateFailure,
  productCreateSuccess,
  productDetailsFailure,
  productDetailsSuccess,
  productListFailure,
  productListRequest,
  productListSuccess,
  productRemoveFailure,
  productRemoveSuccess,
  productUpdateFailure,
  productUpdateSuccess,
} from '../reducer/ProductReducer';

const { product } = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// Worker Saga: Handles the sign-in API call
// function* handleSignIn(action: any) {
//   try {
//     const result: AxiosResponse<any> = yield call(
//       instance.post,
//       auth.login,
//       action.payload,
//     );

//     const {status, data} = result;

//     if (status === 200) {
//       yield call(Storage.setItem, 'token', data.token);
//       yield call(Storage.setItem, 'refresh-token', 'refreshToken');
//       yield put(
//         signInSuccess({
//           token: data.token,
//           refreshToken: 'refreshToken',
//           data: data?.data || {}
//         }),
//       );
//       showMessage(data.message);
//     }
//   } catch (error: any) {
//     console.log('error -- ', error.response);

//     showMessage(error?.response?.data?.message || error.message);
//     yield put(signInFailure(error?.response?.data?.message || error.message));
//   }
// }

function* handleProductCreate(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      product.create,
      action.payload,
      _header,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(productCreateSuccess(data.data));
      if (data?.message) {
        showMessage(data?.message);
        yield put(
          productListRequest({
            page: 1,
            perpage: 20,
          }),
        );
      }
    } else {
      yield put(productCreateFailure(data));
      if (data?.message) {
        showMessage(data?.message);
      }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(
      productCreateFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* getProductList(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      product.list,
      action.payload,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(productListSuccess(data.data));
    } else {
      yield put(productListFailure(data));
      // if (data?.message) {
      //   showMessage(data?.message);
      // }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    // showMessage(error?.response?.data?.message || error.message);
    yield put(
      productListFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* handleProductUpdate(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      product.update,
      action.payload,
      _header,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(productUpdateSuccess(data.data));
      if (data?.message) {
        showMessage(data?.message);
        yield put(
          productListRequest({
            page: 1,
            perpage: 20,
          }),
        );
      }
    } else {
      yield put(productUpdateFailure(data));
      if (data?.message) {
        showMessage(data?.message);
      }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(
      productUpdateFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* handleProductRemove(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      product.remove,
      action.payload,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(productRemoveSuccess(data.data));
      if (data?.message) {
        showMessage(data?.message);
        yield put(
          productListRequest({
            page: 1,
            perpage: 20,
          }),
        );
      }
    } else {
      yield put(productRemoveFailure(data));
      if (data?.message) {
        showMessage(data?.message);
      }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(
      productRemoveFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* handlePoductDetails(action: any) {
  console.log('action.payload -- ', action.payload);

  try {
    const result: AxiosResponse<any> = yield call(
      instance.get,
      `${product.details}${action.payload?.id}`,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(productDetailsSuccess(data.data));
    } else {
      yield put(productDetailsFailure(data));
      if (data?.message) {
        showMessage(data?.message);
      }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(
      productDetailsFailure(error?.response?.data?.message || error.message),
    );
  }
}

function* productSaga() {
  yield takeLatest('product/productCreateRequest', handleProductCreate);
  yield takeLatest('product/productListRequest', getProductList);
  yield takeLatest('product/productUpdateRequest', handleProductUpdate);
  yield takeLatest('product/productRemoveRequest', handleProductRemove);
  yield takeLatest('product/productDetailsRequest', handlePoductDetails);
}

export default productSaga;
