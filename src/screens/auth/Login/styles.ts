import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../../themes/Colors';
import { Fonts } from '../../../themes/Fonts';
import {
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
  contentContainerStyle: {
    paddingTop: Platform.OS == 'ios' ? 45 : 55,
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingBottom: verticalScale(30),
  },
  title: {
    marginTop: verticalScale(50),
    color: Colors.white,
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
  v1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: verticalScale(10),
  },
  text: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontFamily: Fonts.Poppins_Regular,
    marginVertical: verticalScale(18),
  },
  btnAccount: {
    marginTop: verticalScale(0),
    borderColor: Colors.grey,
    borderWidth: normalize(0.5),
  },
  btnText: {
    color: 'white',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
  },
  fullWidthButton: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  navigateButton: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
