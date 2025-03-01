import { Text, TouchableOpacity, View } from 'react-native';
import Trash from '~/../assets/icons/trash.svg';
import Pencil from '~/../assets/icons/pencil.svg';
import CalendarIcon from '~/../assets/icons/calendar.svg';
import TimerIcon from '~/../assets/icons/timer.svg';
import { COLORS } from '~/shared/styles/colors';
import { ERepeatText, IEvent } from '~/shared/context/calendar/calendar.types';
import { useCalendarContext } from '~/shared/context/calendar/calendar.context';
import { styles } from '~/modules/components/event/event.styles';
import { formatDate } from '~/shared/util/format-date';
import { formatTime } from '~/shared/util/format-time';

type EventProps = {
  event: IEvent;
  onEdit: (id: string) => void;
  disabled: boolean;
};
export const EventComponent = ({ event, onEdit, disabled }: EventProps) => {
  const { deleteEvent } = useCalendarContext();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{event.name}</Text>
        <View style={styles.btnContainer}>
          {disabled && (
            <TouchableOpacity onPress={() => onEdit(event.id)}>
              <Pencil width={25} height={25} fill={COLORS.yellow} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => deleteEvent(event.id)}>
            <Trash width={25} height={25} fill={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.iconContainer}>
            <CalendarIcon fill={COLORS.gray} />
            <Text style={styles.info}>
              {formatDate(new Date(event.startDate)) +
                ' - ' +
                formatDate(new Date(event.startDate))}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <TimerIcon fill={COLORS.gray} />
            <Text style={styles.info}>
              {formatTime(new Date(event.startDate)) +
                ' - ' +
                formatTime(new Date(event.endDate))}
            </Text>
          </View>
        </View>

        <Text style={styles.info}>
          {'Repeat: ' + ERepeatText[event.repeat]}
        </Text>
      </View>
    </View>
  );
};
