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
import { useCallback, useEffect, useMemo, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { filterEvents } from '~/shared/util/filter-events';
import { EventComponent } from '~/modules/components/event/event.component';
import PlusIcon from '~/../assets/icons/plus-icon.svg';
import MinusIcon from '~/../assets/icons/minus-icon.svg';

export const CalendarScreen = () => {
  const { events } = useCalendarContext();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(today.toString());
  const heightValue = useSharedValue(0);
  const [isOpen, setIsOpen] = useState<string | '' | 'form'>('');
  const [isInFuture, setIsInFuture] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Omit<IEvent, 'id'>>({
    name: '',
    endDate:
      new Date(selectedDate).toISOString().split('T')[0] ===
      today.toISOString().split('T')[0]
        ? today.toISOString()
        : selectedDate,
    startDate:
      new Date(selectedDate).toISOString().split('T')[0] ===
      today.toISOString().split('T')[0]
        ? today.toISOString()
        : selectedDate,
    repeat: ERepeat.ONCE,
  });

  const handleIsOpen = (option: string) => {
    if (option === 'form') {
      let res;
      setIsOpen((prev) => {
        if (prev === option) {
          res = '';
          return res;
        }
        res = option;

        return res;
      });
      heightValue.value = res === 'form' ? withTiming(580) : withTiming(0);
    } else {
      setIsOpen(option);
      heightValue.value = withTiming(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    opacity: heightValue.value > 0 ? 1 : 0,
  }));

  useEffect(() => {
    setNewEvent({
      name: '',
      endDate:
        new Date(selectedDate).toISOString().split('T')[0] ===
        today.toISOString().split('T')[0]
          ? today.toISOString()
          : selectedDate,
      startDate:
        new Date(selectedDate).toISOString().split('T')[0] ===
        today.toISOString().split('T')[0]
          ? today.toISOString()
          : selectedDate,
      repeat: ERepeat.ONCE,
    });
    setIsInFuture(
      today.toISOString().split('T')[0] <=
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
        <EventComponent
          event={item}
          onEdit={handleIsOpen}
          disabled={isInFuture}
        />
      );
    },
    [isOpen, events, isInFuture],
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
            {isInFuture && (
              <>
                <TouchableOpacity
                  style={styles.addBtnContainer}
                  onPress={() => handleIsOpen('form')}
                >
                  <LinearGradient
                    style={styles.addBtnGradient}
                    colors={COLORS.yellowGradient}
                  >
                    {isOpen === 'form' ? (
                      <MinusIcon width={18} height={18} fill={COLORS.white} />
                    ) : (
                      <PlusIcon width={18} height={18} fill={COLORS.white} />
                    )}
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
