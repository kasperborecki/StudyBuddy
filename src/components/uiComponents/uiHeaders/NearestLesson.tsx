import { CiBellOn } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

interface CustomHeaderProps {
    avatar_url?: any;
  }

const NearestLesson: React.FC<CustomHeaderProps> = ({
avatar_url,
}) => {

    const CDNURL =
    'https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/';
    return(
        <div className="absolute w-[90%] h-[120px] ml-[5%] mr-[5%]">
            <div className="absolute w-[80%] h-[120px] bg-[#b98eff] border-2 border-[#b487fc] shadow-md shadow-bottom shadow-[#b487fc] rounded-xl mx-[10%]"></div>
            <div className="absolute w-[90%] h-[110px] bg-[#ad7aff] border-2 border-[#9d5fff] shadow-md shadow-bottom shadow-[#9d5fff] rounded-xl mx-[5%]"></div>
            <div className="absolute w-[100%] h-[100px] bg-[#9d5fff] border-2 border-[#9959ff] shadow-md shadow-bottom shadow-[#9959ff]  rounded-xl flex flex-row">
                <div className="h-full w-[75%] p-2 text-[#FFFFFF] text-opacity-90 font-roboto">
                    <p className="text-[16px]"><b>Funkcja Kwadratowa</b></p>
                    <p className=" text-[12px]">Kasper Borecki</p>
                    <div className="flex flex-row mt-1">
                    <FaBell  className="mt-[3px] mr-2"/>
                    <p className="">27.03.2024</p>
                    </div>
                </div>
                <div className="h-full w-[25%]">
                <img
                  src={CDNURL + avatar_url}
                  alt='profileAvatar'
                  className='w-16 h-16 rounded-full ml-1 mt-4'
                />
                </div>
            </div>
        </div>
    );
}

export default NearestLesson;