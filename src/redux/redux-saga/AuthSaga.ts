import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API } from '../../utils/constant';
import { instance } from '../../utils/server/instance';
import {
  getUserProfileFailure,
  getUserProfileSuccess,
  logoutFailure,
  logoutSuccess,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from '../reducer/AuthReducer';
import showMessage from '../../utils/helper/showMessage';
import Storage from '../../utils/storage';
import { navigate } from '../../navigators/RootNavigation';

const { auth, user } = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

function* handleUpdateToken(action: any) {
  console.log('handleUpdateToken action -- ', action?.payload);

  try {
    yield call(Storage.setItem, 'token', action.payload?.token);
    yield call(Storage.setItem, 'refresh-token', action.payload?.refreshToken);
    console.log('Update local storage');
  } catch (error: any) {
    console.log('error -- ', error.response);
  }
}

// Worker Saga: Handles the sign-in API call
function* handleSignIn(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.login,
      action.payload,
    );

    const { status, data } = result;

    if (status === 200) {
      if (!data?.token) {
        throw new Error('Token not returned by server.');
      }

      yield call(Storage.setItem, 'token', data.token);
      yield call(Storage.setItem, 'refresh-token', 'refreshToken');

      yield put(
        signInSuccess({
          token: data.token,
          refreshToken: 'refreshToken',
          data: data?.data || {},
        }),
      );

      showMessage(data.message);
    } else {
      // If status is not 200, force error
      throw new Error(data?.message || 'Invalid email or password.');
    }
  } catch (error: any) {
    console.log('Login error:', error);

    let errorMessage = 'Invalid email or password';

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    showMessage(errorMessage);
    yield put(signInFailure(errorMessage));
  }
}



// Worker Saga: Handles the sign-up API call
function* handleSignUp(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.signup,
      action.payload,
      _header,
    );

    const { status, data } = result;

    if (status === 200) {
      yield put(signUpSuccess(data.data));
      if (data?.message) {
        showMessage(data?.message);
      }
      navigate('Login');
    } else {
      yield put(signUpFailure(data));
      if (data?.message) {
        showMessage(data?.message);
      }
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(signUpFailure(error?.response?.data?.message || error.message));
  }
}

function* handleGetProfile(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(instance.get, user.profile);

    const { status, data } = result;

    if (status === 200) {
      yield put(getUserProfileSuccess(data?.data));
    }
  } catch (error: any) {
    console.log('error -- ', error.response);

    showMessage(error?.response?.data?.message || error.message);
    yield put(
      getUserProfileFailure(error?.response?.data?.message || error.message),
    );
  }
}

// Worker Saga: Handles the logout process
function* handleLogout() {
  try {
    // Clear local storage (if needed)
    yield call(Storage.clearAll);
    // Dispatch the logout action to reset the state
    yield put(logoutSuccess());
    showMessage('Logout Successful, You have been logged out successfully!');
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(logoutFailure(error?.response?.data?.message || error.message));
  }
}

function* authSaga() {
  yield takeLatest('auth/updateToken', handleUpdateToken);
  yield takeLatest('auth/signInRequest', handleSignIn);
  yield takeLatest('auth/signUpRequest', handleSignUp);
  yield takeLatest('auth/getUserProfileRequest', handleGetProfile);
  yield takeLatest('auth/logoutRequest', handleLogout);
}

export default authSaga;
