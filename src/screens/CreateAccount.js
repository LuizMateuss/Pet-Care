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

export function CreateAccount() {
  return (
    <ScrollView>
      <LinearGradient
        colors={['#00abbc52', '#00abbc']}
        style={{ paddingBottom: 50 }}
      >
        <VStack>
          <View alignItems="center">
            <Image
              position="absolute"
              zIndex={1}
              top={10}
              alt="Logo pet care"
              source={require('../../assets/img/petCareGreenLogo.png')}
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
            <InputData title="Senha:" />
            <InputData title="Repetir Senha:" />
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
            <ServiceButton title="Cadastrar" color="white" />
            <View borderBottomWidth={1} my={5} borderColor="white" />
            <ServiceButton title="Login" color="white" />
          </VStack>
        </VStack>
      </LinearGradient>
    </ScrollView>
  )
}
