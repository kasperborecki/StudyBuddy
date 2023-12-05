import BottomBar from '../../components/bottomBar/BottomBar';
import logo from '../../assets/Logo.png';
import LoadingSuspense from '../../components/loadingSuspense/LoadingSuspense';
import SubjectsComponent from '../../components/subjectsComponent/Subject.Component';

const HomePage = () => {

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-start'>
      <div className='mt-[8%]'>
        <img
          src={logo}
          alt='Logo'
          className='w-[150px] h-[150px]'
        />
        <LoadingSuspense>
          <SubjectsComponent />
        </LoadingSuspense>
      </div>
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default HomePage;
