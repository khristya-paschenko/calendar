import RNDateTimePicker from '@react-native-community/datetimepicker';

type DatePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
};
export const DatePicker = ({ datetime, onChange }: DatePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      display="spinner"
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
