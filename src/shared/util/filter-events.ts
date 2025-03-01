import { IEvent, ERepeat } from '~/shared/context/calendar/calendar.types';

export const filterEvents = (
  selectedDay: string,
  events: IEvent[],
): IEvent[] => {
  const selectedDate = new Date(selectedDay).toISOString().split('T')[0];
  const filteredEvents: IEvent[] = [];

  events.forEach((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const eventDuration = eventEndDate.getTime() - eventStartDate.getTime();

    if (
      eventStartDate.toISOString().split('T')[0] === selectedDate ||
      eventEndDate.toISOString().split('T')[0] === selectedDate ||
      (eventStartDate <= selectedDate && eventEndDate >= selectedDate)
    ) {
      filteredEvents.push(event);
      return;
    }

    if (event.repeat !== ERepeat.ONCE) {
      let repeatDate = new Date(event.startDate);
      while (repeatDate.toISOString().split('T')[0] <= selectedDate) {
        let repeatStart = new Date(repeatDate);
        let repeatEnd = new Date(repeatStart.getTime() + eventDuration);

        if (
          repeatStart.toISOString().split('T')[0] === selectedDay ||
          repeatEnd.toISOString().split('T')[0] === selectedDay ||
          (repeatStart <= selectedDate && repeatEnd >= selectedDate)
        ) {
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
