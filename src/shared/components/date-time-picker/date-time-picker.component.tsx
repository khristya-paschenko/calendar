import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

type DatePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  platform: typeof Platform.OS;
  mode: 'date' | 'time';
};
export const DateTimePicker = ({
  datetime,
  onChange,
  minDate,
  platform,
  mode,
}: DatePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      display={platform === 'ios' ? 'spinner' : 'default'}
      minimumDate={minDate}
      mode={mode}
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
