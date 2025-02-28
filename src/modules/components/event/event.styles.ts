import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: '100%',
    gap: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.inter.medium,
    color: COLORS.yellow,
    fontSize: 16,
  },
  btnContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
  },
  info: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.gray,
  },
  dateContainer: {
    gap: 5,
    alignItems: 'flex-start',
  },
  end: {
    color: COLORS.gray,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});
