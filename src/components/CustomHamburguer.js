import { Image, VStack, useTheme, View } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Button } from './Button'

export function CustomHamburguer(props) {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const isCare = props.routes[0].params.isCare
  const userName = props.routes[0].params.userName

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
      <Button
        title="Perfil"
        backgroundColor="#511AC7"
        width="80%"
        my={2}
        py={4}
        onPress={() =>
          navigation.navigate('profileCare', {
            isCare, userName
          })
        }
      />
      <Button
        title="Perfil do animal"
        backgroundColor="#511AC7"
        width="80%"
        my={2}
        py={4}
        onPress={() =>
          navigation.navigate('petProfile', {
            isCare
          })
        }
      />
      <Button
        title="Histórico de serviços"
        backgroundColor="#511AC7"
        width="80%"
        my={2}
        py={4}
        onPress={() =>
          navigation.navigate('historyCare', {
            isCare
          })
        }
      />
      <Button
        title="Serviços agendados"
        backgroundColor="#511AC7"
        width="80%"
        my={2}
        py={4}
        onPress={() =>
          navigation.navigate('requestedServices', {
            isCare
          })
        }
      />
      <View mt={10}>
        <Button
          title="Logout"
          color="#511AC7"
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#511AC7"
          width="80%"
          py={4}
          onPress={() => navigation.navigate('signIn')}
        />
      </View>
    </VStack>
  )
}
