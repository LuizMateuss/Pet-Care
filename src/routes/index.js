import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SearchPetCare } from '../screens/SearchPetCare'

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
