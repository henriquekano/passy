import React from 'react'
import { NativeModules, Image, View, ScrollView, Platform } from 'react-native'
import { List, Text, Appbar, Paragraph, Button } from 'react-native-paper'

const { goToLocaleSettings } = NativeModules.mymodule

const FaqPage = () => (
  <>
    <Appbar.Header accessibilityStates>
      <Appbar.Content accessibilityStates title="FAQ" />
    </Appbar.Header>

    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      {Platform.Version < 28 ? (
        <>
          <List.Section accessibilityStates>
            <List.Subheader accessibilityStates>About the app</List.Subheader>
          </List.Section>
          <List.Accordion title="How do I change the keyboard?">
            <View style={{ alignItems: 'center' }}>
              <Paragraph style={{ marginHorizontal: 18 }}>
                Click the keyboard button in the navigation tab:
              </Paragraph>
              <Image
                resizeMode="contain"
                style={{ marginVertical: 12 }}
                source={require('../../assets/faq_changekeyboard.png')}
              />
              <Paragraph style={{ marginHorizontal: 18 }}>
                If the navigation tab doesn't show the keyboard icon, set the
                setting "Show keyboard button" in the input settings menu (may
                change from device to device):{' '}
              </Paragraph>
              <Button
                accessibilityStates
                mode="text"
                onPress={() => goToLocaleSettings()}
                style={{ marginHorizontal: 18 }}
              >
                <Text accessibilityStates>click here</Text>
              </Button>
            </View>
          </List.Accordion>
          <List.Accordion title="Why the custom keyboard?" id="1">
            <Paragraph style={{ marginHorizontal: 18 }}>
              Until recent android versions (prior to android 10), the
              clipboard, the "place" where data is sent when copying stuff on
              android, was really public - as in, any app could access it with
              no consent from the user.
              {'\n'}To avoid that, password managers use two approaches:
              autofill and custom keyboards. The first is a recent addition to
              android (8), leaving the latter to be a more global solution.
            </Paragraph>
          </List.Accordion>
        </>
      ) : null}

      <List.Section accessibilityStates>
        <List.Subheader accessibilityStates>About passwords</List.Subheader>
      </List.Section>
      <List.Accordion title="They aren't the best solution for security" id="2">
        <Paragraph style={{ marginHorizontal: 18 }}>
          The way most services restrict passwords is really outdated, not human
          friendly and not necessarily secure. Long story short:{'\n'} · Use two
          authentication methods when available;{'\n'} · Use a password manager;
          {'\n'} · Prefer a memorable phrase to some random string of
          characters;
          {'\n'} · Don't repeat passwords
        </Paragraph>
      </List.Accordion>
    </ScrollView>
  </>
)

export default FaqPage
