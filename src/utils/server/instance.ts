import { URL } from '../constant';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { API } from '../constant';
import { store } from '../../redux/store/Store';
import { logoutRequest, updateToken } from '../../redux/reducer/AuthReducer';

export const instance = axios.create({
  baseURL: URL.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  const { auth } = API;

  const { refreshToken } = store.getState().auth;
  console.log('refreshToken --- .....');

  if (!refreshToken) {
    return null;
  }

  // Uncomment and implement token refresh logic as needed
  try {
    const response = await axios.post(`${URL.BASE_URL}/${auth.refreshToken}`, {
      refreshToken: refreshToken,
    });

    console.log('refreshToken response -- ', response);

    // Dispatch action to update the token in the Redux store
    store.dispatch(
      updateToken({
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }),
    );

    return response.data.accessToken;
  } catch (error: any) {
    console.log(error.response.data);
    store.dispatch(logoutRequest());
    throw error;
  }
};

instance.interceptors.request.use(async config => {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    throw new axios.Cancel(
      'No internet connection. Please connect to the internet.',
    );
  }

  const { token } = store.getState().auth;
  console.log('token -- ', token);

  if (token && config.headers) {
    config.headers['x-access-token'] = token;
    // config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    console.log('error >>>>--- ', error.response);

    const originalRequest = error.config;

    // Check if the error is due to an expired token and the request hasn't already been retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const newToken = await refreshToken();

        // Update the token in the headers
        // instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        instance.defaults.headers.common['x-access-token'] = newToken;
        originalRequest.headers['x-access-token'] = newToken;

        console.log('originalRequest >>>');

        // Retry the original request
        return instance(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, reset the auth state and reject the promise
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
