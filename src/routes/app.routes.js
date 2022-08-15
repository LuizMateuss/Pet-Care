import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Chat } from '../screens/Chat'
import { HistoryCare } from '../screens/HistoryCare'
import { OrderInfo } from '../screens/OrderInfo'
import { ProfileCare } from '../screens/ProfileCare'
import { Requests } from '../screens/Requests'
import { ServiceInProgress } from '../screens/ServiceInProgress'
import { StartPetCare } from '../screens/StartPetCare'
import { StartService } from '../screens/StartService'
import { UserProfile } from '../screens/UserProfile'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="startPetCare" component={StartPetCare} />
      <Screen name="profileCare" component={ProfileCare} />
      <Screen name="requests" component={Requests} />
      <Screen name="historyCare" component={HistoryCare} />
      <Screen name="serviceInProgress" component={ServiceInProgress} />
      <Screen name="chat" component={Chat} />
      <Screen name="orderInfo" component={OrderInfo} />
      <Screen name="startService" component={StartService} />
      <Screen name="userProfile" component={UserProfile} />
    </Navigator>
  )
}
