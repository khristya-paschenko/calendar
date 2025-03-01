import { ERepeat, IEvent } from '~/shared/context/calendar/calendar.types';
import { MarkedDates } from 'react-native-calendars/src/types';

export const formatMarkedDates = (events: IEvent[]): MarkedDates => {
  const markedDates: MarkedDates = {};
  const today = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format

  const isPast = (date: string): boolean => new Date(date) < new Date(today);

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

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    while (repeatDate <= oneYearFromNow) {
      let tempStart = new Date(repeatDate);
      let tempEnd = new Date(tempStart.getTime() + eventDuration);

      while (tempStart <= tempEnd) {
        const formattedDate = tempStart.toISOString().split('T')[0];
        markDate(formattedDate, !isPast(formattedDate));
        tempStart.setDate(tempStart.getDate() + 1);
      }

      if (event.repeat === ERepeat.WEEKLY) {
        repeatDate.setDate(repeatDate.getDate() + 7);
      } else if (event.repeat === ERepeat.BI_WEEKLY) {
        repeatDate.setDate(repeatDate.getDate() + 14);
      } else if (event.repeat === ERepeat.MONTHLY) {
        repeatDate.setMonth(repeatDate.getMonth() + 1);
      }
    }
  };
  events.forEach((event) => {
    let start = new Date(event.startDate);
    let end = new Date(event.endDate);

    while (start <= end) {
      const formattedDate = start.toISOString().split('T')[0];
      markDate(formattedDate, !isPast(formattedDate));
      start.setDate(start.getDate() + 1);
    }

    if (event.repeat !== ERepeat.ONCE) {
      handleRepeatingEvent(event);
    }
  });

  return markedDates;
};
