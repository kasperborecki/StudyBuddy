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
        <div className="absolute w-[90%] h-36 ml-[5%] mr-[5%]">
            <div className="absolute w-[80%] h-36 bg-[#bb91ff] rounded-xl mx-[10%]"></div>
            <div className="absolute w-[90%] h-32 bg-[#ab79fc] rounded-xl mx-[5%]"></div>
            <div className="absolute w-[100%] h-28 bg-[#9b5dff] rounded-xl flex flex-row">
                <div className="h-full w-[75%] p-2 text-white text-opacity-90">
                    <p className=" text-[17px] font-semibold font-k2d"><b>Funkcja Kwadratowa</b></p>
                    <p className=" text-[13px] font-semibold font-k2d">Kasper Borecki</p>
                    <div className="flex flex-row mt-1">
                    <FaBell  className="mt-[3px] mr-2"/>
                    <p className="">27.03.2024</p>
                    </div>
                </div>
                <div className="h-full w-[25%]">
                <img
                  src={CDNURL + avatar_url}
                  alt='profileAvatar'
                  className='w-20 h-20 rounded-full ml-1 mt-3'
                />
                </div>
            </div>
        </div>
    );
}

export default NearestLesson;