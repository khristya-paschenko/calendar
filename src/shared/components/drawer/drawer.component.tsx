import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity } from 'react-native';
import { ERepeat, ERepeatText } from '~/shared/context/calendar/calendar.types';
import { useContext } from 'react';
import { styles } from '~/shared/components/drawer/drawer.styles';
import { BottomSheetContext } from '~/shared/context/bottom-sheet/bottom-sheet.context';

const Option = ({ item }: ERepeat) => {
  const { setOption, closeDrawer, option } =
    useContext<BottomSheetContext>(BottomSheetContext);
  const handleSelect = () => {
    setOption(item);
    closeDrawer();
  };
  return (
    <TouchableOpacity onPress={handleSelect}>
      <Text style={[styles.text, option === item && styles.selected]}>
        {ERepeatText[item]}
      </Text>
    </TouchableOpacity>
  );
};

export const DrawerComponent = () => {
  return (
    <BottomSheetView style={styles.container}>
      <Option item={ERepeat.ONCE} />
      <Option item={ERepeat.WEEKLY} />
      <Option item={ERepeat.BI_WEEKLY} />
      <Option item={ERepeat.MONTHLY} />
    </BottomSheetView>
  );
};
