import {
  VStack,
  HStack,
  Text,
  useTheme,
  Switch,
  ScrollView,
  View
} from 'native-base'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

import { ButtonMain } from '../components/ButtonMain'

import { useNavigation } from '@react-navigation/native'

export function StartPetCare({ route }) {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const { isCare } = route.params
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack>
          <View alignItems="center">
            <Image
              style={styles.imageUser}
              source={require('../../assets/img/anonymous.png')}
            />
          </View>
          <Text
            textAlign="center"
            color={
              isCare ? `${colors.secondary[700]}` : `${colors.primary[700]}`
            }
            fontWeight="bold"
            fontSize={20}
            my={5}
          >
            Seja bem vindo ______ !
          </Text>
          {isCare ? (
            <View>
              <ButtonMain
                title="Perfil"
                color={colors.secondary[700]}
                colorText={colors.white}
                nextPage={() => navigation.navigate('profileCare', { isCare })}
              />
              <ButtonMain
                title="Solicitações"
                color={colors.secondary[700]}
                colorText={colors.white}
                nextPage={() => navigation.navigate('requests', { isCare })}
              />
              <ButtonMain
                title="Históricos"
                color={colors.secondary[700]}
                colorText={colors.white}
                nextPage={() => navigation.navigate('historyCare', { isCare })}
              />
              <ButtonMain
                title="Trabalhos em andamento"
                color={colors.secondary[700]}
                colorText={colors.white}
                nextPage={() => navigation.navigate('startService', { isCare })}
              />
            </View>
          ) : (
            <View mt={40}>
              <ButtonMain
                title="Passeio"
                color={colors.primary[700]}
                colorText={colors.white}
                nextPage={() => navigation.navigate('profileCare')}
              />
            </View>
          )}
          {isCare ? (
            <View>
              <HStack w="70%" mx="auto" mt={20} mb={18} alignItems="center">
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

              <ButtonMain
                title="Logout"
                color={'transparent'}
                colorText={colors.secondary[700]}
                nextPage={() => navigation.navigate('signIn')}
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

const styles = StyleSheet.create({
  imageUser: {
    borderRadius: 40,
    marginTop: 25
  }
})
