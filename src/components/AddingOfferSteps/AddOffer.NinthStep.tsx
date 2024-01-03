import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import BreadCrumb from '../BreadCrumb';
import AddOfferNavigationButtons from '../uiComponents/uiButons/AddOffersNavigationButtons';
import {AvabilityDays} from '../../constans/Avability.Constans';
import {AvabilityHours} from '../../constans/Avability.Constans';
import {addOfferAvability} from '../../atoms/AddOffer.Atom';

const AddOfferNinthStep = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [avability, setAvability] = useRecoilState(addOfferAvability);

  const handleCellClick = (dayId: any, hourId: any) => {
    setAvability((prevAvability) => {
      const newAvability = [...prevAvability.map((r) => [...r])];
      newAvability[dayId - 1][hourId] = !avability[dayId - 1][hourId];
      return newAvability;
    });
  };

  return (
    <div className='w-[80%] mx-auto relative'>
      <BreadCrumb />
      <p
        className={`flex text-xl font-jua font-semibold text-black pb-8 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Zaznacz <p className='text-[#D687F3] px-2'>Dostępność</p> Czasową:
      </p>
      <div className='max-h-[450px] overflow-y-auto relative mb-14 scrollbar scrollbar-thumb-[#d687f33d]'>
        <table className='border-collapse w-full table-auto'>
          <thead className='sticky top-[-2px] bg-[#e0e0e0] '>
            <tr>
              {AvabilityDays.map((day) => (
                <th
                  key={day.id}
                  className={`py-4 px-5 ${
                    day.id === 1 ? 'rounded-tl-2xl' : ''
                  } ${day.id === 7 ? 'rounded-tr-2xl' : ''}`}>
                  {day.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AvabilityHours.map((hour) => (
              <tr key={hour.id} >
                {AvabilityDays.map((day) => (
                  <td key={`${day.id}-${hour.id}`} className={` ${ avability[day.id - 1][hour.id] ? 'bg-[#D687F3] border-2 rounded-2xl border-[#d687f300]' : ''} `}>
                    <div
                      className='border-2 py-3 px-5 text-center font-bold rounded-2xl'
                      onClick={() => handleCellClick(day.id, hour.id)}>
                      {hour.name}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddOfferNavigationButtons />
    </div>
  );
};

export default AddOfferNinthStep;
