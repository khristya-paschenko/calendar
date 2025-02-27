import * as events from 'events';

export interface IEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  repeat: ERepeat;
}

export interface IUpdateEvent {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  repeat?: ERepeat;
}

export interface TCalendarContext {
  events: IEvent[];
  edit: (event: Omit<IEvent, 'id'> & { id?: string }) => void;
  delete: (id: string) => void;
  add: (event: Omit<IEvent, 'id'>) => void;
}
export enum ERepeat {
  WEEKLY = 'WEEKLY',
  BI_WEEKLY = 'BI_WEEKLY',
  MONTHLY = 'MONTHLY',
  ONCE = 'ONCE',
}

export const ERepeatText: Record<ERepeat, string> = {
  [ERepeat.WEEKLY]: 'Every week',
  [ERepeat.BI_WEEKLY]: 'Every two weeks',
  [ERepeat.MONTHLY]: 'Every month',
  [ERepeat.ONCE]: 'Once',
};

export enum ECalendarReducerAction {
  add = 'ADD',
  edit = 'EDIT',
  delete = 'DELETE',
  set = 'SET',
}

export interface ICalendarReducerAction {
  type: ECalendarReducerAction;
  payload: Omit<IEvent, 'id'> | IUpdateEvent | string | IEvent[] | [];
}
