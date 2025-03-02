import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { Platform } from 'react-native';

type DatePickerProps = {
  datetime: Date;
  onChange: (date: Date, event: DateTimePickerEvent) => void;
  minDate?: Date;
  mode: 'date' | 'time';
};
export const DateTimePicker = ({
  datetime,
  onChange,
  minDate,
  mode,
}: DatePickerProps) => {
  const platform = Platform.OS;

  return (
    <RNDateTimePicker
      value={datetime}
      display={platform === 'web' ? 'default' : 'spinner'}
      minimumDate={minDate}
      mode={mode}
      onChange={(e, date) => onChange(date || datetime, e)}
    />
  );
};
