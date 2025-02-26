import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '~/shared/components/btn-gradient/btn-gradient.styles';

type BtnGradientProps = {
  colors: string[];
  text: string;
  onPress: () => void;
};
export const BtnGradientComponent = ({
  colors,
  text,
  onPress,
}: BtnGradientProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={colors} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
