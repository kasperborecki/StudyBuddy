import UiGradienButtonLong from '../uiComponents/uiButons/UIProfileSettingsButton';

const AccountSection = () => {
  return (
    <>
      <UiGradienButtonLong
        text={'OPINIE'}
        push={'/opinions'}
      />
      <UiGradienButtonLong
        text={'POWIADOMIENIA'}
        push={'/paynaments'}
      />
      <UiGradienButtonLong
        text={'PRYWATNOŚĆ'}
        push={'/privacy'}
      />
      <UiGradienButtonLong
        text={'KONTO'}
        push={'/account-settings'}
      />
      <UiGradienButtonLong
        text={'FAQ'}
        push={'/faq'}
      />
    </>
  );
};

export default AccountSection;
