import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type DatePickerProps = {
  date: Date;
};
export const DatePicker = ({ date }: DatePickerProps) => {
  return <DateTimePickerAndroid value={date} display="spinner" />;
};
