import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#511AC7'
    },
    secondary: {
      700: '#00ABBC'
    },
    red: {
      700: '#BC0000'
    },
    cyan: {
      700: '#45595B'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20
  }
})