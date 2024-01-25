import {useRecoilState} from 'recoil';
import {alertTypeAtom} from '../../atoms/AlertState.Atom';

const AlertComponent = () => {
  const [alertType] = useRecoilState(alertTypeAtom);

  let content = null;

  switch (alertType) {
    case 1:
      content = (
        <div
          role='alert'
          className='alert alert-success absolute w-full h-12 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6 text-[#212427]'
            fill='none'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='text-[15px] font-medium text-[#212427]'>
            Sukces! Oferta została dodana!
          </span>
        </div>
      );
      break;
    case 2:
      content = (
        <div
          role='alert'
          className='alert alert-success absolute w-full h-12 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6 text-[#212427]'
            fill='none'
            viewBox='0 0 24 24'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <span className='text-[15px] font-medium text-[#212427]'>cos</span>
        </div>
      );
      break;
    case 3:
      content = (
        <div
          role='alert'
          className='alert alert-success absolute w-full h-12 flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6 text-[#212427]'
            fill='none'
            viewBox='0 0 24 24'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span className='text-[15px] font-medium text-[#212427]'>
            Błąd! Oferta nie została dodana....
          </span>
        </div>
      );
      break;
    case 0:
      content = null;
      break;
  }

  return <>{content}</>;
};

export default AlertComponent;
