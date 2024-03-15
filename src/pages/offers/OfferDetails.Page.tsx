import {useRecoilState} from 'recoil';
import {offerId} from '../../atoms/SelectedOfferId.Atom';
import {useEffect, useState} from 'react';
import OffersData from '../../services/common/Offer.Service';
import {Offer} from '../../interfaces/Offers.Interface';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import {
  MdOutlinePlayLesson,
  MdVerified,
} from 'react-icons/md';
import {FaHeart, FaRegMoneyBillAlt, FaStar} from 'react-icons/fa';
import AvailabilityCalendar from '../../components/availabilityCalendar/AvailabilityCalendar.Component';
import ContactModal from '../../components/modal/ContactModal.Component';
import {useNavigate} from 'react-router';
import {IoArrowBack, IoGlobeOutline} from 'react-icons/io5';
import {TbDotsVertical} from 'react-icons/tb';
import OfferOpinionsService from '../../services/common/Opinions.Service';
import OfferOpinions from '../../components/offerOpinios/OfferOpinions.Component';
import {Comments} from '../../interfaces/Comments.Interface';
import {subjectIdAtom} from '../../atoms/Subject.Atom';
import {RiHome3Line} from 'react-icons/ri';

const CDNURL =
  'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';

const OfferDetailsPage = () => {
  const [selectedOfferId] = useRecoilState(offerId);
  const [selectedSubject] = useRecoilState(subjectIdAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<Offer[]>([]);
  const [offerDataProposal, setOfferDataProposal] = useState<Offer[]>([]);
  const [commentsData, setCommentsData] = useState<Comments[]>([]);
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [allStars, setAllStars] = useState<number>(0);
  const [oneStar, setOneStar] = useState<number>(0);
  const [twoStars, setTwoStars] = useState<number>(0);
  const [threeStars, setThreeStars] = useState<number>(0);
  const [fourStars, setFourStars] = useState<number>(0);
  const [fiveStars, setFiveStars] = useState<number>(0);
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/offers');
  };

  const handleReport = () => {};

  const handleLike = () => {};

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const offerRes = await OffersData.getOffer(selectedOfferId);
        setOfferData(offerRes);
        const offerResProposalRes =
          await OffersData.getSelectedSubjectOffersProposal(selectedSubject);
        setOfferDataProposal(offerResProposalRes);
        const commentData = await OfferOpinionsService.getAllComments(
          selectedOfferId,
        );
        setCommentsData(commentData);
        const allStarsRes = await OfferOpinionsService.getAllStar(
          selectedOfferId,
        );
        setAllStars(allStarsRes.length);
        const oneStarsRes = await OfferOpinionsService.getAllOneStar(
          selectedOfferId,
        );
        setOneStar(oneStarsRes.length);
        const twoStarsRes = await OfferOpinionsService.getAllTwoStar(
          selectedOfferId,
        );
        setTwoStars(twoStarsRes.length);
        const threeStarsRes = await OfferOpinionsService.getAllThreeStar(
          selectedOfferId,
        );
        setThreeStars(threeStarsRes.length);
        const fourStarsRes = await OfferOpinionsService.getAllFourStar(
          selectedOfferId,
        );
        setFourStars(fourStarsRes.length);
        const fiveStarsRes = await OfferOpinionsService.getAllFiveStar(
          selectedOfferId,
        );
        setFiveStars(fiveStarsRes.length);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [selectedOfferId]);

  return (
    <div
      className={`relative min-h-screen pb-28 font-roboto ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#fcfcfc]'
      }`}
      style={{overflowY: 'auto'}}>
      {isLoading ? (
        <div className='ml-20'>
          <LoadingSuspense />
        </div>
      ) : (
        <div className='relative'>
          <div
            className={`w-full h-16 shadow-md shadow-bottom  flex flex-row justify-between ${
              isDarkMode
                ? 'bg-[#363636] shadow-gray-800'
                : 'bg-[#f1f1f1] shadow-gray-300'
            }`}>
            <IoArrowBack
              className={`h-8 w-8 mt-4 ml-4 items-start ${
                isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-black'
              }`}
              onClick={handleBackButton}
            />
            <div className='flex-grow'></div>
            <FaHeart
              className={`h-8 w-8 mt-4 mr-4 items-end ${
                isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-gray-400'
              }`}
              onClick={handleLike}
            />
            <TbDotsVertical
              className={`h-8 w-8 mt-4 mr-4 items-end ${
                isDarkMode ? 'text-[#ffffff] text-opacity-80' : 'text-black'
              }`}
              onClick={handleReport}
            />
          </div>
          {offerData.map((offer, index) => (
            <div
              key={index}
              className='mt-10'>
              <div className='flex flex-row items-start justify-start'>
                <img
                  src={CDNURL + offer.profile?.avatar_url}
                  alt={'profileAvatar'}
                  className='ml-4 w-24 h-24 rounded-3xl'
                />
                <div className='flex flex-col ml-6 w-full'>
                  <div
                    className={`flex flex-row  text-[21px] font-semibold font-Roboto ${
                      isDarkMode
                        ? 'text-[#ffffff] text-opacity-80'
                        : 'text-[#414344]'
                    }`}>
                    <p>
                      {offer.profile?.name &&
                        offer.profile.name.charAt(0).toUpperCase() +
                          offer.profile.name.slice(1)}
                    </p>
                    <p className='ml-1'>
                      {offer.profile?.surname &&
                        offer.profile.surname.charAt(0).toUpperCase() +
                          offer.profile.surname.slice(1)}
                    </p>
                    <MdVerified className='h-6 w-6 text-blue-500 ml-2 mt-[3px]' />
                  </div>
                  <div
                    className={`flex flex-row w-full text-[#4d4d4d] mt-4 -ml-5 text-[15px] font-[500] font-Roboto ${
                      isDarkMode
                        ? 'text-[#ffffff] text-opacity-80'
                        : 'text-[#414344]'
                    }`}>
                    <div className='flex flex-row w-1/3 justify-center'>
                      <div>
                        <p className='text-center flex flex-row font-semibold'>
                          <FaStar className='mt-[3px] mr-1' /> 4.8
                        </p>
                        <p className='text-center'>Ocena</p>
                      </div>
                    </div>
                    <div className='flex flex-row w-1/3 border-l border-r border-[#4143444f] justify-center'>
                      <div>
                        <p className='text-center flex flex-row font-semibold'>
                          <MdOutlinePlayLesson className='mt-[3px] mr-1' />
                          231
                        </p>
                        <p className='text-center'>Lekcji</p>
                      </div>
                    </div>
                    <div className='flex flex-row w-1/3 justify-center'>
                      <div>
                        <p className='text-center flex flex-row font-semibold'>
                          {offer.price} zł
                        </p>
                        <p className='text-center'>Cena</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p
                  className={`text-[21px] font-semibold font-Roboto mt-4 ml-4 ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-80'
                      : 'text-[#414344]'
                  }`}>
                  Informacje
                </p>
                <p
                  className={`mx-4 mt-2 font-Roboto ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-70'
                      : 'text-[#757575]'
                  }`}>
                  {isReadMore
                    ? offer.description &&
                      offer.description.charAt(0).toUpperCase() +
                        offer.description.slice(1)
                    : offer.description &&
                      offer.description.charAt(0).toUpperCase() +
                        offer.description.slice(1, 190) +
                        '...'}
                </p>
                <button
                  className=' mt-4 mx-[5%] w-[90%] h-10 font-Roboto text-lg border-solid border-2 border-slate-400 rounded-3xl p-1'
                  onClick={() => setIsReadMore(!isReadMore)}>
                  <p
                    className={` rounded-3xl font-medium text-[17px] ${
                      isDarkMode
                        ? 'text-[#dddddd] text-opacity-90'
                        : 'text-[#4d4d4d]'
                    }`}>
                    {isReadMore ? 'Pokaż mniej' : 'Pokaż więcej'}
                  </p>
                </button>
              </div>
              <div>
                <p
                  className={`text-[21px] font-semibold font-Roboto mt-4 ml-4 ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-80'
                      : 'text-[#414344]'
                  }`}>
                  Dostępność
                </p>
                <AvailabilityCalendar />
              </div>
              <div className='mx-4'>
                <p
                  className={`text-[21px] font-semibold font-Roboto mt-4 ml-4 ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-80'
                      : 'text-[#414344]'
                  }`}>
                  Opinie
                </p>
                <OfferOpinions
                  oneStars={oneStar}
                  twoStars={twoStars}
                  threeStars={threeStars}
                  fourStars={fourStars}
                  fiveStars={fiveStars}
                  allStars={allStars}
                  commentData={commentsData}
                />
                <button className=' mt-4 mx-[5%] w-[90%] h-10 font-Roboto text-lg border-solid border-2 border-slate-400 rounded-3xl p-1'>
                  <p
                    className={` rounded-3xl font-medium text-[17px] ${
                      isDarkMode
                        ? 'text-[#dddddd] text-opacity-90'
                        : 'text-[#4d4d4d]'
                    }`}>
                    Zobacz Więcej
                  </p>
                </button>
              </div>
              <div className='mx-4'>
                <p
                  className={`text-[21px] font-semibold font-Roboto mt-4 ml-4 ${
                    isDarkMode
                      ? 'text-[#ffffff] text-opacity-80'
                      : 'text-[#414344]'
                  }`}>
                  Inne propozycje
                </p>
                <div className='flex flex-row snap-x overflow-x-auto'>
                  {offerDataProposal.map((offerProposal, index) => (
                    <div
                      key={index}
                      className={`relative snap-x ml-4 mr-4 mt-3 h-36  w-64 rounded-3xl border-2 border-[#4143442d] flex-shrink-0 ${
                        isDarkMode ? 'bg-[#363636]' : 'bg-[#ffffff94]'
                      }`}>
                      <div className='absolute h-24 left-0 mt-4'>
                        <img
                          src={CDNURL + offerProposal.profile?.avatar_url}
                          alt={'essa'}
                          className='w-20 h-20 rounded-l-3xl rounded-r-3xl mx-4'
                        />
                      </div>
                      <div>
                        <div
                          className={`absolute mt-2 left-28 font-jua font-bold text-[14px] flex py-2 ${
                            isDarkMode
                              ? 'text-[#dddddd] text-opacity-90'
                              : 'text-[#212427]'
                          }`}>
                          <div className='flex flex-row'>
                            <p className='mr-1'>
                              {offerProposal.profile?.name &&
                                offerProposal.profile.name.charAt(0).toUpperCase() +
                                offerProposal.profile.name.slice(1)}
                            </p>
                            <p>
                              {offerProposal.profile?.surname?.slice(0, 1)}.
                            </p>
                            <div className='font-k2d font-bold text-[12px] flex flex-row  pt-[2px] ml-2'>
                              <div className='text-[#f7cd64] flex pt-[1px]'>
                                <FaStar />
                              </div>
                              <p
                                className={` pl-1 -mt-[1px] text-[13px] ${
                                  isDarkMode ? 'text-white' : 'text-[#f7cd64]'
                                }`}>
                                4.0
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className={`absolute mt-10 left-28 text-[12px] ${
                            isDarkMode
                              ? 'text-[#dddddd] text-opacity-90'
                              : 'text-[#212427] opacity-60'
                          }`}>
                          <div className='flex text-md font-k2d font-medium pb-1'>
                            <div className='pr-2 text-xl'>
                              <MdOutlinePlayLesson className='text-[17px]' />
                            </div>
                            <p>231 Lekcji</p>
                          </div>
                          <div className='flex text-md font-k2d font-medium pb-1'>
                            <div className='pr-2 text-xl'>
                              <IoGlobeOutline className='text-[17px]' />
                            </div>
                            <p>Polski, Angielski</p>
                          </div>
                          <div className='flex text-md font-k2d font-medium pb-1'>
                            <div className='pr-2 text-xl'>
                              <RiHome3Line className='text-[17px]' />
                            </div>
                            <p>{offerProposal.education_method}</p>
                          </div>
                          <div className='flex text-md font-k2d font-medium pb-1'>
                            <div className='pr-2 text-xl'>
                              <FaRegMoneyBillAlt className='text-[17px]' />
                            </div>
                            <p>{offerProposal.price} ZŁ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferDetailsPage;
