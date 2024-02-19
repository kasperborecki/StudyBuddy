import { IoHeartOutline } from "react-icons/io5";

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
    "https://kgejrkbokmzmryqkyial.supabase.co/storage/v1/object/public/avatars/";

  return (
    <div className="relative top-40 bg-[#FEECEB] w-full">
      <div className=" w-[90%] m-[5%] h-[340px] bg-white ">
        <div className="relative flex flex-row justify-between h-24 w-full p-2">
          <img
            src={CDNURL + profileIcon}
            className=" rounded-full w-[80px] h-[80px]"
          />
          <p className="text-[#212427b0] text-[18px] font-semibold -ml-20">
            {name}
          </p>
          <div className="flex flex-col ">
            <IoHeartOutline className=" text-red-700 w-7 h-7 absolute right-2 " />
            <p className=" absolute top-12 right-3 text-[#212427b0] text-[15px] font-semibold">
              {date.slice(0, 10)}
            </p>
          </div>
        </div>
        <div className="flex flex-col p-4 ">
          <p className=" text-[18px] font-semibold text-blue-500 break-words">
            {tittle.slice(0, 30)}
          </p>
          <p className="break-words">{description.slice(0, 150)}</p>
          <hr className=" bg-black"></hr>
        </div>

        <div className="flex flex-row justify-between px-[15%]">
          <p className="pt-2 font-bold flex flex-row">
            {views}
            <p className=" font-normal pl-2">wyświetleń</p>
          </p>
          <p className="font-bold flex flex-row ">
            {likes} <p className="font-normal pl-2">polubień</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumPosts;
