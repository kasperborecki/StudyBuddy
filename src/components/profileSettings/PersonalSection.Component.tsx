import UiGradienButtonLong from '../uiComponents/uiButons/UIProfileSettingsButton';

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
