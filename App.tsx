import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import {
  Provider as PaperProvider,
  TextInput,
  List,
  DefaultTheme,
  RadioButton,
} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import RandomWordsForm from './src/components/RandomWordsForm'
import RandomPhraseForm from './src/components/RandomPhraseForm'
import RandomStringForm from './src/components/RandomStringForm'
import PasswordFeedback from './src/components/PasswordFeedback'
import Onboarding from './src/components/Onboarding'
import BannerAd from './src/components/BannerAd'

interface AppProps {
  onboardingShown: boolean
}
const App: React.FC<AppProps> = ({ onboardingShown }) => {
  const [textInput, setTextInput] = useState('')
  const [strategy, setStrategy] = useState<'string' | 'phrase' | 'words'>(
    'string',
  )
  const [showOnboarding, setShowOnboarding] = useState(!onboardingShown)
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
      <BannerAd />
      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              mode="outlined"
              placeholder="Password"
              accessibilityStates
              value={textInput}
              onChangeText={setTextInput}
              multiline
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
            />
          </View>
          {textInput !== '' ? (
            <TouchableOpacity
              onPress={() => {
                setTextInput('')
              }}
            >
              <Icons name="close-circle" color="grey" size={28} />
            </TouchableOpacity>
          ) : null}
        </View>
        <PasswordFeedback textInput={textInput} />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
      >
        <List.Section accessibilityStates title="strategy">
          <RadioButton.Group
            value={strategy}
            onValueChange={(newStrategy) => {
              setStrategy(newStrategy as typeof strategy)
            }}
          >
            <RadioButton.Item label="Random words" value="words" />
            <RadioButton.Item label="Random phrase" value="phrase" />
            <RadioButton.Item label="Random string" value="string" />
          </RadioButton.Group>
        </List.Section>

        {strategy === 'words' ? (
          <RandomWordsForm onGenerate={setTextInput} />
        ) : null}

        {strategy === 'phrase' ? (
          <RandomPhraseForm onGenerate={setTextInput} />
        ) : null}

        {strategy === 'string' ? (
          <RandomStringForm onGenerate={setTextInput} />
        ) : null}
      </ScrollView>
    </PaperProvider>
  )
}

export default App
