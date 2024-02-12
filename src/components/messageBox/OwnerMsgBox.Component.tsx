interface OwnerMsgBoxProps {
    text: string; // Tutaj zdefiniowano typ jako string
    isMine: boolean;
    date: string; // Dodano właściwość daty
}

const OwnerMsgBoxComponent: React.FC<OwnerMsgBoxProps> = ({ text, isMine, date }) => {
    return (
      <div className={`flex ${isMine ? 'justify-end ml-20' : 'justify-start mr-20'} mb-2 `}>
        <div
            className={`rounded-lg p-3 text-white ${isMine ? 'ml-2 bg-[#4456fc] ' : 'mr-2 bg-gray-400 bg-opacity-50'}`}
        >
          {text}
        </div>
      </div>
    );
  };
  
  export default OwnerMsgBoxComponent;
  