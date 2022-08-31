import {
  VStack,
  HStack,
  Text,
  Switch,
  ScrollView,
  View,
  Image
} from 'native-base'
import { SafeAreaView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { ServiceButton } from '../components/ServiceButton'

export function StartPetCare({ route }) {
  const navigation = useNavigation()

  const { isCare } = route.params
  const mainColor = isCare ? `#00ABBC` : `#511AC7`
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack>
          <View alignItems="center" mt={5}>
            <Image
              alt="Imagem do usuário"
              borderRadius={60}
              source={require('../../assets/img/anonymous.png')}
            />
          </View>
          <Text
            textAlign="center"
            color={mainColor}
            fontWeight="bold"
            fontSize={20}
            mt={5}
          >
            Seja bem vindo ______ !
          </Text>
          {isCare ? (
            <View>
              <ServiceButton
                backgroundColor={mainColor}
                title="Perfil"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('profileCare', { isCare })
                }
              />
              <ServiceButton
                backgroundColor={mainColor}
                title="Solicitações"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('requests', { isCare })
                }
              />
              <ServiceButton
                backgroundColor={mainColor}
                title="Histórico"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('historyCare', { isCare })
                }
              />
              <ServiceButton
                backgroundColor={mainColor}
                title="Serviços agendados"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('requestedServices', { isCare })
                }
              />
              <ServiceButton
                backgroundColor={mainColor}
                title="Trabalhos em andamento"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('serviceInProgress', { isCare })
                }
              />
            </View>
          ) : (
            <View mt={40}>
              <ServiceButton
                backgroundColor={mainColor}
                title="Passeio"
                color="white"
                margin="auto"
                marginY={3}
                paddingY={4}
                width="80%"
                handleFunction={() =>
                  navigation.navigate('searchLocalization', { isCare })
                }
              />
              {/* <ButtonMain
                title="Passeio"
                color={}
                nextPage={() =>
                  navigation.navigate('searchLocalization', { isCare })
                }
              /> */}
            </View>
          )}
          {isCare ? (
            <View>
              <HStack w="70%" mx="auto" mt="5%" mb={18} alignItems="center">
                <Switch size="lg" colorScheme="primary" />
                <Text
                  ml={5}
                  color="secondary.700"
                  fontWeight="bold"
                  fontSize={16}
                >
                  Estou online para receber solicitações
                </Text>
              </HStack>

              <ServiceButton
                title="Logout"
                borderColor={mainColor}
                borderWidth={1}
                backgroundColor="transparent"
                color={mainColor}
                paddingY={4}
                width="80%"
                margin="auto"
                handleFunction={() => navigation.navigate('signIn')}
              />
            </View>
          ) : (
            <></>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
