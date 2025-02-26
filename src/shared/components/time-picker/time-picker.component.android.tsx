import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type TimePickerProps = {
  datetime: Date;
};
export const TimePicker = ({ datetime }: TimePickerProps) => {
  return (
    <DateTimePickerAndroid value={datetime} mode="time" display="spinner" />
  );
};
