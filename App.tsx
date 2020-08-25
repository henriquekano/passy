import React, { useState, useMemo, useEffect } from 'react'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob'
import {
  Provider as PaperProvider,
  DefaultTheme,
  BottomNavigation,
} from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'
import Onboarding from './src/components/Onboarding'
import PasswordPage from './src/pages/PasswordPage'
import FaqPage from './src/pages/FaqPage'

interface AppProps {
  onboardingShown: boolean
}
const App: React.FC<AppProps> = ({ onboardingShown }) => {
  const [showOnboarding, setShowOnboarding] = useState(!onboardingShown)
  const [tabIndex, setTabIndex] = useState(0)

  const renderScene = useMemo(
    () =>
      BottomNavigation.SceneMap({
        password: () => (
          <PasswordPage onOpenOnboarding={() => setShowOnboarding(true)} />
        ),
        faq: FaqPage,
      }),
    [setShowOnboarding],
  )

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return showOnboarding ? (
    <Onboarding
      onDone={async () => {
        AsyncStorage.setItem('onboardingShown', 'true')
        setShowOnboarding(false)
      }}
    />
  ) : (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#086972',
        },
      }}
    >
      <BottomNavigation
        navigationState={{
          index: tabIndex,
          routes: [
            { key: 'password', title: 'Password', icon: 'lock' },
            { key: 'faq', title: 'FAQ', icon: 'help-circle' },
          ],
        }}
        onIndexChange={setTabIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  )
}

export default App
