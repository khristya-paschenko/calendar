import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from '~/shared/components/input-btn/input-btn.styles';

type InputBtn = {
  text: string;
  onPress: () => void;
  containerStyles?: StyleSheet;
};
export const InputBtn = ({ text, onPress, containerStyles }: InputBtn) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
