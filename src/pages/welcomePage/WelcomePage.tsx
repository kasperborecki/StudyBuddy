import logo from '../../asets/Logo.png';

const WelcomePage = () => {
    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-tr from-[#D687F3] via-[#F6AA80] to-[#FFDD94]">
        <div className="mt-[25%]">
            <img src={logo} alt="Logo" className='w-[200px] h-[200px]' />
        </div>
    </div>
    );
};

export default WelcomePage;
