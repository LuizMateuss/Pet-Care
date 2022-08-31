import { Image, VStack, useTheme, View } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { ServiceButton } from './ServiceButton'

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
      <ServiceButton
        title="Perfil"
        color="white"
        backgroundColor="#511AC7"
        width="80%"
        margin="auto"
        marginY={2}
        handleFunction={() =>
          navigation.navigate('profileCare', {
            isCare
          })
        }
      />
      <ServiceButton
        title="Perfil do animal"
        color="white"
        backgroundColor="#511AC7"
        width="80%"
        margin="auto"
        marginY={2}
        handleFunction={() =>
          navigation.navigate('petProfile', {
            isCare
          })
        }
      />
      <ServiceButton
        title="Histórico de serviços"
        color="white"
        backgroundColor="#511AC7"
        width="80%"
        margin="auto"
        marginY={2}
        handleFunction={() =>
          navigation.navigate('historyCare', {
            isCare
          })
        }
      />
      <ServiceButton
        title="Serviços agendados"
        color="white"
        backgroundColor="#511AC7"
        width="80%"
        margin="auto"
        marginY={2}
        handleFunction={() =>
          navigation.navigate('requestedServices', {
            isCare
          })
        }
      />
      <View mt={10}>
        <ServiceButton
          title="Logout"
          color="#511AC7"
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#511AC7"
          width="80%"
          margin="auto"
          handleFunction={() => navigation.navigate('signIn')}
        />
      </View>
    </VStack>
  )
}
