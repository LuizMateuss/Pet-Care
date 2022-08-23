import { Image, Text, VStack, useTheme, View } from 'native-base'
import { ButtonMain } from './ButtonMain'
import { useNavigation } from '@react-navigation/native'

export function CustomHamburguer(props) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const isCare = props.routes[0].params.isCare

  return (
    <VStack mt={20}>
      <View mb={10} alignItems="center">
        <Image
          w={100}
          h={100}
          borderRadius={50}
          alt="Imagem usuário"
          source={require('../../assets/img/anonymous.png')}
        />
      </View>
      <ButtonMain
        title="Perfil"
        color={colors.primary[700]}
        colorText={colors.white}
        nextPage={() =>
          navigation.navigate('profileCare', {
            isCare
          })
        }
      />
      <ButtonMain
        title="Perfil do animal"
        color={colors.primary[700]}
        colorText={colors.white}
        nextPage={() =>
          navigation.navigate('petProfile', {
            isCare
          })
        }
      />
      <ButtonMain
        title="Histórico de serviços"
        color={colors.primary[700]}
        colorText={colors.white}
        nextPage={() =>
          navigation.navigate('historyCare', {
            isCare
          })
        }
      />
      <ButtonMain
        title="Serviços em andamento"
        color={colors.primary[700]}
        colorText={colors.white}
        nextPage={() =>
          navigation.navigate('profileCare', {
            isCare
          })
        }
      />
      <View mt={10}>
        <ButtonMain
          title="Logout"
          color={'transparent'}
          colorText={colors.primary[700]}
          nextPage={() => navigation.navigate('signIn')}
        />
      </View>
    </VStack>
  )
}
