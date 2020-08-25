import React from 'react'
import { BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob'

const unitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4308457150792383/3161323805'

const Banner = () => (
  <BannerAd unitId={unitId} size={BannerAdSize.FULL_BANNER} />
)

export default Banner
