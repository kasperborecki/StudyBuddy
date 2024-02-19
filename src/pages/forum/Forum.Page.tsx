import { useRecoilState } from "recoil";
import { DarkModeAtom } from "../../atoms/DarkMode.Atom";
import { FaSearch } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { subjectIdAtom, subjectNameAtom } from "../../atoms/Subject.Atom";
import ForumPosts from "../../components/forumPosts/ForumPosts";
import { useEffect, useState } from "react";
import { Forum } from "../../interfaces/Forum.Interfaces";
import ForumData from "../../services/common/Forum.Selector";

const ForumPage = () => {
  const [isDarkMode] = useRecoilState(DarkModeAtom);
  const [selectedSubjectName] = useRecoilState(subjectNameAtom);
  const [selectedSubjectId] = useRecoilState(subjectIdAtom);
  const [forumData, setForumData] = useState<Forum[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await ForumData.getAllPosts(selectedSubjectId);
        setForumData(postsRes);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    console.log(selectedSubjectId);
    console.log(forumData);
    fetchPosts();
  }, [selectedSubjectId]);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? "bg-[#212121]" : "bg-[#FEECEB]"
      }`}
    >
      <div>
        <div className="absolute left-0 bg-[#FEECEB] w-[50%] h-20 p-[25px]">
          <p className="font-semibold text-[22px] text-[#212427] ">Forum</p>
        </div>
        <div className="p-7 absolute flex flex-row justify-end right-0 bg-[#FEECEB] w-[50%] h-20">
          <FaSearch className="w-6 h-6 mx-2 text-gray-500" />
          <BsFilterRight className="w-7 h-7 -mt-0.5" />
        </div>
      </div>
      <div className="absolute flex justify-center h-20 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 to-gray-800 bg-gradient-to-rs top-20">
        <p className="text-white text-[22px] text-semibold p-5">
          {selectedSubjectName}
        </p>
      </div>
      {forumData.map((data) => (
        <ForumPosts
          name={"Hubert Czaplicki"}
          profileIcon={"421992140_1430648034327163_1645715190455232193_n.jpg"}
          tittle={data.tittle}
          description={data.description}
          date={data.created_at}
          views={data.views}
          answers={420}
          likes={data.likes}
        />
      ))}
    </div>
  );
};
export default ForumPage;
