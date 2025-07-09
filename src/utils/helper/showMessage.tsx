import Snackbar from 'react-native-snackbar';

const showMessage = (message: string) => {
  console.log('-->', message);
  // return null;
  if (message == '' || message == undefined || message == null) {
    return null;
  }
  return Snackbar.show({
    text: `${message}`,
    duration: Snackbar.LENGTH_LONG,
    // action: {
    //   text: 'UNDO',
    //   textColor: 'green',
    //   onPress: () => { /* Do something. */ },
    // },
  });
};

export default showMessage;
