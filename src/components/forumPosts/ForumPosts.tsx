import {FaHeart, FaRegEye} from 'react-icons/fa';
import {IoChatboxEllipsesSharp, IoHeartOutline} from 'react-icons/io5';

interface CusomForumPorstProps {
  name: string;
  profileIcon: string;
  tittle: string;
  description: string;
  date: string;
  views: number;
  answers: number;
  likes: number;
}

const ForumPosts: React.FC<CusomForumPorstProps> = ({
  name,
  profileIcon,
  tittle,
  description,
  date,
  views,
  answers,
  likes,
}) => {
  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  return (
    <div className='relative top-40 bg-[#FEECEB] w-full'>
      <div className=' w-[90%] m-[5%] h-[220px] bg-white rounded-xl shadow-md shadow-bottom'>
        <div className='relative flex flex-row justify-between h-24 w-full p-2'>
          <div className='w-[80px] h-[80px] p-[3px] bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 rounded-full'>
            <img
              src={CDNURL + profileIcon}
              className=' rounded-full w-full h-full'
            />
          </div>
          <div className='flex flex-col'>
            <p className=' text-[18px] font-semibold text-blue-500 break-words -ml-16'>
              {tittle.slice(0, 20)}...
            </p>
            <div className='flex flex-row'>
              <p className='text-[#212427b0] text-[13px] font-semibold -ml-16 mt-2'>
                {name}
              </p>
              <p className='text-[17px] mx-1 mt-1'>•</p>
              <p className=' text-[#212427b0] text-[13px] font-semibold '>
                {date.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className='flex flex-col'>
            <IoHeartOutline className=' text-red-700 w-7 h-7 absolute right-2 ' />
          </div>
        </div>
        <div className='flex flex-col px-4 '>
          <p className='break-words'>{description.slice(0, 90)}...</p>
          <hr className=' bg-black'></hr>
        </div>
        <div className='flex flex-row justify-between px-[20%] text-gray-500 -mt-3'>
          <p className='pt-2 font-bold flex flex-row text-[16px]'>
            <FaRegEye className='mt-[3px] mr-1 h-5 w-5' />
            {views}
          </p>
          <p className='font-bold flex flex-row text-[16px]'>
            <IoChatboxEllipsesSharp className='mt-[3px] mr-1 h-5 w-5' />
            62 
          </p>
          <p className='font-bold flex flex-row text-[16px]'>
            <FaHeart className='mt-[3px] mr-1 h-5 w-5' />
            {likes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumPosts;
