import trophyGold from '../../assets/nagrody/trophyGold.png';
import trophySilver from '../../assets/nagrody/trophySilver.png';
import trophyBronze from '../../assets/nagrody/trophyBronze.png';

const RewardCabinet = () => {
  return (
    <div className='relative grid justify-items-center w-[90%] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] h-[220px] rounded-lg mt-12'>
      <div className='relative flex-col grid justify-items-center w-full h-full bg-white rounded-lg'>
        <p className='text-[#212427] text-[20px] font-k2d font-semibold mt-2'>
          Gablota Nagród
        </p>
        <div className='flex flex-row space-x-6 mt-2'>
          <div className='h-[80px] w-[80px] bg-gray-200 rounded-full'>
            <img
              src={trophyBronze}
              alt='avatrophyBronzetar'
              className='w-[75px] h-[75px]'
            />
          </div>
          <div className='h-[80px] w-[80px] bg-gray-200 rounded-full'>
            <img
              src={trophyGold}
              alt='trophyGold'
              className='w-[75px] h-[75px]'
            />
          </div>
          <div className='h-[80px] w-[80px] bg-gray-200 rounded-full'>
            <img
              src={trophySilver}
              alt='trophySilver'
              className='w-[75px] h-[75px]'
            />
          </div>
        </div>
        <button className='flex justify-center  mt-2 items-center gap-2 text-[17px] w-28 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]'>
          Sprawdź
        </button>
      </div>
    </div>
  );
};

export default RewardCabinet;
