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
    ['po', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['wt', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['śr', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['cz', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['pt', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['so', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    ['ni', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ]
});
