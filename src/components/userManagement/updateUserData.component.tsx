import {ChangeEvent, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import UserData from '../../services/User/UserData';
import {useAuth} from '../../atoms/Route.Atom';
import LoadingSuspense from '../loadingSuspense/LoadingSuspense';
import {MdOutlineAddPhotoAlternate} from 'react-icons/md';
import supabase from '../../config/SupabaseClient';
import {User} from '../../interfaces/User.Interface';

const UpdateUserData = () => {
  const {session} = useAuth();
  const [isLoading, setisLoading] = useState<boolean>();
  const [userData, setUserData] = useState<User[]>([]);
  const userId = session?.user.id;
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    city: '',
    avatar: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setisLoading(true);
    const newData = {...formData};

    if (!newData.name)
      newData.name = userData.length > 0 ? userData[0].name : '';
    if (!newData.surname)
      newData.surname = userData.length > 0 ? userData[0].surname : '';
    if (!newData.email)
      newData.email = userData.length > 0 ? userData[0].email : '';
    if (!newData.city)
      newData.city = userData.length > 0 ? userData[0].city : '';
    if (!newData.avatar)
      newData.avatar = userData.length > 0 ? userData[0].avatar_url : '';

    if (avatarFile) {
      const avatarName = `${userId}_${avatarFile.name}`;
      newData.avatar = avatarName;
      const avatarPath = await uploadAvatar(avatarFile, avatarName);
      if (avatarPath) {
        newData.avatar = avatarPath;
      }
    }

    await UserData.updateUserData(newData, userId);
    fetchUser();
    setisLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (session?.user.id) {
      try {
        setisLoading(true);
        const userId = session.user.id;
        const userRes = await UserData.getUserData(userId);
        setUserData(userRes);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setisLoading(false);
      }
    }
  };

  const uploadAvatar = async (file: File, fileName: string) => {
    try {
      const {data, error} = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image to Supabase Storage', error);
        return null;
      }

      return data?.path;
    } catch (error) {
      console.error('Error uploading avatar', error);
      return null;
    }
  };

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  return (
    <div
      className='w-full mb-28'
      style={{overflowY: 'auto'}}>
      {isLoading ? (
        <LoadingSuspense />
      ) : (
        <>
        {userData.map((user) => (
        <form
          onSubmit={handleSubmit}
          className='mx-10 mt-4'>
          <div className='w-full h-[470px] bg-white px-10 pt-6 rounded-3xl shadow shadow-xl shadow-gray-200'>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='avatarInput'
                className='relative w-28 text-center'>
                <img
                  src={formData.avatar.length > 0 ? formData.avatar : CDNURL + user.avatar_url}
                  alt='avatar'
                  className='w-28 h-28 rounded-full mx-auto border-2 border-gray-300 cursor-pointer'
                />
                <input
                  id='avatarInput'
                  type='file'
                  accept='image/*'
                  style={{display: 'none'}}
                  onChange={handleAvatarChange}
                />
                <div className='absolute right-0 bottom-1 p-1 h-8 w-8 bg-gray-300 rounded-full'>
                  <MdOutlineAddPhotoAlternate className='text-[#616161] h-6 w-6 cursor-pointer' />
                </div>
              </label>
            </div>
            <div className='flex items-center justify-start w-full mt-6'>
              <div className='relative w-full'>
                <input
                  name='name'
                  type='text'
                  placeholder={userData.length > 0 ? user.name : ''}
                  onChange={handleChange}
                  className='border-b border-gray-300 py-1 focus:border-b-2 focus:border-[#893Eff] transition-colors peer focus:outline-none bg-transparent w-full'
                />
                <label className='absolute left-0 cursor-text -top-4 transition-all peer-focus:text-[#893Eff]'>
                  Imię
                </label>
              </div>
            </div>
            <div className='flex items-center justify-start w-full mt-6'>
              <div className='relative w-full'>
                <input
                  name='surname'
                  type='text'
                  placeholder={userData.length > 0 ? user.surname : ''}
                  onChange={handleChange}
                  className='border-b border-gray-300 py-1 focus:border-b-2 focus:border-[#893Eff] transition-colors peer focus:outline-none bg-transparent w-full'
                />
                <label className='absolute left-0 cursor-text -top-4 transition-all peer-focus:text-[#893Eff]'>
                  Nazwisko
                </label>
              </div>
            </div>
            <div className='flex items-center justify-start w-full mt-6'>
              <div className='relative w-full'>
                <input
                  name='email'
                  type='email'
                  placeholder={userData.length > 0 ? user.email : ''}
                  onChange={handleChange}
                  className='border-b border-gray-300 py-1 focus:border-b-2 focus:border-[#893Eff] transition-colors peer focus:outline-none bg-transparent w-full'
                />
                <label className='absolute left-0 cursor-text -top-4 transition-all peer-focus:text-[#893Eff]'>
                  Email
                </label>
              </div>
            </div>
            <div className='flex items-center justify-start w-full mt-6'>
              <div className='relative w-full'>
                <input
                  name='city'
                  type='text'
                  placeholder={userData.length > 0 ? user.city : ''}
                  onChange={handleChange}
                  className='border-b border-gray-300 py-1 focus:border-b-2 focus:border-[#893Eff] transition-colors peer focus:outline-none bg-transparent w-full'
                />
                <label className='absolute left-0 cursor-text -top-4 transition-all peer-focus:text-[#893Eff]'>
                  Miasto
                </label>
              </div>
            </div>
            <div className='flex items-center justify-center w-full mt-4'>
              <button
                className='mt-4 w-32 h-10 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out'
                type='submit'>
                <span className='font-medium text-[#333] group-hover:text-white'>
                  Zapisz
                </span>
              </button>
            </div>
          </div>
        </form>
        ))}
        </>
      )}
    </div>
  );
};

export default UpdateUserData;
