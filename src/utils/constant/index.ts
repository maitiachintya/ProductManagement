export const URL = {
  BASE_URL: 'https://wtsacademy.dedicateddevelopers.us',
  PROFILE_IMAGE_URL:
    'https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/',
  PRODUCT_IMAGE_URL:
    'https://wtsacademy.dedicateddevelopers.us/uploads/product/',
  BUCKET_URL: 'https://picsum.photos',
};

export const API = {
  auth: {
    login: 'api/user/signin',
    signup: 'api/user/signup',
    refreshToken: 'auth/refresh',
  },
  user: {
    profile: 'api/user/profile-details',
  },
  product: {
    create: 'api/product/create',
    list: 'api/product/list',
    update: 'api/product/update',
    remove: 'api/product/remove',
    details: 'api/product/detail/',
  },
};

export const colorCodes = [
  '#FF5733', // reddish orange
  '#33B5E5', // blue
  '#00C851', // green
  '#FFBB33', // yellow/orange
  '#AA66CC', // purple
  '#FF4444', // red
  '#0099CC', // sky blue
  '#2BBBAD', // teal
  '#4285F4', // Google blue
  '#5C6BC0', // indigo
  '#FFF',
  '#000',
];
