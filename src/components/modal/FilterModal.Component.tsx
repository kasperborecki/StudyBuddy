import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../atoms/Modal.Atom';
import { EducationType } from '../../constans/PersonalDataSettings.Constans';
import './Checkbox.css';
import { educationType } from '../../atoms/FIlter.Atom';

interface CustomModalProps {
  informationType: string;
}

const FilterModal: React.FC<CustomModalProps> = ({ informationType }) => {
  const [showModal, setShowModal] = useRecoilState<boolean>(modalAtom);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isEducationLevel, setIsEducationType] = useRecoilState(educationType);

  useEffect(() => {
    console.log(isEducationLevel);
  }, [isEducationLevel]);

  const handleCheckboxChange = (option: any) => {
    setSelectedValue(option.name);
    setIsEducationType((prevEducationType) => option.name);
  };

  return (
    showModal ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
        <div className="bg-white p-8 rounded shadow-md w-[70%] h-68 rounded-3xl">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Typ Zajęć</h2>
          </div>
          <hr className='w-[90%] mx-[2%]' />
          <div className="mb-6">
            {informationType === 'educationType' ? (
              <>
                {EducationType.map((option: any) => (
                  <div key={option.name} className='flex items-center space-x-4 mb-4'>
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={option.name === selectedValue}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className='absolute pl-12 pt-1 font-k2d font-bold text-[16px]'>{option.name}</div>
                  </div>
                ))}
              </>
            ) : (
              'essa'
            )}
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
