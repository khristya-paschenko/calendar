import { StyleSheet } from 'react-native';
import { FONTS } from '~/shared/styles/fonts';
import { COLORS } from '~/shared/styles/colors';
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  text: {
    fontFamily: FONTS.inter.semiBold,
    color: COLORS.white,
    fontSize: 18,
  },
});
