import RNDateTimePicker from '@react-native-community/datetimepicker';

type TimePickerProps = {
  datetime: Date;
};
export const TimePicker = ({ datetime }: TimePickerProps) => {
  return <RNDateTimePicker value={datetime} mode="time" display="spinner" />;
};
