import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  loading: boolean;
  error: string | null;
  currentRequest: string;
  productCreateRes: object;
  productDetailsRes: object;
  productList: any;
  productRemoveRes: object;
  productUpdateRes: object;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  currentRequest: '',
  productCreateRes: {},
  productDetailsRes: {},
  productList: [],
  productRemoveRes: {},
  productUpdateRes: {},
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    /* PRODUCT CREATE */
    productCreateRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    productCreateSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productCreateRes = action.payload;
      state.error = null;
    },
    productCreateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* PRODUCT DETAILS */
    productDetailsRequest(state, action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
    },
    productDetailsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productDetailsRes = action.payload;
      state.error = null;
    },
    productDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* PRODUCT LIST */
    productListRequest(
      state,
      action: PayloadAction<{ page: number; perpage: number }>,
    ) {
      state.currentRequest = action.type;
      state.loading = true;
      state.error = null;
    },
    productListSuccess(state, action: PayloadAction<any>) {
      state.currentRequest = action.type;
      state.loading = false;
      state.productList = action.payload;
      state.error = null;
    },
    productListFailure(state, action: PayloadAction<string>) {
      state.currentRequest = action.type;
      state.loading = false;
      state.error = action.payload;
    },

    /* PRODUCT REMOVE */
    productRemoveRequest(state, action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
    },
    productRemoveSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productRemoveRes = action.payload;
      state.error = null;
    },
    productRemoveFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    /* PRODUCT UPDATE */
    productUpdateRequest(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    productUpdateSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.productUpdateRes = action.payload;
      state.error = null;
    },
    productUpdateFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  /* PRODUCT CREATE */
  productCreateRequest,
  productCreateSuccess,
  productCreateFailure,

  /* PRODUCT DETAILS */
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailure,

  /* PRODUCT LIST */
  productListRequest,
  productListSuccess,
  productListFailure,

  /* PRODUCT REMOVE */
  productRemoveRequest,
  productRemoveSuccess,
  productRemoveFailure,

  /* PRODUCT UPDATE */
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFailure,
} = productReducer.actions;

export default productReducer.reducer;
