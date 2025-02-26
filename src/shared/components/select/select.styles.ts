import { StyleSheet } from 'react-native';
import { FONTS } from '~/shared/styles/fonts';
import { COLORS } from '~/shared/styles/colors';

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  select: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  option: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  rotate: {
    transform: [{ rotate: '180deg' }],
  },
});
