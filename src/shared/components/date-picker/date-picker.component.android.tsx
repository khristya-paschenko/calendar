import RNDateTimePicker from '@react-native-community/datetimepicker';

type DatePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
};
export const DatePicker = ({
  datetime,
  onChange,
  minDate,
}: DatePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      minimumDate={minDate}
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
