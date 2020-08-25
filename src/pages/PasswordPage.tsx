import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  NativeModules,
  View,
  Platform,
} from 'react-native'
import { TextInput, List, RadioButton, Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import Clipboard from '@react-native-community/clipboard'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import RandomWordsForm from '../components/RandomWordsForm'
import RandomPhraseForm from '../components/RandomPhraseForm'
import RandomStringForm from '../components/RandomStringForm'
import PasswordFeedback from '../components/PasswordFeedback'
import BannerAd from '../components/BannerAd'

const { goToInputSettings } = NativeModules.mymodule

export interface PasswordPageProps {
  onOpenOnboarding: () => void
}
const PasswordPage: React.FC<PasswordPageProps> = ({ onOpenOnboarding }) => {
  const [textInput, setTextInput] = useState('')
  const [strategy, setStrategy] = useState<'string' | 'phrase' | 'words'>(
    'string',
  )

  useEffect(() => {
    AsyncStorage.setItem('generated', textInput)
  }, [textInput])

  return (
    <>
      <Appbar.Header accessibilityStates>
        <Appbar.Content accessibilityStates title="Password" />
        <Appbar.Action
          accessibilityStates
          icon="help"
          onPress={onOpenOnboarding}
        />
      </Appbar.Header>
      <BannerAd />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
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
              contextMenuHidden={Platform.Version >= 28 ? false : true}
            />
          </View>
          <TouchableOpacity
            style={{ paddingHorizontal: 8, paddingLeft: 16 }}
            onPress={() => {
              setTextInput('')
            }}
          >
            <Icons name="close-circle" color="grey" size={28} />
          </TouchableOpacity>
          {Platform.Version >= 28 ? (
            <TouchableOpacity
              style={{ paddingHorizontal: 8 }}
              onPress={() => {
                Clipboard.setString(textInput)
              }}
            >
              <Icons name="content-copy" color="grey" size={28} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ paddingHorizontal: 8 }}
              onPress={() => {
                goToInputSettings()
              }}
            >
              <Icons name="settings" color="grey" size={28} />
            </TouchableOpacity>
          )}
        </View>
        {textInput !== '' ? <PasswordFeedback textInput={textInput} /> : null}
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'lightgrey' }}
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
    </>
  )
}

export default PasswordPage
