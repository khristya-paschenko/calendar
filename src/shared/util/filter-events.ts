import { IEvent, ERepeat } from '~/shared/context/calendar/calendar.types';

export const filterEvents = (
  selectedDay: string,
  events: IEvent[],
): IEvent[] => {
  const selectedDate = new Date(selectedDay);
  const selectedISO = selectedDate.toISOString().split('T')[0];
  const filteredEvents: IEvent[] = [];

  events.forEach((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const eventDuration = eventEndDate.getTime() - eventStartDate.getTime();

    // Check if event spans over multiple days and includes the selected day
    if (eventStartDate <= selectedDate && eventEndDate >= selectedDate) {
      filteredEvents.push(event);
      return;
    }

    // Handle recurring events
    if (event.repeat !== ERepeat.ONCE) {
      let repeatDate = new Date(event.startDate);
      while (repeatDate <= selectedDate) {
        let repeatEnd = new Date(repeatDate.getTime() + eventDuration);

        if (repeatDate <= selectedDate && repeatEnd >= selectedDate) {
          filteredEvents.push(event);
          break;
        }

        if (event.repeat === ERepeat.WEEKLY) {
          repeatDate.setDate(repeatDate.getDate() + 7);
        } else if (event.repeat === ERepeat.BI_WEEKLY) {
          repeatDate.setDate(repeatDate.getDate() + 14);
        } else if (event.repeat === ERepeat.MONTHLY) {
          repeatDate.setMonth(repeatDate.getMonth() + 1);
        }
      }
    }
  });

  return filteredEvents;
};
