import { LinearGradient } from 'expo-linear-gradient'
import {
  HStack,
  VStack,
  Image,
  Text,
  View,
  Checkbox,
  ScrollView
} from 'native-base'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
/*
  Tela de criação de conta.
  -> Componente InputData recebe:
    -> title (string), o que vai ficar como placeholder.
    -> type (string), o tipo da nossa input (password e etc...).
  -> Componente CheckBox:
    -> Recebe cores, label 
  -> propriedade nextPage é responsável por nos levar até a próxima página.
*/
export function CreateAccount({ route }) {
  const navigation = useNavigation()
  const { isCare } = route.params
  function verifyIsCareAndNextPage() {
    if (isCare) {
      navigation.navigate('startPetCare', {
        isCare
      })
    } else {
      navigation.navigate('menuHamburguer', {
        screen: 'startPetCare',
        params: { isCare }
      })
    }
  }

  return (
    <View flex={1}>
      <LinearGradient
        colors={isCare ? ['#00abbc52', '#00abbc'] : ['#511AC752', '#511AC7']}
        style={{ paddingBottom: 50, flex: 1, flexDirection: 'column' }}
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
          <VStack w="80%" mx="auto" mt={2}>
            <Input placeholder="Nome Usuário:" />
            <Input placeholder="E-mail:" />
            <Input placeholder="Senha:" type="password" />
            <Input placeholder="Repetir Senha:" type="password" />
            <Input placeholder="Telefone:" />
            <HStack alignItems="center" mx="auto" mb="2%" color="white">
              <Checkbox
                accessibilityLabel="termos"
                rounded={50}
                colorScheme="green"
                borderColor="white"
                bg="transparent"
              ></Checkbox>
              <Text ml={5} color="white">
                concordo com os termos de serviço e a política de privacidade
              </Text>
            </HStack>
            <Button
              title="Cadastrar"
              color="white"
              my={1}
              w="100%"
              backgroundColor="transparent"
              borderColor="white"
              borderWidth={1}
              onPress={verifyIsCareAndNextPage}
            />
            <View borderBottomWidth={1} my="5%" borderColor="white" />
            <Button
              title="Login"
              color="white"
              backgroundColor="transparent"
              borderColor="white"
              borderWidth={1}
              marginY={1}
              width="100%"
              onPress={() => navigation.navigate('signIn')}
            />
          </VStack>
        </VStack>
      </LinearGradient>
    </View>
  )
}
