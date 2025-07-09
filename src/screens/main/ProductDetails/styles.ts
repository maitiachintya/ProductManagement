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
  safeArea: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: verticalScale(1),
    elevation: moderateScale(3),
    shadowColor: Colors.black,
    shadowOffset: {
      width: horizontalScale(15),
      height: verticalScale(12),
    },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
  },
  backButton: {
    marginRight: horizontalScale(10),
  },
  touchArrow: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: Colors.white,
  },
  headerTitle: {
    fontSize: normalize(18),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.white,
  },
  scrollView: {
    padding: moderateScale(16),
  },
  card: {
    backgroundColor: 'rgba(14, 1, 23, 0.95)',
    borderRadius: moderateScale(16),
    borderColor: 'rgba(244, 239, 239, 0.4)',
    padding: moderateScale(20),
    shadowColor: Colors.grey,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(3),
    },
    shadowOpacity: 1,
    shadowRadius: moderateScale(10),
    elevation: 6,
  },
  image: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    backgroundColor: '#dbeafe',
  },
  title: {
    fontSize: normalize(15),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.whiteGrey,
    marginBottom: verticalScale(12),
  },
  status: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: '#4ade80',
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.grey,
    marginBottom: verticalScale(6),
  },
  description: {
    fontSize: normalize(12),
    color: Colors.whiteSmoke,
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(20),
  },
  meta: {
    fontSize: normalize(10),
    color: Colors.greyWhite,
    marginBottom: verticalScale(6),
  },
});
