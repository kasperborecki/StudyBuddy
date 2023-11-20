interface CustomButtonProps {
    text: string;
  }

const UiPurpleButtonLong: React.FC<CustomButtonProps> = ({ text }) => {
  return (
    <button className="bg-[#ccabd8] border-2 border-black w-[65%] h-[50px] rounded-3xl mb-[8%]">
      {text}
    </button>
  );
};

export default UiPurpleButtonLong;
