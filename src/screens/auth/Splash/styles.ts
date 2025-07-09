import {StyleSheet} from 'react-native';
import {Colors} from '../../../themes/Colors';
import {Fonts} from '../../../themes/Fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/orientation';

export const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  imageLogo: {
    height: verticalScale(180),
    width: horizontalScale(180),
    borderRadius: moderateScale(90),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  loader: {
    width: horizontalScale(180),
    height: verticalScale(180),
    borderRadius: moderateScale(90),
    borderWidth: moderateScale(4),
    borderColor: 'transparent',
    position: 'absolute',
    borderTopColor: Colors.white,
  },
  logo: {
    height: verticalScale(160),
    width: horizontalScale(160),
    borderRadius: moderateScale(80),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: verticalScale(20),
  },
  titleText: {
    color: Colors.white,
    fontSize: moderateScale(28),
    fontFamily: Fonts.Poppins_Bold,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
    letterSpacing: 1,
  },
  tagline: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontFamily: Fonts.Poppins_Regular,
    marginTop: verticalScale(10),
  },
  button: {
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
    borderRadius: moderateScale(25),
    marginTop: verticalScale(20),
  },
  buttonText: {
    color: Colors.blue || '#000',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: moderateScale(16),
  },
});
