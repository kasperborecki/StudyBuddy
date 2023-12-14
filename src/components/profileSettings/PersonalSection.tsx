import UiGradienButtonLong from '../uiButons/UIGradientButtonLong';

const PersonalSection = () => {
  return (
    <>
      <UiGradienButtonLong
        text={'DANE OSOBISTE'}
        push={'/personal-data'}
      />
      <UiGradienButtonLong
        text={'PŁATNOSCI'}
        push={'/paynaments'}
      />
      <UiGradienButtonLong
        text={'HISTORIA ZAJĘĆ'}
        push={'/lessons-history'}
      />
    </>
  );
};

export default PersonalSection;
