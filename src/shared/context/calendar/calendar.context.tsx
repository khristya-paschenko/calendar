import React, {
  createContext,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  ECalendarReducerAction,
  ICalendarReducerAction,
  IEvent,
  IUpdateEvent,
  TCalendarContext,
} from '~/shared/context/calendar/calendar.types';
import { asyncStorage } from '~/shared/store/storage';
import { EStore } from '~/shared/store/storage.types';
import { Text } from 'react-native';

const CalendarContext = createContext<TCalendarContext | null>(null);

const calendarReducer: Reducer<IEvent[], ICalendarReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ECalendarReducerAction.add:
      const id = Math.random().toString();
      const newEvents = [{ id, ...(action.payload as IEvent) }, ...state];
      asyncStorage.setStringifiedData<IEvent[]>(EStore.CALENDAR, newEvents);
      return newEvents;

    case ECalendarReducerAction.delete:
      const filteredEvents = state.filter(
        (e) => e.id !== (action.payload as string),
      );
      asyncStorage.setStringifiedData<IEvent[]>(
        EStore.CALENDAR,
        filteredEvents,
      );
      return filteredEvents;

    case ECalendarReducerAction.edit:
      const updatedEvents = state.map((event) =>
        event.id === (action.payload as IUpdateEvent).id
          ? { ...event, ...action.payload }
          : event,
      );
      asyncStorage.setStringifiedData<IEvent[]>(EStore.CALENDAR, updatedEvents);
      return updatedEvents;

    case ECalendarReducerAction.set:
      return action.payload as IEvent[];

    default:
      return state;
  }
};

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer<
    Reducer<IEvent[], ICalendarReducerAction>
  >(calendarReducer, null);

  useEffect(() => {
    asyncStorage.getParsedData(EStore.CALENDAR).then((data) => {
      if (data) {
        dispatch({ type: ECalendarReducerAction.set, payload: data });
      } else {
        dispatch({ type: ECalendarReducerAction.set, payload: [] });
      }
    });
  }, []);

  const addEvent = (event: Omit<IEvent, 'id'>) => {
    dispatch({ type: ECalendarReducerAction.add, payload: event });
  };

  const editEvent = (event: IUpdateEvent) => {
    dispatch({ type: ECalendarReducerAction.edit, payload: event });
  };

  const deleteEvent = (id: string) => {
    dispatch({ type: ECalendarReducerAction.delete, payload: id });
  };

  const value = {
    events: state,
    add: addEvent,
    edit: editEvent,
    delete: deleteEvent,
  };

  if (state === null) {
    return <Text>Loading ...</Text>;
  }

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within CalendarContextProvider',
    );
  }
  return context;
};
