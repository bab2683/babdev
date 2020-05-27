import { Duration } from '@models';

export const averageDaysPerMonth: number = 30;
export const daysFromMS: number = 1000 * 60 * 60 * 24;

export function calculateDuration(start: Date, end: Date): Duration {
  const days: number = Math.floor(
    (end.getTime() - start.getTime()) / daysFromMS
  );

  if (days > 365) {
    const years: number = Math.floor(days / 365);

    return {
      months: Math.floor((days - years * 365) / averageDaysPerMonth),
      years
    };
  } else {
    return {
      months: Math.floor(days / averageDaysPerMonth),
      years: null
    };
  }
}
