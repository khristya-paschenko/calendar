import { Text, View } from 'react-native';
import { IEvent } from '~/shared/context/calendar/calendar.types';

type EventProps = {
  event: IEvent;
};
export const EventComponent = ({ event }: EventProps) => {
  return (
    <View>
      <Text>Event component</Text>
    </View>
  );
};
