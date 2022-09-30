import { NativeBaseProvider, StatusBar, Text } from 'native-base'
import 'react-native-gesture-handler'

import { THEME } from './src/styles/theme'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : Loading}
    </NativeBaseProvider>
  )
}
