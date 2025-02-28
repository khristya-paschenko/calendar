import { Calendar } from 'react-native-calendars';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '~/shared/components/calendar/calendar.styles';
import { useCalendarContext } from '~/shared/context/calendar/calendar.context';
import { formatMarkedDates } from '~/shared/util/format-marked-dates';

type CalendarComponent = {
  setSelectedDate: (date: string) => void;
  selectedDate: string;
};
export const CalendarComponent = ({
  setSelectedDate,
  selectedDate,
}: CalendarComponent) => {
  const selected = new Date(selectedDate).toISOString().split('T')[0];
  const { events } = useCalendarContext();

  const markedEvents = formatMarkedDates(events);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(date) => setSelectedDate(date.dateString)}
        markingType="custom"
        markedDates={{
          ...markedEvents,
          [selected]: { selected: true },
        }}
        theme={{
          arrowColor: COLORS.black,
          calendarBackground: COLORS.white,
          monthTextColor: COLORS.black,
          textMonthFontFamily: FONTS.inter.semiBold,
        }}
        dayComponent={({ date, state, marking, onPress }) => {
          if (state === 'disabled') {
            return <View style={styles.dayContainer}></View>;
          } else if (state === 'today') {
            return (
              <TouchableOpacity onPress={() => (onPress ? onPress(date) : {})}>
                <LinearGradient
                  style={styles.dayContainer}
                  colors={COLORS.yellowGradient}
                >
                  <Text style={styles.dayTextToday}>{date?.day}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => (onPress ? onPress(date) : {})}
                style={[
                  styles.dayContainer,
                  marking?.marked && styles.dayContainerMarked,
                  marking?.inactive && styles.dayContainerMarkedInactive,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    marking?.selected && styles.dayTextSelected,
                    marking?.marked && styles.dayTextMarked,
                    marking?.inactive && styles.dayTextMarkedInactive,
                  ]}
                >
                  {date?.day}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};
