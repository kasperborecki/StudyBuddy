import animalShelter from '../../assets/animal-shelter.png';
import trophySilver from '../../assets/nagrody/trophySilver.png';

const HelpProgres = () => {
  return (
    <div className='relative grid justify-items-center w-[90%] bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 p-[2px] h-[240px] rounded-lg mt-12'>
      <div className='relative flex-col grid justify-items-center w-full h-full bg-white rounded-lg'>
      <p className='text-[#212427] text-[20px] font-k2d font-semibold mt-2'>
          Łącznie Pomogłeś : 143,76zł
        </p>
        <div className='h-[90px] w-[90px] bg-gray-200 rounded-full'>
            <img
              src={animalShelter}
              alt='animalShelter'
            />
          </div>
          <div className='flex flex-row'>
            <p className='text-[#212427] text-[16px] font-k2d font-semibold mt-1.5'>40 zł / 100zł</p>
          <progress className="progress progress-secondary w-56 h-3 mt-3 mx-2" value="100" max="100"></progress>
            <img
              src={trophySilver}
              alt='trophySilver'
              className='w-[35px] h-[35px]'
            />
          </div>
          <button className='flex justify-center mt-2 items-center gap-2 text-[17px] w-40 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]'>
          Dowiedz Się Więcej
        </button>
      </div>
    </div>
  );
};

export default HelpProgres;
