import RNDateTimePicker from '@react-native-community/datetimepicker';

type TimePickerProps = {
  datetime: Date;
  onChange: (date: Date) => void;
};
export const TimePicker = ({ datetime, onChange }: TimePickerProps) => {
  return (
    <RNDateTimePicker
      value={datetime}
      mode="time"
      display="spinner"
      onChange={(e, date) => onChange(date || datetime)}
    />
  );
};
