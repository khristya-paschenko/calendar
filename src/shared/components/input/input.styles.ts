import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';

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
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 15,
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.gray,
    width: '100%',
  },
});
