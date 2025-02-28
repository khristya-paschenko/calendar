import { IEvent, ERepeat } from '~/shared/context/calendar/calendar.types';

export const filterEvents = (
  selectedDay: string,
  events: IEvent[],
): IEvent[] => {
  const selectedDate = new Date(selectedDay);

  return events.filter((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    const isEventOnSelectedDay =
      (eventStartDate <= selectedDate && eventEndDate >= selectedDate) ||
      eventStartDate.toISOString().split('T')[0] === selectedDay ||
      eventEndDate.toISOString().split('T')[0] === selectedDay;

    if (event.repeat === ERepeat.ONCE) {
      return isEventOnSelectedDay;
    }

    let tempDate = new Date(event.startDate);
    const eventDuration = eventEndDate.getTime() - eventStartDate.getTime();
    const repeats = event.repeat;
    let eventOccursOnSelectedDay = false;

    while (tempDate <= selectedDate) {
      const repeatStart = new Date(tempDate);
      const repeatEnd = new Date(tempDate);
      repeatEnd.setTime(repeatEnd.getTime() + eventDuration);

      if (isEventOnSelectedDay) {
        eventOccursOnSelectedDay = true;
        break;
      }

      if (repeats === ERepeat.WEEKLY) {
        tempDate.setDate(tempDate.getDate() + 7);
      } else if (repeats === ERepeat.BI_WEEKLY) {
        tempDate.setDate(tempDate.getDate() + 14);
      } else if (repeats === ERepeat.MONTHLY) {
        tempDate.setMonth(tempDate.getMonth() + 1);
      }
    }

    return eventOccursOnSelectedDay;
  });
};
