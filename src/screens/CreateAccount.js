import { LinearGradient } from 'expo-linear-gradient'
import {
  HStack,
  VStack,
  Image,
  Text,
  View,
  Radio,
  Checkbox,
  ScrollView
} from 'native-base'
import { CheckBox } from 'react-native'
import { InputData } from '../components/InputData'
import { ServiceButton } from '../components/ServiceButton'
import { useNavigation } from '@react-navigation/native'

export function CreateAccount({ route }) {
  const navigation = useNavigation()
  const { isCare } = route.params

  return (
    <ScrollView>
      <LinearGradient
        colors={isCare ? ['#00abbc52', '#00abbc'] : ['#511AC752', '#511AC7']}
        style={{ paddingBottom: 50 }}
      >
        <VStack>
          <View alignItems="center">
            <Image
              position="absolute"
              zIndex={1}
              top={10}
              alt="Logo pet care"
              source={
                isCare
                  ? require('../../assets/img/petCareGreenLogo.png')
                  : require('../../assets/img/petCarePurpleLogo.png')
              }
            />
            <Image
              w="100%"
              h={250}
              alt="Fundo branco"
              source={require('../../assets/img/whiteVector.png')}
            />
          </View>
          <VStack w="80%" mx="auto">
            <InputData title="Nome Usuário:" />
            <InputData title="E-mail:" />
            <InputData title="Senha:" type="password" />
            <InputData title="Repetir Senha:" type="password" />
            <HStack alignItems="center" mx="auto" mb={10} color="white">
              <Checkbox
                accessibilityLabel="oi"
                rounded={50}
                colorScheme="green"
                borderColor="white"
                bg="transparent"
              ></Checkbox>
              <Text ml={5} color="white">
                concordo com os termos de serviço e a política de privacidade
              </Text>
            </HStack>
            <ServiceButton
              title="Cadastrar"
              color="white"
              nextPage={() =>
                navigation.navigate('startPetCare', {
                  isCare
                })
              }
            />
            <View borderBottomWidth={1} my={5} borderColor="white" />
            <ServiceButton
              title="Login"
              color="white"
              nextPage={() => navigation.navigate('signIn')}
            />
          </VStack>
        </VStack>
      </LinearGradient>
    </ScrollView>
  )
}
