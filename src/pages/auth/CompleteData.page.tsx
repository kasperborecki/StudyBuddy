import {ChangeEvent, FormEvent, useState} from 'react';
import logo from '../../asets/Logo.png';
import {IoMdEye} from 'react-icons/io';
import {IoMdEyeOff} from 'react-icons/io';
import supabase from '../../config/SupabaseClient';
import {useNavigate} from 'react-router-dom';

const CompleteDataPage = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    city: '',
    birthDate: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col items-center justify-start h-screen bg-gradient-to-tr from-[#D687F3] via-[#F6AA80] to-[#FFDD94]'>
      <div className='mt-[8%]'>
        <img
          src={logo}
          alt='Logo'
          className='w-[150px] h-[150px]'
        />
      </div>
      <form
        className='mt-[12%] w-screen flex flex-col items-center font-k2d font-bold'
        onSubmit={handleSubmit}>
        <div className='w-[80%]'>
          <label className='ml-4'>Email:</label>
          <input
            className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
            placeholder='Jan'
            name='name'
            onChange={handleChange}
          />
          <label className='ml-4'>Hasło:</label>
          <div className='relative'>
            <input
              className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
              placeholder='Kowalski'
              name='surname'
              onChange={handleChange}
            />
            <label className='ml-4'>Miasto:</label>
            <div className='relative'>
              <input
                className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
                placeholder='Warszawa'
                name='city'
                onChange={handleChange}
              />
            </div>
            <label className='ml-4'>Data Urodzenia:</label>
            <div className='relative'>
              <input
                className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
                placeholder='15.04.2002'
                name='birthDate'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button
          className='bg-[#ccabd8] border-2 border-black w-[50%] h-[50px] rounded-3xl mt-[8%]'
          type='submit'>
          Dalej
        </button>
      </form>
    </div>
  );
};

export default CompleteDataPage;
