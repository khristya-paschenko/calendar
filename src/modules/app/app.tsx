import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNav } from '../navigation/components/root-nav/root-nav';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { CalendarContextProvider } from '~/shared/context/calendar/calendar.context';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  BottomSheetContext,
  useBottomSheet,
} from '~/shared/context/bottom-sheet/bottom-sheet.context';
import { DrawerComponent } from '~/shared/components/drawer/drawer.component';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    'inter-regular': require('../../../assets/fonts/Inter_18pt-Regular.ttf'),
    'inter-medium': require('../../../assets/fonts/Inter_18pt-Medium.ttf'),
    'inter-semi-bold': require('../../../assets/fonts/Inter_18pt-SemiBold.ttf'),
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const drawer = useBottomSheet(bottomSheetRef);

  if (!fontsLoaded) {
    return <Text>Loading ... </Text>;
  }

  return (
    <SafeAreaProvider>
      <CalendarContextProvider>
        <GestureHandlerRootView>
          <BottomSheetContext.Provider value={drawer}>
            <RootNav />
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={['10%', '30%']}
              enablePanDownToClose
            >
              <DrawerComponent />
            </BottomSheet>
          </BottomSheetContext.Provider>
        </GestureHandlerRootView>
      </CalendarContextProvider>
    </SafeAreaProvider>
  );
}
