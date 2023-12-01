import { atom, useRecoilValue } from 'recoil';
import { userSessionState } from './UserState.Atom';

export const loggedIn = atom({
  key: 'loggedIn',
  default: false
});

export const useAuth = () => {
  // const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedIn);
  // const setAuth = () => {
  //   const newValue = !userLoggedIn;
  //   setUserLoggedIn(newValue);
  // };
  return useRecoilValue(userSessionState);
};
