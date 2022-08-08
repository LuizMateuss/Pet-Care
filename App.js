
import { NativeBaseProvider, StatusBar, Text } from 'native-base'

import { THEME } from './src/styles/theme'

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading'
import { Chat } from './src/screens/Chat'
import { StartService } from './src/screens/StartService'

export default function App() {
  
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      { fontsLoaded ? <Chat/> : Loading }
    </NativeBaseProvider>
  )
}
