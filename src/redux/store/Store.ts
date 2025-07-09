import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../reducer/AuthReducer'; // your auth reducer import
import ProductReducer from '../reducer/ProductReducer'; // your product reducer import
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { logger } from 'redux-logger';
import rootSaga from '../redux-saga/rootSaga';
const createSagaMiddleware = require('redux-saga').default;

// Combine reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false, // disable thunk if you don't want it
      serializableCheck: false,
    }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
