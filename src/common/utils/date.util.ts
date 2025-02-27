import { format } from 'date-fns';

export const formatDate = (
  date: Date,
  formatStr = 'yyyy-MM-dd HH:mm:ss',
): string => {
  return format(date, formatStr);
};
