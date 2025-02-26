import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';

export const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.bg,
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
  },
  noEvents: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTS.inter.regular,
    color: COLORS.black,
  },
  eventsContainer: {
    width: '100%',
    gap: 20,
  },
  addBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addBtnGradient: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  plusIcon: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 20,
    color: COLORS.white,
  },
  addBtnText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  animated: {
    overflow: 'hidden',
    backgroundColor: COLORS.bg,
  },
});
