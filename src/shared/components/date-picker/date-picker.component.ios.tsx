import RNDateTimePicker from '@react-native-community/datetimepicker';

type DatePickerProps = {
  date: Date;
};
export const DatePicker = ({ date }: DatePickerProps) => {
  return <RNDateTimePicker value={date} display="spinner" />;
};
