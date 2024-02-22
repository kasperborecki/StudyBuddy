import {useRecoilState} from 'recoil';
import {DarkModeAtom} from '../../atoms/DarkMode.Atom';
import {FaSearch} from 'react-icons/fa';
import {BsFilterRight} from 'react-icons/bs';
import {subjectIdAtom, subjectNameAtom} from '../../atoms/Subject.Atom';
import ForumPosts from '../../components/forumPosts/ForumPosts';
import {useEffect, useState} from 'react';
import {Forum} from '../../interfaces/Forum.Interfaces';
import ForumData from '../../services/common/Forum.Selector';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';

const ForumPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [selectedSubjectName] = useRecoilState(subjectNameAtom);
  const [selectedSubjectId] = useRecoilState(subjectIdAtom);
  const [forumData, setForumData] = useState<Forum[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(1);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/offers');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await ForumData.getAllPosts(selectedSubjectId);
        setForumData(postsRes);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    console.log(selectedSubjectId);
    console.log(forumData);
    fetchPosts();
  }, [selectedSubjectId]);

  return (
    <div
      className={`relative h-full flex flex-col items-center justify-start pb-40 ${
        isDarkMode ? 'bg-[#212121]' : 'bg-[#FEECEB]'
      }`}>
      <div className='fixed top-0 left-0 right-0 z-40'>
        <div className='flex flex-row absolute left-0 bg-[#FEECEB] w-[25%] h-20 p-[25px]'>
          <p className='font-semibold text-[22px] text-[#212427] '>Forum</p>
        </div>
        <div className='p-7 absolute flex flex-row justify-end right-0 bg-[#FEECEB] w-[76%] h-20 group'>
          <div className=''>
            <FaSearch
              className='z-10 absolute w-8 h-8 -mt-2 left-[79%] text-gray-500 pt-2'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <input
              type='text'
              placeholder='Wyszukaj'
              className={`absolute input input-bordered h-10 bg-[#fff7f7] max-w-xs mr-10 w-[90%] -mt-2 left-0 opacity-0 transition ease-in-out duration-200 ${
                isSearchOpen
                ? 'group-hover:opacity-100'
                : 'group-hover:opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
      <div className='fixed left-0 right-0 flex z-40 justify-center h-20 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 to-gray-800 bg-gradient-to-rs top-20'>
              <IoArrowBack
                className={`absolute left-2 top-5 h-8 w-8 text-white`}
                onClick={handleBackButton}
              /> 
        <p className='text-white text-[22px] text-semibold p-5'>
          {selectedSubjectName}
        </p>
      </div>
      <div className='absolute top-44 z-20 flex flex-row'>
        <div
          className={`flex w-20 h-7 pt-1  mx-2 rounded-lg justify-center font-semibold ${
            selectedFilter === 1
            ? 'bg-[#92b5ff59] text-[#4879e2]'
            : 'bg-[#d6d6d67a] text-[#8d8d8de1]'
          }`}
          onClick={(() => setSelectedFilter(1))}
          >
          <p>Najnowsze</p>
        </div>
        <div
          className={`flex w-20 h-7 pt-1  mx-2 rounded-lg justify-center font-semibold ${
            selectedFilter === 2
            ? 'bg-[#92b5ff59] text-[#4879e2]'
            : 'bg-[#d6d6d67a] text-[#8d8d8de1]'
          }`}
          onClick={(() => setSelectedFilter(2))}
          >
          <p>Najstarsze</p>
        </div>
        <div
          className={`flex w-20 h-7 pt-1  mx-2 rounded-lg justify-center font-semibold ${
            selectedFilter === 3
              ? 'bg-[#92b5ff59] text-[#4879e2]'
              : 'bg-[#d6d6d67a] text-[#8d8d8de1]'
          }`}
          onClick={(() => setSelectedFilter(3))}
          >
          <p>Trendujące</p>
        </div>
        <div
          className={`flex w-20 h-7 pt-1 mx-2 rounded-lg justify-center font-semibold ${
            selectedFilter === 4
            ? 'bg-[#92b5ff59] text-[#4879e2]'
            : 'bg-[#d6d6d67a] text-[#8d8d8de1]'
          }`}
          onClick={(() => setSelectedFilter(4))}
          >
          <p>Popularne</p>
        </div>
      </div>
      <div className='mt-10'>
        {forumData.map((data) => (
          <ForumPosts
            name={'Hubert Czaplicki'}
            profileIcon={'421992140_1430648034327163_1645715190455232193_n.jpg'}
            tittle={data.tittle}
            description={data.description}
            date={data.created_at}
            views={data.views}
            answers={420}
            likes={data.likes}
          />
        ))}
      </div>
    </div>
  );
};
export default ForumPage;
