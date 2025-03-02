import {
  parseISO,
  isBefore,
  isAfter,
  addWeeks,
  addMonths,
  addDays,
  parse,
  isWithinInterval,
  isSameDay,
} from 'date-fns';
import { IEvent, ERepeat } from '~/shared/context/calendar/calendar.types';
import { Stack } from 'expo-router';
import { weekDayNames } from 'react-native-calendars/src/dateutils';

export const filterEvents = (
  selectedDay: string,
  events: IEvent[],
): IEvent[] => {
  const selectedDate = new Date(selectedDay);
  const filteredEvents: IEvent[] = [];

  events.forEach((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const eventDuration = eventEndDate.getTime() - eventStartDate.getTime();

    if (
      isSameDay(selectedDate, eventStartDate) ||
      isWithinInterval(selectedDate, {
        start: eventStartDate,
        end: eventEndDate,
      })
    ) {
      filteredEvents.push(event);
      return;
    }

    if (event.repeat !== ERepeat.ONCE) {
      let repeatDate = eventStartDate;

      while (!isAfter(repeatDate, selectedDate)) {
        let repeatEnd = new Date(repeatDate.getTime() + eventDuration);

        if (
          isWithinInterval(selectedDate, { start: repeatDate, end: repeatEnd })
        ) {
          filteredEvents.push(event);
          break;
        }

        if (event.repeat === ERepeat.WEEKLY) {
          repeatDate = addWeeks(repeatDate, 1);
        } else if (event.repeat === ERepeat.BI_WEEKLY) {
          repeatDate = addWeeks(repeatDate, 2);
        } else if (event.repeat === ERepeat.MONTHLY) {
          repeatDate = addMonths(repeatDate, 1);
        }
      }
    }
  });

  return filteredEvents;
};
