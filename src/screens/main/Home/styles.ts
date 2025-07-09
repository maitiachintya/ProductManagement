import { StyleSheet } from 'react-native';
import { Colors } from '../../../themes/Colors';
import { Fonts } from '../../../themes/Fonts';
import {
  horizontalScale,
  moderateScale,
  normalize,
  verticalScale,
} from '../../../utils/orientation';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheetText: {
    fontSize: normalize(18),
    textAlign: 'center',
    marginTop: 75,
    fontFamily: Fonts.Poppins_SemiBold,
    marginBottom: verticalScale(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingBottom: 30,
  },
  v: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(20),
    borderColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(100),
    width: horizontalScale(100),
  },
  img: {
    height: verticalScale(100),
    width: horizontalScale(100),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
  },
  txt: {
    fontSize: normalize(12),
    color: Colors.greyWhite,
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
    margin: moderateScale(10),
  },
  add: {
    backgroundColor: Colors.blue,
    position: 'absolute',
    right: -10,
    bottom: -10,
    borderRadius: moderateScale(30),
    padding: moderateScale(6),
    shadowColor: Colors.whiteSmoke,
    elevation: 4,
    shadowOffset: {
      width: horizontalScale(4),
      height: verticalScale(13),
    },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(5),
  },
  plus: {
    height: 15,
    width: 15,
    tintColor: Colors.white,
  },
  textInputContainer: {
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    height: verticalScale(45),
    borderWidth: moderateScale(1),
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.blue,
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    elevation: 3,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(15),
    },
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    marginTop: verticalScale(50),
  },
  submitText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
  },
});
