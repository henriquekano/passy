import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import {
  Button,
  Subheading,
  Checkbox,
  List,
  DefaultTheme,
  useTheme,
  Theme,
} from 'react-native-paper'
import Slider from '@react-native-community/slider'
import { generateRandomString } from '../../utils'

interface InputStuffProps {
  label: string
  startValue: number
  onChangeInput: (newValue: number) => void
  minimumValue: number
  maximumValue: number
}
const InputStuff: React.FC<InputStuffProps> = ({
  label,
  startValue,
  onChangeInput,
  maximumValue,
  minimumValue,
}) => {
  const theme = useTheme()
  const [value, setValue] = useState(startValue)
  return (
    <View
      style={{
        alignItems: 'flex-start',
        marginVertical: 4,
        marginHorizontal: 16,
      }}
    >
      <Subheading
        style={{ flex: 1, color: theme!.colors.primary }}
      >{`${label}: ${value}`}</Subheading>
      <Slider
        value={startValue}
        style={{ alignSelf: 'stretch' }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={1}
        onValueChange={(newValue) => {
          setValue(newValue)
          onChangeInput(newValue)
        }}
        minimumTrackTintColor={DefaultTheme.colors.accent}
        maximumTrackTintColor="#000000"
      />
    </View>
  )
}

export interface RandomStringFormProps {
  onGenerate: (generated: string) => void
}
const RandomStringForm: React.FC<RandomStringFormProps> = ({ onGenerate }) => {
  const [length, setLength] = useState(20)
  const [upperCasedLetters, setUpperCasedLetters] = useState(1)
  const [numbers, setNumbers] = useState(1)
  const [lowerCasedLetters, setLowerCasedLetters] = useState(1)
  const [specialCharacters, setSpecialCharacters] = useState(1)
  const [restrictSpecialCharacters, setRestrictSpecialCharacters] = useState(
    false,
  )
  const [useReallySpecialCharacters, setUseReallySpecialCharacters] = useState(
    true,
  )
  const [
    reallySpecialCharactersDisabled,
    setUseReallySpecialCharactersDisabled,
  ] = useState(false)
  const [easyToRead, setEasyToRead] = useState(true)

  useEffect(() => {
    if (restrictSpecialCharacters) {
      setUseReallySpecialCharacters(false)
      setUseReallySpecialCharactersDisabled(true)
    } else {
      setUseReallySpecialCharactersDisabled(false)
    }
  }, [restrictSpecialCharacters])

  return (
    <>
      <View>
        <List.Accordion
          title="Advanced settings"
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 4,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderTopWidth: 0,
              borderColor: 'lightgrey',
              borderBottomRightRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          >
            <InputStuff
              label="Length"
              onChangeInput={setLength}
              startValue={20}
              minimumValue={8}
              maximumValue={100}
            />
            <List.Section accessibilityStates title="At least...">
              <InputStuff
                label="Numbers"
                onChangeInput={setNumbers}
                startValue={1}
                maximumValue={length}
                minimumValue={0}
              />
              <InputStuff
                label="Uppercase letters"
                onChangeInput={setUpperCasedLetters}
                startValue={1}
                maximumValue={length}
                minimumValue={0}
              />
              <InputStuff
                label="Special characters"
                onChangeInput={setSpecialCharacters}
                startValue={1}
                maximumValue={length}
                minimumValue={0}
              />
              <InputStuff
                label="Lowercase letters"
                onChangeInput={setLowerCasedLetters}
                startValue={1}
                maximumValue={length}
                minimumValue={0}
              />
            </List.Section>
            <List.Section accessibilityStates title="Other">
              <Checkbox.Item
                label="Restrict special characters usage"
                onPress={() =>
                  setRestrictSpecialCharacters(!restrictSpecialCharacters)
                }
                status={restrictSpecialCharacters ? 'checked' : 'unchecked'}
              />
              <Checkbox.Item
                label="Consider really special characters"
                onPress={() => {
                  if (!reallySpecialCharactersDisabled) {
                    setUseReallySpecialCharacters(!useReallySpecialCharacters)
                  }
                }}
                status={useReallySpecialCharacters ? 'checked' : 'unchecked'}
                disabled={restrictSpecialCharacters}
              />
              <Checkbox.Item
                label="Easy to read"
                onPress={() => setEasyToRead(!easyToRead)}
                status={easyToRead ? 'checked' : 'unchecked'}
              />
            </List.Section>
          </View>
        </List.Accordion>
      </View>
      <Button
        mode="contained"
        accessibilityStates
        style={{ marginVertical: 12 }}
        onPress={() => {
          const randomString = generateRandomString({
            atLeastNCapitalLetters: upperCasedLetters,
            atLeastNNumbers: numbers,
            atLeastNSmallLetters: lowerCasedLetters,
            atLeastNSpecialCharacters: specialCharacters,
            numberOfCharacters: length,
            shouldBeEasyToRead: easyToRead,
            restrictReallySpecialCharacters: !useReallySpecialCharacters,
            restrictSpecialCharacters: restrictSpecialCharacters,
          })
          onGenerate(randomString)
        }}
      >
        Generate
      </Button>
    </>
  )
}

export default RandomStringForm
