import React from 'react'
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob'
import firebaseConfig from '../../firebase.json'

const unitId = __DEV__
  ? TestIds.BANNER
  : firebaseConfig['react-native'].admob_android_app_id

const Banner = () => (
  <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
)

export default Banner
