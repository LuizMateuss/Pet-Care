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
  fontConfig: {
    Roboto: {
      400: {
        normal: 'Roboto_400Regular'
      },
      700: {
        normal: 'Roboto_700Bold'
      },
      900: {
        normal: 'Roboto_900Black'
      }
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20
  }
})
