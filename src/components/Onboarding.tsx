import React from 'react'
import { Image, View, Platform } from 'react-native'
import OnboardingSwiper from 'react-native-onboarding-swiper'

const pages = [
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
]
if (Platform.Version < 28) {
  pages.concat([
    {
      backgroundColor: '#086972',
      image: (
        <View>
          <Image source={require('../../assets/onboarding3.png')} />
          <View style={{ height: 12 }} />
          <Image source={require('../../assets/onboarding4.png')} />
        </View>
      ),
      title: 'Set the keyboard',
      subtitle: 'Open the available input methods and enable the new keyboard',
    },
    {
      backgroundColor: '#086972',
      image: <Image source={require('../../assets/onboarding5.png')} />,
      title: 'Paste it everywhere',
      subtitle: 'Use the keyboard to paste it somewhere',
    },
  ])
}

interface OnboardingProps {
  onDone: () => void
}
const Onboarding: React.FC<OnboardingProps> = ({ onDone }) => {
  return <OnboardingSwiper pages={pages} onDone={onDone} onSkip={onDone} />
}

export default Onboarding
