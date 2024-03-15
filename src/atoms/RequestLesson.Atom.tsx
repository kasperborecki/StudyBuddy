import { atom } from 'recoil';

export const requestModalLessonAtom = atom({
  key: 'requestModalLessonAtom',
  default: false,
});

export const requestWeekDayLessonAtom = atom({
  key: 'requestWeekDayLessonAtom',
  default: '',
});

export const requestHourLessonAtom = atom({
  key: 'requestHourLessonAtom',
  default: '',
});
