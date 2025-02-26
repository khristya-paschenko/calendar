export interface IEventData {
  name: string;
  startDate: string;
  endDate: string;
  repeat: ERepeat;
}

export enum ERepeat {
  WEEKLY = 'WEEKLY',
  BI_WEEKLY = 'BI_WEEKLY',
  MONTHLY = 'MONTHLY',
}
