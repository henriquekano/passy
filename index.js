/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob'

admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.G,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: false,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: false,
  })
  .then(() => {
    // Request config successfully set!
  })

AppRegistry.registerComponent(appName, () => App)
