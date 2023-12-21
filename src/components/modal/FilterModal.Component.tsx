import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/Modal.Atom';
import { EducationLevel, EducationMethod, EducationType, SortBy } from '../../constans/PersonalDataSettings.Constans';
import './Checkbox.css';
import { ascending, educationLevel, educationMethod, educationType, price, sortBy } from '../../atoms/FIlter.Atom';
import { DarkModeAtom } from '../../atoms/DarkMode.Atom';

interface CustomModalProps {
  informationType: string;
}

const FilterModal: React.FC<CustomModalProps> = ({ informationType }) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isEducationType, setIsEducationType] = useRecoilState(educationType);
  const [isEducationLevel, setIsEducationLevel] = useRecoilState(educationLevel);
  const [isEducationMethod, setIsEducationMethod] = useRecoilState(educationMethod);
  const [, setSortBy] = useRecoilState(sortBy);
  const [isPrice, setIsPrice] = useRecoilState(price);
  const [,setIsAscending] = useRecoilState(ascending);

  useEffect(() => {
    console.log(isEducationLevel);
  }, [isEducationLevel]);

  const handleEducationTypeChange = (option: any) => {
    setSelectedValue(option.name);
    setIsEducationType((prevEducationType) => option.name);
  };
  const handleEducationLevelChange = (option: any) => {
    setSelectedValue(option.name);
    setIsEducationType((prevEducationType) => option.name);
  };
  const handleEducationMethodChange = (option: any) => {
    setSelectedValue(option.name);
    setIsEducationMethod((prevEducationType) => option.name);
  };
  const handleSortByChange = (option: any) => {
    setSelectedValue(option.name);
    if (option.name == 'Newest') {
      setSortBy('create_at');
      setIsAscending(true)
    } else if (option.name == 'Oldest') {
      setSortBy('create_at');
      setIsAscending(false)
    } else if (option.name == 'Cheapest') {
      setSortBy('price');
      setIsAscending(true)
    } else if (option.name == 'Most Expensive') {
      setSortBy('price');
      setIsAscending(false)
    }
  }

  const getTitle = () => {
    switch (informationType) {
      case 'educationType':
        return 'Typ Zajęć';
      case 'educationLevel':
        return 'Poziom Nauczania';
      case 'educationMethod':
        return 'Sposób Nauczania';
      case 'sortBy':
        return 'Sortuj od';
      default:
        return 'essa';
    }
  };


  return (
    showModal ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
        <div className={` p-8 rounded shadow-md w-[70%] h-68 rounded-3xl ${isDarkMode ? 'bg-[#212121]' : 'bg-[#FAEFFF]'}`}>
          <div className="mb-4">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{getTitle()}</h2>
          </div>
          <hr className='w-[90%] mx-[2%]' />
          <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {informationType === 'educationType' ? (
              <>
                {EducationType.map((option: any) => (
                  <div key={option.name} className='flex items-center space-x-4 mb-4'>
                  <label className="container">
                      <input
                        type="checkbox"
                        checked={option.name === selectedValue}
                        onChange={() => handleEducationTypeChange(option)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className='absolute pl-12 pt-1 font-k2d font-bold text-[16px]'>{option.name}</div>
                  </div>
                ))}
              </>
            ) : informationType === 'educationLevel' ? (
              <>
                {EducationLevel.map((option: any) => (
                  <div key={option.name} className='flex items-center space-x-4 mb-4'>
                  <label className="container">
                      <input
                        type="checkbox"
                        checked={option.name === selectedValue}
                        onChange={() => handleEducationLevelChange(option)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className='absolute pl-12 pt-1 font-k2d font-bold text-[16px]'>{option.name}</div>
                  </div>
                ))}
              </>
            ) : informationType === 'educationMethod' ? (
              <>
                {EducationMethod.map((option: any) => (
                  <div key={option.name} className='flex items-center space-x-4 mb-4'>
                  <label className="container">
                      <input
                        type="checkbox"
                        checked={option.name === selectedValue}
                        onChange={() => handleEducationMethodChange(option)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className='absolute pl-12 pt-1 font-k2d font-bold text-[16px]'>{option.name}</div>
                  </div>
                ))}
              </>
            ) : informationType === 'sortBy' ? (
              <>
                {SortBy.map((option: any) => (
                  <div key={option.name} className='flex items-center space-x-4 mb-4'>
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={option.name === selectedValue}
                        onChange={() => handleSortByChange(option)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className='absolute pl-12 pt-1 font-k2d font-bold text-[16px]'>{option.name}</div>
                  </div>
                ))}
              </>
            ) : ('essa')
            }
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => {
                setShowModal(false);
              }}
              disabled={!selectedValue}
            >
              Zapisz
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsEducationType('')
                setIsEducationLevel('')
                setIsEducationMethod('')
                setIsPrice('')
                setSortBy('')
                setShowModal(false);
              }}
            >
              Anuluj
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default FilterModal;
