import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SIGN_IN_TYPE } from '../../types';

interface AuthState {
  token: string;
  refreshToken: string;
  splashLoading: boolean;
  loading: boolean;
  error: string | null;
  user: any;
  loginRes: any;
  signUpRes: any;
}

const initialState: AuthState = {
  refreshToken: '',
  token: '',
  splashLoading: true,
  loading: false,
  error: null,
  user: {},
  loginRes: {},
  signUpRes: {},
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) {
      state.splashLoading = false;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },

    /* STORE LOCAL DATABSE */
    updateToken(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },

    /* SIGN UP */
    signUpRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.signUpRes = action.payload;
      state.error = null;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* SIGN IN */
    signInRequest(state, action: PayloadAction<SIGN_IN_TYPE>) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(
      state,
      action: PayloadAction<{ token: string; refreshToken: string; data: any }>,
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.loginRes = action.payload.data;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* GET USER PROFILE */
    getUserProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUserProfileSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    getUserProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* LOGOUT */
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      (state.user = {}),
        (state.token = ''),
        (state.refreshToken = ''),
        (state.error = null);
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setToken,
  updateToken,

  /* SIGN UP */
  signUpRequest,
  signUpSuccess,
  signUpFailure,

  /* SIGN IN */
  signInRequest,
  signInSuccess,
  signInFailure,

  /* GET USER PROFILE */
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFailure,

  /* LOGOUT */
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authReducer.actions;

export default authReducer.reducer;
