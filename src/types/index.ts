export type RootAuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type RootMainStackParamList = {
  TabNavigation: undefined;
  ProductDetails: {
    product_id: string;
  };
  Home?: undefined;
};

export type RootMainTabParamList = {
  Dashboard: undefined;
  List: undefined;
  Profile: undefined;
};

export type SIGN_IN_TYPE = {
  email: string;
  password: string;
};
