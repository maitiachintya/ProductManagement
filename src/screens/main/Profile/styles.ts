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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  containerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: horizontalScale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(65),
    borderWidth: normalize(2),
    marginTop: verticalScale(60),
    borderColor: '#ccc',
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(3),
    },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    elevation: 5,
  },
  profileActiveDot: {
    resizeMode: 'contain',
    position: 'absolute',
    top: verticalScale(120),
    left: horizontalScale(68),
    tintColor: '#4ade80',
    width: horizontalScale(40),
    height: verticalScale(40),
  },
  name: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: Colors.white,
  },
  email: {
    fontSize: normalize(11),
    color: Colors.whiteGrey,
    marginBottom: verticalScale(20),
  },
  infoCard: {
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    elevation: 4,
    shadowColor: Colors.whiteSmoke,
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(10),
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(10),
    },
    marginTop: verticalScale(15),
  },
  label: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_SemiBold,
    color: Colors.grey,
    marginTop: verticalScale(10),
  },
  value: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.whiteSmoke,
    marginTop: verticalScale(4),
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    width: '90%',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(60),
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: Colors.deepRed,
    shadowOpacity: 1,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(4),
    },
    shadowRadius: moderateScale(6),
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  logoutLogo: {
    resizeMode: 'contain',
    width: horizontalScale(15),
    height: verticalScale(15),
    marginLeft: horizontalScale(10),
    tintColor: Colors.white,
  },
});
