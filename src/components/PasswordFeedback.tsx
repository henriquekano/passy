import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Title, Divider, Subheading } from 'react-native-paper'
import zxcvbn from 'zxcvbn'

type Zxcvbn = ReturnType<typeof zxcvbn>
const ScoreMessage: Record<Zxcvbn['score'], string> = {
  0: 'Very weak',
  1: 'Weak',
  2: 'So so',
  3: 'Strong',
  4: 'Very strong',
}

export interface PasswordFeedbackProps {
  textInput: string
}
const PasswordFeedback: React.FC<PasswordFeedbackProps> = ({ textInput }) => {
  const zxcvbnResult = zxcvbn(textInput)
  return (
    <>
      <View style={{ marginVertical: 12, alignItems: 'center' }}>
        <Title>{ScoreMessage[zxcvbnResult.score]}</Title>
        <View
          style={{
            flexDirection: 'row',
            height: 12,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'lightgrey',
            borderRadius: 6,
            marginVertical: 12,
          }}
        >
          <View
            key="veryweak"
            style={{
              backgroundColor:
                zxcvbnResult.score >= 0 ? 'green' : 'transparent',
              flex: 1,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          />
          <View style={{ width: 1, alignSelf: 'stretch' }} />
          <View
            key="weak"
            style={{
              backgroundColor:
                zxcvbnResult.score >= 1 ? 'green' : 'transparent',
              flex: 1,
            }}
          />
          <View style={{ width: 1, alignSelf: 'stretch' }} />
          <View
            key="soso"
            style={{
              backgroundColor:
                zxcvbnResult.score >= 2 ? 'green' : 'transparent',
              flex: 1,
            }}
          />
          <View style={{ width: 1, alignSelf: 'stretch' }} />
          <View
            key="strong"
            style={{
              backgroundColor:
                zxcvbnResult.score >= 3 ? 'green' : 'transparent',
              flex: 1,
            }}
          />
          <View style={{ width: 1, alignSelf: 'stretch' }} />
          <View
            key="verystrong"
            style={{
              backgroundColor:
                zxcvbnResult.score >= 4 ? 'green' : 'transparent',
              flex: 1,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
          />
        </View>
        {textInput !== '' ? (
          <>
            <Subheading style={{ textAlign: 'center', color: 'grey' }}>
              Estimated time for hacking:{'\n'}
              <Text accessibilityStates style={{ fontWeight: 'bold' }}>
                {(() => {
                  const {
                    offline_fast_hashing_1e10_per_second,
                    online_throttling_100_per_hour,
                  } = zxcvbnResult.crack_times_display

                  if (
                    offline_fast_hashing_1e10_per_second ===
                    online_throttling_100_per_hour
                  ) {
                    return `${offline_fast_hashing_1e10_per_second}`
                  }

                  return `${offline_fast_hashing_1e10_per_second} ~ ${online_throttling_100_per_hour}`
                })()}
              </Text>
            </Subheading>
            {zxcvbnResult.feedback.suggestions.length ? (
              <>
                <Subheading style={{ textAlign: 'center', color: 'grey' }}>
                  Suggestions
                </Subheading>

                {zxcvbnResult.feedback.suggestions.map((suggestion) => (
                  <Subheading style={{ fontWeight: 'bold' }}>
                    • {suggestion}
                  </Subheading>
                ))}
              </>
            ) : null}
          </>
        ) : null}
      </View>
      <Divider accessibilityStates />
    </>
  )
}

export default PasswordFeedback
