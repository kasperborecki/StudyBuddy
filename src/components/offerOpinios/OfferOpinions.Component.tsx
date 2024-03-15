import {FaRegStar, FaStar} from 'react-icons/fa';
import {Comments} from '../../interfaces/Comments.Interface';
import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';

interface OpinionsComponentProps {
  oneStars: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  allStars: number;
  commentData: Comments[];
}

const OfferOpinions: React.FC<OpinionsComponentProps> = ({
  oneStars,
  twoStars,
  threeStars,
  fourStars,
  fiveStars,
  allStars,
  commentData,
}) => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);

  const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

  const calculatePercentage = (stars: number) => {
    return (stars / allStars) * 100;
  };

  const renderStars = (rating: number) => {
    const starsArray = [];
    for (let i = 0; i < rating; i++) {
      starsArray.push(
        <FaStar
          key={i}
          className='text-yellow-500'
        />,
      );
    }
    for (let i = rating; i < 5; i++) {
      starsArray.push(
        <FaRegStar
          key={i}
          className='text-yellow-500'
        />,
      );
    }
    return starsArray;
  };

  const calculateAverageRating = () => {
    const totalScore =
      oneStars * 1 +
      twoStars * 2 +
      threeStars * 3 +
      fourStars * 4 +
      fiveStars * 5;
    return totalScore / allStars;
  };

  return (
    <div className='h-96 w-full mt-4 rounded-3xl border-2 border-[#4143444f] font-Roboto'>
      <div className='h-28 w-full border-b border-[#4143444f] flex flex-row'>
        <div className='w-1/2 flex flex-col pl-8 mt-6'>
          <p
            className={`text-center flex flex-row font-semibold text-[25px] ${
              isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#414344]'
            }`}>
            <FaStar className='mt-[6px] mr-2 text-yellow-500' />
            {allStars >= 1 ? calculateAverageRating().toFixed(2) : 0}
          </p>
          <u
            className={`ml-2 ${
              isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#414344]'
            }`}>
            {allStars} Opinii
          </u>
        </div>
        <div
          className={`w-1/2 flex flex-col justify-end items-end mt-4 mr-8 ${
            isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#414344]'
          }`}>
          <div className='flex flex-row mt-[2px]'>
            <p className='mr-2 -mt-2 text-[16px]'>5</p>
            <progress
              className='progress w-32  progress-warning'
              value={calculatePercentage(fiveStars)}
              max='100'></progress>
          </div>
          <div className='flex flex-row mt-[2px]'>
            <p className='mr-2 -mt-2 text-[16px]'>4</p>
            <progress
              className='progress w-32 progress-warning'
              value={calculatePercentage(fourStars)}
              max='100'></progress>
          </div>
          <div className='flex flex-row mt-[2px]'>
            <p className='mr-2 -mt-2 text-[16px]'>3</p>
            <progress
              className='progress w-32 progress-warning'
              value={calculatePercentage(threeStars)}
              max='100'></progress>
          </div>
          <div className='flex flex-row mt-[2px]'>
            <p className='mr-2 -mt-2 text-[16px]'>2</p>
            <progress
              className='progress w-32 progress-warning'
              value={calculatePercentage(twoStars)}
              max='100'></progress>
          </div>
          <div className='flex flex-row mt-[2px]'>
            <p className='mr-2 -mt-2 text-[16px]'>1</p>
            <progress
              className='progress w-32 progress-warning'
              value={calculatePercentage(oneStars)}
              max='100'></progress>
          </div>
        </div>
      </div>
      <div className='flex flex-row snap-x overflow-x-auto'>
        {commentData.map((comment, index) => (
          <div
            key={index}
            className={`relative snap-x ml-4 mr-4 mt-3 h-60 bg-[#ffffff94] w-64 rounded-3xl border-2 border-[#4143442d] flex-shrink-0 ${
              isDarkMode ? 'bg-[#363636]' : 'bg-[#ffffff94]'
            }`}>
            <div className='flex flex-row ml-4 mt-4'>
              <img
                src={CDNURL + comment.profile?.avatar_url}
                alt={'profileAvatar'}
                className=' w-16 h-16 rounded-full'
              />
              <div
                className={`flex flex-col ml-3 mt-2 ${
                  isDarkMode
                    ? 'text-[#ffffff] text-opacity-80'
                    : 'text-[#414344]'
                }`}>
                <p className='text-[17px] font-Roboto'>
                  {comment.profile?.name}
                </p>
                <div className='flex flex-row mt-1'>
                  {renderStars(comment.rating ?? 0)}
                </div>
              </div>
              <p className='absolute top-2 right-4 text-[15px]'>
                {comment.created_at.slice(5, 10)}
              </p>
            </div>
            <p
              className={` mt-2 px-4 text-[#414344] text-[15px] font-Roboto ${
                isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-[#414344]'
              }`}>
              {comment.comment?.slice(0, 180)}
              {comment.comment && comment.comment.length > 180 ? '...' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferOpinions;
