import { Dimensions, Text, View } from 'react-native';
import { IEvent } from '~/shared/context/calendar/calendar.types';
import { Input } from '~/shared/components/input/input.component';
import { useState } from 'react';
import { styles } from '~/modules/components/event-form/event-form.styles';
import { Select } from '~/shared/components/select/select.component';
import { BtnGradientComponent } from '~/shared/components/btn-gradient/btn-gradient.component';
import { COLORS } from '~/shared/styles/colors';
import { formatDate } from '~/shared/util/format-date';
import Animated from 'react-native-reanimated';
import { InputBtn } from '~/shared/components/input-btn/input-btn.component';
import { formatTime } from '~/shared/util/format-time';
import { DatePicker } from '~/shared/components/date-picker/date-picker.component';
import { TimePicker } from '~/shared/components/time-picker/time-picker.component';

type EventProps = {
  event: Omit<IEvent, 'id'> & { id?: string };
};
export const EventFormComponent = ({ event }: EventProps) => {
  const [name, setName] = useState<string>(event.name);
  const selectedDate = new Date(event.startDate);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date>(selectedDate);

  const [endDate, setEndDate] = useState<Date>(() => {
    const newDate = new Date(selectedDate);
    newDate.setHours(newDate.getHours() + 1);
    return newDate;
  });

  const width = Dimensions.get('window').width;
  return (
    <Animated.View style={styles.container}>
      <Input label="Event Name" value={name} onChange={(v) => setName(v)} />

      <View style={styles.dateTimeContainer}>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Starts</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatDate(startDate)}
                onPress={() => setOpenStartDate((isOpen) => !isOpen)}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatTime(startDate)}
                onPress={() => setOpenStartDate((isOpen) => !isOpen)}
              />
            </View>
          </View>
          <Animated.View style={styles.animated}>
            <TimePicker datetime={selectedDate} />
          </Animated.View>
          <Animated.View style={styles.animated}>
            <DatePicker date={selectedDate} />
          </Animated.View>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Ends</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatDate(endDate)}
                onPress={() => setOpenStartDate((isOpen) => !isOpen)}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatTime(endDate)}
                onPress={() => setOpenStartDate((isOpen) => !isOpen)}
              />
            </View>
          </View>
          <Animated.View style={styles.animated}>
            <TimePicker datetime={selectedDate} />
          </Animated.View>

          <Animated.View style={styles.animated}>
            <DatePicker date={selectedDate} />
          </Animated.View>
        </View>
      </View>

      <Select />

      <BtnGradientComponent
        colors={COLORS.yellowGradient}
        text="Save"
        onPress={() => {}}
      />
    </Animated.View>
  );
};
