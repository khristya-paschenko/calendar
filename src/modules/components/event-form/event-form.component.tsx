import { Dimensions, Text, View } from 'react-native';
import { IEvent } from '~/shared/context/calendar/calendar.types';
import { Input } from '~/shared/components/input/input.component';
import { useState } from 'react';
import { styles } from '~/modules/components/event-form/event-form.styles';
import { Select } from '~/shared/components/select/select.component';
import { BtnGradientComponent } from '~/shared/components/btn-gradient/btn-gradient.component';
import { COLORS } from '~/shared/styles/colors';
import { formatDate } from '~/shared/util/format-date';

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
  const [startDate, setStartDate] = useState<Date>(selectedDate);
  const [endDate, setEndDate] = useState<Date>(() => {
    const newDate = new Date(selectedDate);
    newDate.setHours(newDate.getHours() + 1);
    return newDate;
  });

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);

  const toggleStartDatePicker = () => {
    setOpenStartDatePicker((prev) => !prev);
    setOpenStartTimePicker(false);
    setOpenEndTimePicker(false);
    setOpenEndDatePicker(false);
  };

  const toggleStartTimePicker = () => {
    setOpenStartTimePicker((prev) => !prev);
    setOpenStartDatePicker(false);
    setOpenEndTimePicker(false);
    setOpenEndDatePicker(false);
  };

  const toggleEndDatePicker = () => {
    setOpenEndDatePicker((prev) => !prev);
    setOpenEndTimePicker(false);
    setOpenStartDatePicker(false);
    setOpenStartTimePicker(false);
  };

  const toggleEndTimePicker = () => {
    setOpenEndTimePicker((prev) => !prev);
    setOpenEndDatePicker(false);
    setOpenStartDatePicker(false);
    setOpenStartTimePicker(false);
  };

  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Input label="Event Name" value={name} onChange={(v) => setName(v)} />

      <View style={styles.dateTimeContainer}>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Starts</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatDate(startDate)}
                onPress={toggleStartDatePicker}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatTime(startDate)}
                onPress={toggleStartTimePicker}
              />
            </View>
          </View>
          <View
            style={[
              styles.animated,
              openStartDatePicker ? styles.visible : styles.hidden,
            ]}
          >
            <DatePicker datetime={startDate} onChange={setStartDate} />
          </View>

          <View
            style={[
              styles.animated,
              openStartTimePicker ? styles.visible : styles.hidden,
            ]}
          >
            <TimePicker datetime={startDate} onChange={setStartDate} />
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Ends</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatDate(endDate)}
                onPress={toggleEndDatePicker}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatTime(endDate)}
                onPress={toggleEndTimePicker}
              />
            </View>
          </View>

          <View
            style={[
              styles.animated,
              openEndDatePicker ? styles.visible : styles.hidden,
            ]}
          >
            <DatePicker datetime={endDate} onChange={setEndDate} />
          </View>

          <View
            style={[
              styles.animated,
              openEndTimePicker ? styles.visible : styles.hidden,
            ]}
          >
            <TimePicker datetime={endDate} onChange={setEndDate} />
          </View>
        </View>
      </View>

      <Select />

      <BtnGradientComponent
        colors={COLORS.yellowGradient}
        text="Save"
        onPress={() => {}}
      />
    </View>
  );
};
