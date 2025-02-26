import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    height: 50,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
});
