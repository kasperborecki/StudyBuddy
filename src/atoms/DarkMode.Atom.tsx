import { atom, useRecoilState } from 'recoil';

export const DarkModeAtom = atom({
  key: 'DarkModeAtom',
  default: localStorage.getItem('theme') === 'dark',
});

export const useDarkTheme = () => {
  const [isDarkMode, setIsDark] = useRecoilState(DarkModeAtom);

  const toggleDarkTheme = () => {
    const newValue = !isDarkMode;
    setIsDark(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    // Writes the background value to memory
  };

  return {isDarkMode, toggleDarkTheme};
};