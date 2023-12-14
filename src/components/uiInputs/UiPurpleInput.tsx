interface CustomInputProps {
    backgroundText: string;
    isPassword: boolean;
  }
  
  const UiPurpleInput: React.FC<CustomInputProps> = ({ backgroundText, isPassword }) => {
    return (
      <input
        type={isPassword ? 'password' : 'text'}
        className='bg-[#ccabd8] border-2 border-black w-full h-[50px] rounded-3xl mb-[8%] pl-4 focus:outline-none focus:border-purple-500'
        placeholder={backgroundText}
      />
    );
  };
  
  export default UiPurpleInput;
  