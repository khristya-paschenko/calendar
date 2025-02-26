import { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CalendarScreen } from '~/modules/screens/calendar/calendar.screen';
import {
  NAVIGATION_KEYS,
  RootStackParamList,
} from '~/modules/navigation/types/navigation.type';
import { NavContainer } from '~/modules/navigation/components/nav-container/nav-container';
import { SCREEN_OPTIONS } from '~/modules/navigation/constans/screen-options';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNav = () => {
  const screens = useMemo(() => {
    return (
      <>
        <Stack.Screen
          name={NAVIGATION_KEYS.CALENDAR}
          component={CalendarScreen}
          options={SCREEN_OPTIONS}
        />
      </>
    );
  }, []);

  return (
    <NavContainer>
      <Stack.Navigator>{screens}</Stack.Navigator>
    </NavContainer>
  );
};
