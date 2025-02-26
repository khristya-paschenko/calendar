import { Pressable, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { BottomSheetContext } from '~/shared/context/bottom-sheet/bottom-sheet.context';
import { styles } from '~/shared/components/select/select.styles';
import { ERepeatText } from '~/shared/context/calendar/calendar.types';
import Arrow from '~/../assets/icons/arrow.svg';
import { COLORS } from '~/shared/styles/colors';

export const Select = () => {
  const { option, showDrawer } =
    useContext<BottomSheetContext>(BottomSheetContext);
  const [rotateArrow, setRotateArrow] = useState<boolean>(false);

  useEffect(() => {
    setRotateArrow(false);
  }, [option]);
  const handelPress = () => {
    showDrawer(), setRotateArrow(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Repeat</Text>
      <Pressable style={styles.select} onPress={handelPress}>
        <Text style={styles.option}>{ERepeatText[option]}</Text>
        <Arrow
          width={16}
          height={10}
          fill={COLORS.gray}
          styles={rotateArrow && styles.rotate}
        />
      </Pressable>
    </View>
  );
};
