import { NavigationContainer } from '@react-navigation/native'
import { AddPet } from '../screens/AddPet'
import { RegisterAddress } from '../screens/RegisterAddress'

import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
