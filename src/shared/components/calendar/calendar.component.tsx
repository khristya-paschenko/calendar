import { Calendar } from 'react-native-calendars';
import { COLORS } from '~/shared/styles/colors';
import { FONTS } from '~/shared/styles/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '~/shared/components/calendar/calendar.styles';

type CalendarComponent = {
  setSelectedDate: (date: string) => void;
  selectedDate: string;
};
export const CalendarComponent = ({
  setSelectedDate,
  selectedDate,
}: CalendarComponent) => {
  const selected = new Date(selectedDate).toISOString().split('T')[0];
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(date) => setSelectedDate(date.dateString)}
        markingType="custom"
        markedDates={{
          '2025-02-27': { marked: true },
          '2025-02-24': { inactive: true },
          [selected]: { selected: true },
        }}
        theme={{
          arrowColor: COLORS.black,
          calendarBackground: COLORS.white,
          monthTextColor: COLORS.black,
          textMonthFontFamily: FONTS.inter.semiBold,
        }}
        dayComponent={({ date, state, marking, onPress }) => {
          if (state === 'today' && state !== 'disabled') {
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
                  state === 'disabled' && styles.dayContainerDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    marking?.selected && styles.dayTextSelected,
                    marking?.marked && styles.dayTextMarked,
                    marking?.inactive && styles.dayTextMarkedInactive,
                    state === 'disabled' && styles.dayTextDisabled,
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
