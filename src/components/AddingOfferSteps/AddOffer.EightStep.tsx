import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {addOfferDescription} from '../../atoms/AddOffer.Atom';

const AddOfferEighthStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [, setDescription] = useRecoilState(addOfferDescription);
  const [descriptionText, setDescriptionText] = useState<string>('');

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newText = event.target.value;
    setDescriptionText(newText);
    setDescription((prevDescription) => {
      if (newText.length <= 400) {
        return newText;
      } else {
        return prevDescription;
      }
    });
  };

  return (
    <div className='w-[80%]'>
      <BreadCrumb />
      <p
        className={`flex text-lg font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
        style={{whiteSpace: 'nowrap'}}>
        Dodaj <p className='text-[#D687F3] px-2'>Opis Oferty</p>Min 150 znaków:
      </p>

      <div>
        <div className='mb-8'>
          <div className=' w-full h-[250px] relative'>
            <textarea
              className={`border-2 border-black w-full h-full rounded-3xl p-4  ${
                isDarkMode
                  ? 'bg-[#2B2B2B] text-white'
                  : 'bg-[#FFFFFF] text-black'
              }`}
              onChange={handleTextAreaChange}
              maxLength={400}
              name='description'
            />
            <p
              className={`absolute bottom-2 right-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              } countText`}>
              {descriptionText.length}/400
            </p>
          </div>
        </div>
      </div>
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferEighthStep;
