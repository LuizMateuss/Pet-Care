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
import { Button } from '../components/Button'

export function StartPetCare({ route }) {
  const navigation = useNavigation()

  const { isCare, userName } = route.params
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
            Seja bem vindo {userName}!
          </Text>
          {isCare ? (
            <View>
              <Button
                backgroundColor={mainColor}
                title="Perfil"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() => navigation.navigate('profileCare', { isCare, userName })}
              />
              <Button
                backgroundColor={mainColor}
                title="Solicitações"
                color="white"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() => navigation.navigate('requests', { isCare })}
              />
              <Button
                backgroundColor={mainColor}
                title="Histórico"
                color="white"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() => navigation.navigate('historyCare', { isCare })}
              />
              <Button
                backgroundColor={mainColor}
                title="Serviços agendados"
                color="white"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() =>
                  navigation.navigate('requestedServices', { isCare })
                }
              />
              <Button
                backgroundColor={mainColor}
                title="Trabalhos em andamento"
                color="white"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() =>
                  navigation.navigate('serviceInProgress', { isCare })
                }
              />
            </View>
          ) : (
            <View mt={40}>
              <Button
                backgroundColor={mainColor}
                title="Passeio"
                color="white"
                margin="auto"
                my={3}
                py={4}
                width="80%"
                onPress={() =>
                  navigation.navigate('searchLocalization', { isCare })
                }
              />
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

              <Button
                title="Logout"
                borderWidth={1}
                borderColor={mainColor}
                color={mainColor}
                py={4}
                width="80%"
                margin="auto"
                onPress={() => navigation.navigate('signIn')}
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
