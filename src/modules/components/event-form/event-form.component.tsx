import { Dimensions, Platform, Text, View } from 'react-native';
import { IEvent } from '~/shared/context/calendar/calendar.types';
import { Input } from '~/shared/components/input/input.component';
import { memo, useContext, useEffect, useState } from 'react';
import { styles } from '~/modules/components/event-form/event-form.styles';
import { Select } from '~/shared/components/select/select.component';
import { BtnGradientComponent } from '~/shared/components/btn-gradient/btn-gradient.component';
import { COLORS } from '~/shared/styles/colors';
import { formatDate } from '~/shared/util/format-date';

import { InputBtn } from '~/shared/components/input-btn/input-btn.component';
import { formatTime } from '~/shared/util/format-time';
import { useValidateEvent } from '~/shared/hooks/useValidateEvent';
import { BottomSheetContext } from '~/shared/context/bottom-sheet/bottom-sheet.context';
import { DateTimePicker } from '~/shared/components/date-time-picker/date-time-picker.component';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type TPicker = 'startTime' | 'startDate' | 'endTime' | 'endDate' | '';

type EventProps = {
  event: Omit<IEvent, 'id'> & { id?: string };
  setIsOpen: (option: string) => void;
};
export const EventFormComponent = memo(({ event, setIsOpen }: EventProps) => {
  const [name, setName] = useState<string>(event.name);
  const [startDate, setStartDate] = useState<Date>(new Date(event.startDate));
  const [endDate, setEndDate] = useState<Date>(() => {
    const newDate = new Date(event.endDate);
    newDate.setHours(newDate.getHours() + 1);
    return newDate;
  });
  const [isOpenPicker, setIsOpenPicker] = useState<TPicker>('');
  const heightValue = useSharedValue(0);
  const platform = Platform.OS;
  const width = Dimensions.get('window').width;

  const { option } = useContext<BottomSheetContext>(BottomSheetContext);

  const { onSubmit, error } = useValidateEvent(() => {
    setName(event.name);
    setIsOpen('');
  });

  useEffect(() => {
    setStartDate(new Date(event.startDate));
    setEndDate(() => {
      const newDate = new Date(event.endDate);
      newDate.setHours(newDate.getHours() + 1);
      return newDate;
    });
  }, [event]);

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(() => {
        const newDate = new Date(startDate);
        newDate.setHours(newDate.getHours() + 1);
        return newDate;
      });
    }
  }, [startDate]);

  const handleSubmit = () => {
    onSubmit({
      id: event?.id,
      name,
      startDate,
      endDate,
      repeat: option,
    });
  };

  const togglePicker = (option: TPicker) => {
    setIsOpenPicker((current) => {
      let res;
      if (current === option) {
        res = '';
      } else {
        res = option;
      }
      heightValue.value = res ? withTiming(200) : withTiming(0);

      return res;
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    opacity: heightValue.value > 0 ? 1 : 0,
  }));

  const handleOnChange = (date: Date, event: DateTimePickerEvent) => {
    if (['startDate', 'startTime'].includes(isOpenPicker)) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    if (platform === 'android') {
      if (event.type) {
        setIsOpenPicker('');
      }
    }
  };

  const dateTimePicker = (
    <DateTimePicker
      datetime={
        ['startDate', 'startTime'].includes(isOpenPicker) ? startDate : endDate
      }
      onChange={handleOnChange}
      platform={platform}
      mode={['startDate', 'endDate'].includes(isOpenPicker) ? 'date' : 'time'}
      minDate={
        (['startDate', 'startTime', 'endDate'].includes(isOpenPicker) &&
          new Date(event.startDate)) ||
        (isOpenPicker === 'endTime' &&
          new Date(
            new Date(startDate).setMinutes(
              new Date(startDate).getMinutes() + 1,
            ),
          ))
      }
    />
  );

  return (
    <View style={styles.container}>
      <Input label="Event Name" value={name} onChange={(v) => setName(v)} />

      <View style={styles.dateTimeContainer}>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Starts</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={[
                  { width: width * 0.3 },
                  isOpenPicker === 'startDate' && styles.selected,
                ]}
                text={formatDate(startDate)}
                onPress={() => togglePicker('startDate')}
              />
              <InputBtn
                containerStyles={[
                  { width: width * 0.3 },
                  isOpenPicker === 'startTime' && styles.selected,
                ]}
                text={formatTime(startDate)}
                onPress={() => togglePicker('startTime')}
              />
            </View>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Ends</Text>

            <View style={styles.btnContainer}>
              <InputBtn
                containerStyles={[
                  { width: width * 0.3 },
                  isOpenPicker === 'endDate' && styles.selected,
                ]}
                text={formatDate(endDate)}
                onPress={() => togglePicker('endDate')}
              />
              <InputBtn
                containerStyles={[
                  { width: width * 0.3 },
                  isOpenPicker === 'endTime' && styles.selected,
                ]}
                text={formatTime(endDate)}
                onPress={() => togglePicker('endTime')}
              />
            </View>
          </View>

          {platform === 'ios' ? (
            <Animated.View style={[styles.animated, animatedStyle]}>
              {dateTimePicker}
            </Animated.View>
          ) : (
            isOpenPicker && dateTimePicker
          )}
        </View>
      </View>

      <Select />

      {error && <Text style={styles.error}>{error}</Text>}

      <BtnGradientComponent
        colors={COLORS.yellowGradient}
        text="Save"
        onPress={handleSubmit}
      />
    </View>
  );
});
