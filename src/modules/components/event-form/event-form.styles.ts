import { StyleSheet } from 'react-native';
import { FONTS } from '~/shared/styles/fonts';
import { COLORS } from '~/shared/styles/colors';

export const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: '100%',
  },
  fieldContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  dateTimeContainer: {
    width: '100%',
    gap: 5,
  },
  fieldTitle: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  animated: {
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  pickerContainer: {
    gap: 10,
    width: '100%',
  },
});
