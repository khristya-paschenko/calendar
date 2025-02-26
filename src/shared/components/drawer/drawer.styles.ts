import { StyleSheet } from 'react-native';
import { FONTS } from '~/shared/styles/fonts';
import { COLORS } from '~/shared/styles/colors';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  text: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  selected: {
    fontFamily: FONTS.inter.semiBold,
    color: COLORS.yellow,
  },
});
