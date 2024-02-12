import { atom } from 'recoil';

export const userName = atom({
  key: 'userName',
  default: '',
});

export const avatarUrl = atom({
    key: 'avatarUrl',
    default: '',
  });

export const chatId = atom({
  key: 'chatId',
  default: '',
});

export const chatStyling = atom({
  key: 'chatStyling',
  default: '',
});