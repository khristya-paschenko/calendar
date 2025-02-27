import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

type TimePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
};
export const TimePicker = ({ datetime, onChange }: TimePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      mode="time"
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
