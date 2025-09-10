import React from 'react';
import { Image } from 'react-native';

const size = (n) => ({ width: n, height: n, resizeMode: 'contain' });

export const KeralaLogo = ({ dimension = 56, style }) => (
  <Image source={require('../../assets/government-of-kerala-seeklogo.png')} style={[size(dimension), style]} />
);

export const AyushmanBharatLogo = ({ dimension = 56, style }) => (
  <Image source={require('../../assets/ayushman-bharat-english-seeklogo.png')} style={[size(dimension), style]} />
);

export const AppIcon = ({ dimension = 56, style }) => (
  <Image source={require('../../assets/icon.png')} style={[size(dimension), style]} />
);
