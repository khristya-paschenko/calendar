import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles/colors';
export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderTopRadius: 10,
    width: '100%',
    height: '95%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
