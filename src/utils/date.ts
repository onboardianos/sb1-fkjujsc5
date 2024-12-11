import { format, isAfter, isBefore, parseISO } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy HH:mm');
};

export const isOverdue = (dueDate: string | Date): boolean => {
  const parsedDate = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
  return isAfter(new Date(), parsedDate);
};

export const isUpcoming = (date: string | Date, days: number = 7): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return isBefore(parsedDate, futureDate);
};