
import { NativeBaseProvider, StatusBar, Text } from 'native-base'

import { THEME } from './src/styles/theme'
import { StartService } from './src/screens/StartService'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading'

export default function App() {
  
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      { fontsLoaded ? <StartService/> : Loading }
    </NativeBaseProvider>
  )
}
