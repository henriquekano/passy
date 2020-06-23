import React from 'react'
import { Button } from 'react-native-paper'
import { generateRandomPhrase } from '../../utils'

export interface RandomPhraseFormProps {
  onGenerate: (generated: string) => void
}
const RandomPhraseForm: React.FC<RandomPhraseFormProps> = ({ onGenerate }) => {
  return (
    <Button
      mode="contained"
      accessibilityStates
      onPress={() => {
        onGenerate(generateRandomPhrase({ makesSense: true }))
      }}
    >
      Generate
    </Button>
  )
}

export default RandomPhraseForm
