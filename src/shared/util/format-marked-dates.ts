import { ERepeat, IEvent } from '~/shared/context/calendar/calendar.types';
import { MarkedDates } from 'react-native-calendars/src/types';
import {
  parseISO,
  addDays,
  addWeeks,
  addMonths,
  isBefore,
  format,
  addYears,
} from 'date-fns';

export const formatMarkedDates = (events: IEvent[]): MarkedDates => {
  const markedDates: MarkedDates = {};
  const today = format(new Date(), 'yyyy-MM-dd');

  const isPast = (date: string): boolean =>
    isBefore(new Date(date), new Date(today));

  const markDate = (date: string, marked: boolean) => {
    if (!markedDates[date]) {
      markedDates[date] = {};
    }
    if (marked) {
      markedDates[date].marked = true;
    } else {
      markedDates[date].inactive = true;
    }
  };

  const handleRepeatingEvent = (event: IEvent) => {
    let repeatDate = new Date(event.startDate);
    const eventDuration =
      new Date(event.endDate).getTime() - new Date(event.startDate).getTime();
    const oneYearFromNow = addYears(new Date(), 1);

    while (!isBefore(oneYearFromNow, repeatDate)) {
      let tempStart = repeatDate;
      let tempEnd = new Date(tempStart.getTime() + eventDuration);

      while (!isBefore(tempEnd, tempStart)) {
        const formattedDate = format(tempStart, 'yyyy-MM-dd');
        markDate(formattedDate, !isPast(formattedDate));
        tempStart = addDays(tempStart, 1);
      }

      if (event.repeat === ERepeat.WEEKLY) {
        repeatDate = addWeeks(repeatDate, 1);
      } else if (event.repeat === ERepeat.BI_WEEKLY) {
        repeatDate = addWeeks(repeatDate, 2);
      } else if (event.repeat === ERepeat.MONTHLY) {
        repeatDate = addMonths(repeatDate, 1);
      }
    }
  };

  events.forEach((event) => {
    let start = new Date(event.startDate);
    let end = new Date(event.endDate);

    while (!isBefore(end, start)) {
      const formattedDate = format(start, 'yyyy-MM-dd');
      markDate(formattedDate, !isPast(formattedDate));
      start = addDays(start, 1);
    }

    if (event.repeat !== ERepeat.ONCE) {
      handleRepeatingEvent(event);
    }
  });

  return markedDates;
};
