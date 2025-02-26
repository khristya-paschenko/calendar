import { StyleSheet } from 'react-native';
import { FONTS } from '~/shared/styles/fonts';
import { COLORS } from '~/shared/styles/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
  },
  dayContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  dayContainerMarked: {
    backgroundColor: COLORS.lightYellow,
  },
  dayContainerMarkedInactive: {
    backgroundColor: COLORS.lightGray,
  },
  dayText: {
    fontFamily: FONTS.inter.regular,
  },
  dayTextSelected: { color: COLORS.yellow, fontFamily: FONTS.inter.semiBold },
  dayTextDisabled: { display: 'none' },
  dayTextToday: { color: COLORS.white, fontFamily: FONTS.inter.semiBold },
  monthText: {
    color: COLORS.black,
    textTransform: 'uppercase',
    fontFamily: FONTS.inter.semiBold,
  },
  dayTextMarked: { color: COLORS.yellow, fontFamily: FONTS.inter.semiBold },
  dayContainerDisabled: {
    backgroundColor: 'transparent',
  },
  dayTextMarkedInactive: {
    fontFamily: FONTS.inter.semiBold,
  },
});
