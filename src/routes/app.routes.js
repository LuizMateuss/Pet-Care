import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { List } from 'phosphor-react-native'

import { Chat } from '../screens/Chat'
import { HistoryCare } from '../screens/HistoryCare'
import { OrderInfo } from '../screens/OrderInfo'
import { ProfileCare } from '../screens/ProfileCare'
import { Requests } from '../screens/Requests'
import { ServiceInProgress } from '../screens/ServiceInProgress'
import { StartPetCare } from '../screens/StartPetCare'
import { StartService } from '../screens/StartService'
import { UserProfile } from '../screens/UserProfile'
import { OptionsSignUp } from '../screens/OptionsSignUp'
import { CreateAccount } from '../screens/CreateAccount'
import { SignIn } from '../screens/SignIn'
import { CustomHamburguer } from '../components/CustomHamburguer'
import { PetProfile } from '../screens/PetProfile'
import {
  createDrawerNavigator,
  DrawerToggleButton
} from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native'
import { SearchLocalization } from '../screens/SearchLocalization'
import { SearchPetCare } from '../screens/SearchPetCare'
import { ContractService } from '../screens/ContractService'
import { ChangePassword } from '../screens/ChangePassword'
import { RequestedServices } from '../screens/RequestedServices'

const Drawer = createDrawerNavigator()
function MenuHamburguer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerLeft: false,
        headerRight: () => <DrawerToggleButton tintColor="#511AC7" />,
        drawerPosition: 'right',
        drawerType: 'front'
      }}
      drawerContent={props => <CustomHamburguer {...props.state} />}
    >
      <Drawer.Screen name="startPetCare" component={StartPetCare} />
    </Drawer.Navigator>
  )
}

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="optionsSignUp" component={OptionsSignUp} />
      <Screen name="createAccount" component={CreateAccount} />
      <Screen name="menuHamburguer" component={MenuHamburguer} />
      <Screen name="profileCare" component={ProfileCare} />
      <Screen name="changePassword" component={ChangePassword} />
      <Screen name="requests" component={Requests} />
      <Screen name="historyCare" component={HistoryCare} />
      <Screen name="startPetCare" component={StartPetCare} />
      <Screen name="serviceInProgress" component={ServiceInProgress} />
      <Screen name="chat" component={Chat} />
      <Screen name="orderInfo" component={OrderInfo} />
      <Screen name="startService" component={StartService} />
      <Screen name="userProfile" component={UserProfile} />
      <Screen name="petProfile" component={PetProfile} />
      <Screen name="searchLocalization" component={SearchLocalization} />
      <Screen name="searchPetCare" component={SearchPetCare} />
      <Screen name="contractService" component={ContractService} />
      <Screen name="requestedServices" component={RequestedServices} />
    </Navigator>
  )
}
