import BottomBar from '../../components/bottomBar/BottomBar';
import logo from '../../assets/Logo.png';
import SubjectsComponent from '../../components/subjectsComponent/Subject.Component';

const HomePage = () => {

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-start bg-[#FAEFFF]'>
      <div className='mt-[8%]'>
        <img
          src={logo}
          alt='Logo'
          className='w-[150px] h-[150px] mx-auto my-auto mb-10'
        />
          <SubjectsComponent />
      </div>
      <div className='fixed bottom-0 left-0 w-full bg-white z-20'>
        <BottomBar />
      </div>
    </div>
  );
};

export default HomePage;
