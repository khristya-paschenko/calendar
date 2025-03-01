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
export const CalendarScreen = () => {
  const { events } = useCalendarContext();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(today.toString());
  const [expanded, setExpanded] = useState<boolean>(false);
  const heightValue = useSharedValue(0);
  const [isEditing, setIsEditing] = useState<string>('');

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    heightValue.value = expanded ? withTiming(0) : withTiming(640);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    opacity: heightValue.value > 0 ? 1 : 0,
  }));

  const newEvent = useMemo(() => {
    return {
      name: '',
      endDate: selectedDate,
      startDate: selectedDate,
      repeat: ERepeat.ONCE,
    };
  }, [selectedDate]);

  const filteredEvent = useMemo(() => {
    return filterEvents(selectedDate, events);
  }, [selectedDate, events]);

  const renderItem = useCallback(
    (item: IEvent) => {
      if (isEditing === item.id) {
        return <EventFormComponent event={item} setIsEditing={setIsEditing} />;
      }

      return <EventComponent event={item} onEdit={setIsEditing} />;
    },
    [isEditing, events],
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
            <TouchableOpacity
              style={styles.addBtnContainer}
              onPress={toggleExpand}
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
              <EventFormComponent event={newEvent} />
            </Animated.View>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
