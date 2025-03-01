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
import Animated from 'react-native-reanimated';

type TPicker = 'startTime' | 'startDate' | 'endTime' | 'endDate' | null;

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

  const { option } = useContext<BottomSheetContext>(BottomSheetContext);

  const { onSubmit, error } = useValidateEvent(() => {
    setStartDate(new Date(event.startDate));
    // setEndDate(() => {
    //   const newDate = new Date(event.endDate);
    //   newDate.setHours(newDate.getHours() + 1);
    //   return newDate;
    // });
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

  const [isOpenPicker, setIsOpenPicker] = useState<TPicker>(null);

  const togglePicker = (option: TPicker) => {
    setIsOpenPicker((current) => (current === option ? null : option));
  };

  const width = Dimensions.get('window').width;

  const platform = Platform.OS;
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
                onPress={() => togglePicker('startDate')}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
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
                containerStyles={{ width: width * 0.3 }}
                text={formatDate(endDate)}
                onPress={() => togglePicker('endDate')}
              />
              <InputBtn
                containerStyles={{ width: width * 0.3 }}
                text={formatTime(endDate)}
                onPress={() => togglePicker('endTime')}
              />
            </View>
          </View>

          {isOpenPicker && (
            <Animated.View style={[styles.animated]}>
              <DateTimePicker
                datetime={
                  ['startDate', 'startTime'].includes(isOpenPicker)
                    ? startDate
                    : endDate
                }
                onChange={
                  ['startDate', 'startTime'].includes(isOpenPicker)
                    ? setStartDate
                    : setEndDate
                }
                platform={platform}
                mode={
                  ['startDate', 'endDate'].includes(isOpenPicker)
                    ? 'date'
                    : 'time'
                }
                minDate={
                  (['startDate', 'startTime', 'endDate'].includes(
                    isOpenPicker,
                  ) &&
                    startDate) ||
                  (isOpenPicker === 'endTime' &&
                    new Date(
                      new Date(startDate).setMinutes(
                        new Date(startDate).getMinutes() + 1,
                      ),
                    ))
                }
              />
            </Animated.View>
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
