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

import { List } from 'native-base'

import { useNavigation } from '@react-navigation/native'

export function StartPetCare() {
  const { colors } = useTheme()

  const navigation = useNavigation()
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
            color="secondary.700"
            fontWeight="bold"
            fontSize={20}
            my={5}
          >
            Seja bem vindo ______ !
          </Text>
          <ButtonMain
            title="Perfil"
            color={colors.secondary[700]}
            colorText={colors.white}
            nextPage={() => navigation.navigate('profileCare')}
          />
          <ButtonMain
            title="Solicitações"
            color={colors.secondary[700]}
            colorText={colors.white}
            nextPage={() => navigation.navigate('requests')}
          />
          <ButtonMain
            title="Históricos"
            color={colors.secondary[700]}
            colorText={colors.white}
            nextPage={() => navigation.navigate('historyCare')}
          />
          <ButtonMain
            title="Trabalhos em andamento"
            color={colors.secondary[700]}
            colorText={colors.white}
            nextPage={() => navigation.navigate('startService')}
          />
          <HStack w="70%" mx="auto" mt={20} mb={18} alignItems="center">
            <Switch size="lg" colorScheme="primary" />
            <Text ml={5} color="secondary.700" fontWeight="bold" fontSize={16}>
              Estou online para receber solicitações
            </Text>
          </HStack>

          <ButtonMain
            title="Logout"
            color={'transparent'}
            colorText={colors.secondary[700]}
          />
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
