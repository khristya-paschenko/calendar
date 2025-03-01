import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarComponent } from '~/shared/components/calendar/calendar.component';
import { styles } from '~/modules/screens/calendar/calendar.styles';
import { useCalendarContext } from '~/shared/context/calendar/calendar.context';
import { EventFormComponent } from '~/modules/components/event-form/event-form.component';
import { ERepeat, IEvent } from '~/shared/context/calendar/calendar.types';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '~/shared/styles/colors';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BottomSheetContext } from '~/shared/context/bottom-sheet/bottom-sheet.context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { filterEvents } from '~/shared/util/filter-events';
import { EventComponent } from '~/modules/components/event/event.component';
import { exp } from '@gorhom/bottom-sheet/lib/typescript/utilities/easingExp';
export const CalendarScreen = () => {
  const { events } = useCalendarContext();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(today.toString());
  const heightValue = useSharedValue(0);
  const [isOpen, setIsOpen] = useState<string | '' | 'form'>('');
  const [isToday, setIsToday] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Omit<IEvent, 'id'>>({
    name: '',
    endDate: selectedDate,
    startDate: selectedDate,
    repeat: ERepeat.ONCE,
  });

  const handleIsOpen = (option: string) => {
    console.log(option, 'option ');

    if (option === 'form') {
      setIsOpen((prev) => {
        if (prev === option) {
          return '';
        }
        return option;
      });
    } else {
      setIsOpen(option);
    }

    heightValue.value = isOpen === 'form' ? withTiming(0) : withTiming(640);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    opacity: heightValue.value > 0 ? 1 : 0,
  }));

  useEffect(() => {
    setNewEvent({
      name: '',
      endDate: selectedDate,
      startDate: selectedDate,
      repeat: ERepeat.ONCE,
    });
    setIsToday(
      today.toISOString().split('T')[0] ===
        new Date(selectedDate).toISOString().split('T')[0],
    );
  }, [selectedDate]);

  const filteredEvent = useMemo(() => {
    return filterEvents(selectedDate, events);
  }, [selectedDate, events]);

  const renderItem = useCallback(
    (item: IEvent) => {
      if (isOpen === item.id) {
        return <EventFormComponent event={item} setIsOpen={handleIsOpen} />;
      }

      return (
        <EventComponent event={item} onEdit={handleIsOpen} disabled={isToday} />
      );
    },
    [isOpen, events],
  );

  return (
    <SafeAreaView style={styles.outerContainer} edges={['top']}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.innerContainer}>
          <CalendarComponent
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <View style={styles.eventsContainer}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              data={filteredEvent}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item, index) => item.id + `${index}`}
              ListEmptyComponent={
                <Text style={styles.noEvents}>
                  You don't have any events for this day
                </Text>
              }
              initialNumToRender={20}
            />
            {isToday && (
              <>
                <TouchableOpacity
                  style={styles.addBtnContainer}
                  onPress={() => handleIsOpen('form')}
                >
                  <LinearGradient
                    style={styles.addBtnGradient}
                    colors={COLORS.yellowGradient}
                  >
                    <Text style={styles.plusIcon}>+</Text>
                  </LinearGradient>
                  <Text style={styles.addBtnText}>Create New Event</Text>
                </TouchableOpacity>

                <Animated.View style={[animatedStyle, styles.animated]}>
                  <EventFormComponent
                    event={newEvent}
                    setIsOpen={handleIsOpen}
                  />
                </Animated.View>
              </>
            )}
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
