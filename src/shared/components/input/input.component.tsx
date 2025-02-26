import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from '~/shared/components/input/input.styles';
import { COLORS } from '~/shared/styles/colors';

type InputProps = {
  containerStyles?: StyleSheet;
  label: string;
  value: string;
  onChange: (value: string) => void;
  keyBoardType?: KeyboardTypeOptions;
  placeholder?: string;
};
export const Input = ({
  containerStyles,
  value,
  onChange,
  keyBoardType,
  label,
  placeholder,
}: InputProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyBoardType}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};
