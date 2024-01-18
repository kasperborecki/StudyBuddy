import MailModalBg from '../../assets/MailConfirmMailBg.png';

const MailConfirmModal = () => {
  return (
    <div className='absolute z-20'>
      <img
        src={MailModalBg}
        alt='ModalBg'
        className='flex w-[80%] h-[60%] rounded-[40px] mx-[10%] my-[20%]'
      />
      <div className="absolute top-[35%] text-center z-30 mx-[10%]">
      <p className="text-2xl text-[#F0FFF0] font-semibold">Dziękujemy za twoją rejestracje!</p>
        <p className="text-xl text-[#F0FFF0]">Miło nam, że tu jesteś!</p>
        <p className="text-xl text-[#F0FFF0]">Natomiast zanim zaczniesz, wysłaliśmy ci email z linkiem aktywacyjnym :)</p>
        <button className="btn btn-neutral mt-12 text-[15px] text-[#f0f0f0]">Wyślij email ponownie</button>
      </div>
    </div>
  );
};

export default MailConfirmModal;
