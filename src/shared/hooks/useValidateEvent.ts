import { ERepeat, IEvent } from '~/shared/context/calendar/calendar.types';
import { useCalendarContext } from '~/shared/context/calendar/calendar.context';
import { useState } from 'react';

type Response = {
  isPending: boolean;
  error: string | null;
  onSubmit: (newEvent: Omit<IEvent, 'id'> & { id?: string }) => void;
  savedSuccessfully: boolean;
};

export const useValidateEvent = (): Response => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const { events, editEvent, addEvent } = useCalendarContext();

  const checkOverlap = (
    event1: Omit<IEvent, 'id'> & { id?: string },
    event2: IEvent,
  ): boolean => {
    return (
      event1.startDate < event2.endDate && event1.endDate > event2.startDate
    );
  };

  const doesConflict = (
    newEvent: Omit<IEvent, 'id'> & { id?: string },
    events: IEvent[],
  ): boolean => {
    return events.some((existingEvent) => {
      if (newEvent.id && existingEvent.id === newEvent.id) return false;

      if (checkOverlap(newEvent, existingEvent)) return true;

      if (existingEvent.repeat !== ERepeat.ONCE) {
        let tempDate = new Date(existingEvent.startDate);
        const endDate = new Date(existingEvent.endDate);

        while (tempDate <= endDate) {
          const repeatStart = new Date(tempDate);
          const repeatEnd = new Date(tempDate);
          repeatEnd.setTime(
            repeatEnd.getTime() +
              (new Date(existingEvent.endDate).getTime() -
                new Date(existingEvent.startDate).getTime()),
          );

          if (
            checkOverlap(newEvent, {
              ...existingEvent,
              startDate: repeatStart.toISOString(),
              endDate: repeatEnd.toISOString(),
            })
          ) {
            return true;
          }

          if (existingEvent.repeat === ERepeat.WEEKLY)
            tempDate.setDate(tempDate.getDate() + 7);
          else if (existingEvent.repeat === ERepeat.BI_WEEKLY)
            tempDate.setDate(tempDate.getDate() + 14);
          else if (existingEvent.repeat === ERepeat.MONTHLY)
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
      }

      return false;
    });
  };

  const onSubmit = (newEvent: Omit<IEvent, 'id'> & { id?: string }) => {
    setSavedSuccessfully(false);
    setIsPending(true);
    setError(null);

    const hasConflict = doesConflict(newEvent, events);
    if (hasConflict) {
      setError('Event conflicts with an existing event.');
    } else {
      if (newEvent?.id) {
        editEvent(newEvent);
      } else {
        addEvent(newEvent);
      }
      setSavedSuccessfully(true);
    }

    setIsPending(false);
  };

  return { isPending, error, onSubmit, savedSuccessfully };
};
