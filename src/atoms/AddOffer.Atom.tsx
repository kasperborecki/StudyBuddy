import {atom} from 'recoil';

export const addOfferSubject = atom({
  key: 'addOfferSubject',
  default: '',
});

export const addOfferSubjectId = atom({
  key: 'addOfferSubjectId',
  default: '',
});

export const addOfferType = atom({
  key: 'addOfferType',
  default: '',
});

export const addOfferMethod = atom({
  key: 'addOfferMethod',
  default: '',
});

export const addOfferLevel = atom({
  key: 'addOfferLevel',
  default: '',
});

export const addOfferCiteis = atom({
  key: 'addOfferCiteis',
  default: '',
});

export const addOfferCiteisId = atom({
  key: 'addOfferCiteisId',
  default: 0,
});

export const addOfferTime = atom({
  key: 'addOfferTime',
  default: 50,
});

export const addOfferPrice = atom({
  key: 'addOfferPrice',
  default: 100,
});

export const addOfferDescription = atom({
  key: 'addOfferDescription',
  default: '',
});


export const addOfferAvability = atom({
  key: 'addOfferAvability',
  default: [
    ['1', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['2', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['3', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['4', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['5', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['6', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['7', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ]
});
