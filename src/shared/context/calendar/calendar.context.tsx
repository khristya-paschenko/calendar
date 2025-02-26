import React, { createContext, Reducer, useEffect, useReducer } from 'react';
import {
  ECalendarReducerAction,
  ICalendarReducerAction,
  IEvent,
  IUpdateEvent,
  TCalendarContext,
} from '~/shared/context/calendar/calendar.types';
import { getItem } from '~/shared/store/storage';
import { EStore } from '~/shared/store/storage.types';

const CalendarContext = createContext<TCalendarContext | null>(null);

const calendarReducer: Reducer<IEvent[], ICalendarReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ECalendarReducerAction.add:
      //TODO: store data
      return [{ id: Math.random().toString(), ...action.payload }, ...state];
    case ECalendarReducerAction.delete:
      const events = state.filter((e) => e.id !== action.payload);
      //TODO: store data
      return events;
    case ECalendarReducerAction.edit:
      return state;
    default:
      return state;
  }
};
export const CalendarContextProvider = ({ children }: React.ReactNode) => {
  const [state, dispatch] = useReducer<Reducer<IEvent, ICalendarReducerAction>>(
    calendarReducer,
    null,
  );

  useEffect(() => {
    const data = getItem(EStore.CALENDAR);

    if (data) {
      dispatch({ type: ECalendarReducerAction.set, payload: data });
    } else {
      dispatch({ type: ECalendarReducerAction.set, payload: [] });
    }
  }, []);

  const addEvent = (event: IEvent) => {
    dispatch({ type: ECalendarReducerAction.add, payload: event });
  };

  const editEvent = (event: IUpdateEvent) => {
    dispatch({ type: ECalendarReducerAction.edit, payload: event });
  };

  const deleteEvent = (id: string) => {
    dispatch({ type: ECalendarReducerAction.delete, payload: id });
  };
};
