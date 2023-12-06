// IconsSelector.tsx
import React from 'react';
import biology from '../../assets/subjects/biology.png';
import chemistry from '../../assets/subjects/chemistry.png';
import geography from '../../assets/subjects/geography.png';
import history from '../../assets/subjects/history.png';
import mathemathic from '../../assets/subjects/mathemathic.png';
import physics from '../../assets/subjects/physic.png';

interface CustomIconsSelectorProps {
  icon: any;
}

const IconsSelector: React.FC<CustomIconsSelectorProps> = ({ icon }) => {
  console.log('Icon Prop:', icon);

  let iconImage;

  if (icon === biology) {
    iconImage = <img src={biology} alt='Biology' className='w-[100%] h-auto' />;
  } else if (icon === chemistry) {
    iconImage = <img src={chemistry} alt='Chemistry' className='w-[100%] h-auto' />;
  } else if (icon === geography) {
    iconImage = <img src={geography} alt='Geography' className='w-[100%] h-auto' />;
  } else if (icon === history) {
    iconImage = <img src={history} alt='History' className='w-[100%] h-auto' />;
  } else if (icon === mathemathic) {
    iconImage = <img src={mathemathic} alt='Mathematics' className='w-[100%] h-auto' />;
  } else if (icon === physics) {
    iconImage = <img src={physics} alt='Physics' className='w-[100%] h-auto' />;
  }

  console.log('Icon Image:', iconImage);

  return (
    <div>
      {iconImage}
    </div>
  );
};

export default IconsSelector;
