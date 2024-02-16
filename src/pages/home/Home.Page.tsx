import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';
import { studyFieldAtom } from '../../atoms/StudyField.Atom';
import { useAuth } from '../../atoms/Route.Atom';
import UserData from '../../services/User/UserData';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import BottomBar from '../../components/bottomBar/BottomBar';
import SubjectsComponent from '../../components/subjectsComponent/Subject.Component';
import UiChoseStudyField from '../../components/uiComponents/uiButons/UiChoseStudyField.Button';
import { User } from '../../interfaces/User.Interface';
import supabase from '../../config/SupabaseClient';
import { UserIdentity } from '@supabase/supabase-js';
import getUserDataFromProvider from '../../services/User/UserDataProvider';
import AlertComponent from '../../components/alerts/Alert.Component';
import { alertTypeAtom } from '../../atoms/AlertState.Atom';

const HomePage = () => {
  const { session } = useAuth();
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [studyField] = useRecoilState(studyFieldAtom);
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertType, setAlertType] = useRecoilState(alertTypeAtom);

  const CDNURL = 'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user.id) {
        try {
          setIsLoading(true);
          await getUserDataFromProvider();
          const userId = session.user.id;
          const userRes = await UserData.getUserData(userId);
          setUserData(userRes);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      setAlertType(0);
    }, 5000);

  
    fetchUser();
    return () => clearTimeout(timeoutId);
  }, [session?.user.id]);

  

  return (
    <>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        userData.map((user) => (
          <div
            key={user.user_id}
            className={`relative min-h-screen flex flex-col items-center justify-start ${
              isDarkMode ? 'bg-[#212121]' : 'bg-[#FEECEB]'
            }`}
          >
            <div className='mb-10 right-8 top-8 absolute'>
              <img
                src={CDNURL + user.avatar_url}
                alt='profileAvatar'
                className='flex w-14 h-14 rounded-full'
              />
            </div>
            <div
              className={`font-k2d text-lg -ml-12 mb-8 mt-24 ${
                isDarkMode ? 'text-[#dddddd]' : 'text-black'
              }`}
            >
              <p className='font-bold'>Witaj {user.name}{user.surname}!</p>
              <p className='font-'>
                Jakiego {studyField === 1 ? 'Przedmiotu' : 'Języka'} Szukasz
              </p>
            </div>
            <UiChoseStudyField />
            <div className='absolute w-full mt-5 z-30'>{alertType === 1 ? <AlertComponent /> : null}</div>
            <SubjectsComponent />
          </div>
        ))
      )}
    </>
  );
};

export default HomePage;