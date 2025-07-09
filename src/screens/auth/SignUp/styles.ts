import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../themes/Colors';
import { Fonts } from '../../../themes/Fonts';
import {
  horizontalScale,
  moderateScale,
  normalize,
  verticalScale,
} from '../../../utils/orientation';

export const styles = StyleSheet.create({
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 50,
  },
  main: {
    height: '100%',
    width: '100%',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingTop: Platform.OS == 'ios' ? 45 : 55,
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingBottom: verticalScale(30),
  },
  title: {
    marginTop: 16,
    color: Colors.white,
    textAlign: 'center',
    fontSize: moderateScale(22),
    fontFamily: Fonts.Poppins_SemiBold,
  },
  subTitle: {
    color: Colors.grey,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Poppins_Regular,
    textAlign: 'center',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(28),
  },
  v: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
    borderWidth: moderateScale(2),
    borderRadius: normalize(100),
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: verticalScale(100),
    width: horizontalScale(100),
    borderRadius: moderateScale(100),
    resizeMode: 'cover',
  },
  add: {
    backgroundColor: Colors.blue,
    position: 'absolute',
    right: horizontalScale(0),
    bottom: verticalScale(0),
    borderRadius: moderateScale(30),
    padding: normalize(6),
    shadowColor: 'black',
    elevation: moderateScale(4),
    shadowOffset: {
      width: horizontalScale(4),
      height: verticalScale(6),
    },
    shadowOpacity: moderateScale(0.8),
    shadowRadius: moderateScale(5),
  },
  plus: {
    height: verticalScale(15),
    width: horizontalScale(15),
    tintColor: Colors.white,
  },
  v1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 20,
    marginVertical: verticalScale(10),
  },
  text: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Poppins_Regular,
    marginVertical: verticalScale(18),
  },
  phoneContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    backgroundColor: Colors.dark,
  },
  countryCode: {
    width: horizontalScale(10),
    padding: normalize(10),
    textAlign: 'center',
    borderRightWidth: horizontalScale(1),
    borderColor: '#ccc',
  },
  phoneWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(12),
    width: '100%',
  },
  touchFlag: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    backgroundColor: Colors.dark,
    borderRightWidth: horizontalScale(3),
    borderRightColor: Colors.main,
  },
  flagIconText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.white,
  },
  codeWrapper: {
    flex: 1,
    backgroundColor: 'green',
  },
  numberWrapper: {
    flex: 3,
    backgroundColor: 'blue',
  },
  countryInput: {
    width: '100%',
  },
  btnAccount: {
    marginTop: verticalScale(0),
    borderColor: Colors.grey,
    borderWidth: moderateScale(0.5),
  },
  btnText: {
    color: 'white',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
  },
  fullWidthButton: {
    height: 58,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  navigateButton: {
    height: 58,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
