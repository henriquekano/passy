import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { generateRandomPhrase } from '../../utils'

export interface RandomWordsFormProps {
  onGenerate: (generated: string) => void
}
const RandomWordsForm: React.FC<RandomWordsFormProps> = ({ onGenerate }) => {
  return (
    <Button
      mode="contained"
      accessibilityStates
      onPress={() => {
        onGenerate(generateRandomPhrase({ makesSense: false }))
      }}
    >
      Generate
    </Button>
  )
}

export default RandomWordsForm
