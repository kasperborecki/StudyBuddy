import { atom } from 'recoil';

export const sortBy = atom({
  key: 'sortBy',
  default: ''
});

export const educationLevel = atom({
    key: 'educationLevel',
    default: ''
  });

export const educationMethod = atom({
  key: 'educationMethod',
  default: ''
});

export const educationType = atom({
    key: 'educationType',
    default: ''
  });

export const price = atom({
  key: 'price',
  default: ''
});

export const rating = atom({
    key: 'rating',
    default: ''
  });

export const ascending = atom({
  key: 'ascending',
  default: true
})