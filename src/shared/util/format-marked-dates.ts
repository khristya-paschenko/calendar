import { ERepeat, IEvent } from '~/shared/context/calendar/calendar.types';
import { MarkedDates } from 'react-native-calendars/src/types';

export const formatMarkedDates = (
  events: IEvent[],
): Record<string, { marked?: boolean; inactive?: boolean }> => {
  const markedDates: MarkedDates = {};
  const today = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format

  // Helper function to check if a date is in the past
  const isPast = (date: string): boolean => new Date(date) < new Date(today);

  // Function to mark events on multiple days (including repeats)
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

  // Function to handle repeating events
  const handleRepeatingEvent = (event: IEvent) => {
    let repeatDate = new Date(event.startDate);
    const eventDuration =
      new Date(event.endDate).getTime() - new Date(event.startDate).getTime();

    while (repeatDate <= new Date(today)) {
      let tempStart = new Date(repeatDate);
      let tempEnd = new Date(tempStart.getTime() + eventDuration);

      while (tempStart <= tempEnd) {
        const formattedDate = tempStart.toISOString().split('T')[0];
        markDate(formattedDate, !isPast(formattedDate));
        tempStart.setDate(tempStart.getDate() + 1);
      }

      // Move to the next occurrence
      if (event.repeat === ERepeat.WEEKLY)
        repeatDate.setDate(repeatDate.getDate() + 7);
      else if (event.repeat === ERepeat.BI_WEEKLY)
        repeatDate.setDate(repeatDate.getDate() + 14);
      else if (event.repeat === ERepeat.MONTHLY)
        repeatDate.setMonth(repeatDate.getMonth() + 1);
    }
  };

  // Process each event
  events.forEach((event) => {
    let start = new Date(event.startDate);
    let end = new Date(event.endDate);

    // Mark each day within event duration
    while (start <= end) {
      const formattedDate = start.toISOString().split('T')[0];
      markDate(formattedDate, !isPast(formattedDate));
      start.setDate(start.getDate() + 1);
    }

    // Handle repeating events
    if (event.repeat !== ERepeat.ONCE) {
      handleRepeatingEvent(event);
    }
  });

  return markedDates;
};
