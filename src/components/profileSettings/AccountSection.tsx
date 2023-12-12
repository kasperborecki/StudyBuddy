import UiGradienButtonLong from "../butons/UIGradientButtonLong";

const AccountSection = () => {
    return (
        <>
        <UiGradienButtonLong text={'OPINIE'} push={'/opinions'}/>
        <UiGradienButtonLong text={'POWIADOMIENIA'} push={'/paynaments'}/>
        <UiGradienButtonLong text={'PRYWATNOŚĆ'} push={'/privacy'}/>
        <UiGradienButtonLong text={'KONTO'} push={'/account'}/>
        <UiGradienButtonLong text={'FAQ'} push={'/faq'}/>
        </>
    );
};

export default AccountSection;