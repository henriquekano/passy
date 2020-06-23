import React from 'react'
import { Image } from 'react-native'
import OnboardingSwiper from 'react-native-onboarding-swiper'

interface OnboardingProps {
  onDone: () => void
}
const Onboarding: React.FC<OnboardingProps> = ({ onDone }) => (
  <OnboardingSwiper
    pages={[
      {
        backgroundColor: '#086972',
        image: <Image source={require('../../assets/onboarding1.png')} />,
        title: 'Strategize',
        subtitle: 'Choose how to generate the password',
      },
      {
        backgroundColor: '#086972',
        image: <Image source={require('../../assets/onboarding2.png')} />,
        title: 'Show me what you got',
        subtitle: 'Check how strong your password is!',
      },
    ]}
    onDone={onDone}
    onSkip={onDone}
  />
)

export default Onboarding
