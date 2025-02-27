import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

type TimePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
};
export const TimePicker = ({
  datetime,
  onChange,
  minDate,
}: TimePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      mode="time"
      minimumDate={minDate}
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
