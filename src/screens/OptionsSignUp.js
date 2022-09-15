import { VStack, Image, Text, View, ScrollView } from 'native-base'
import AppIntroSlider from 'react-native-app-intro-slider'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import { useState } from 'react'

export function OptionsSignUp() {
  const navigation = useNavigation()
  const [showHome, setShowHome] = useState(false)
  const slides = [
    {
      key: 1,
      image: require('../../assets/img/husky-bg.png')
    },
    {
      key: 2,
      image: require('../../assets/img/cat-dog-bg.png')
    },
    {
      key: 3,
      image: require('../../assets/img/dog-bg.png')
    }
  ]
  function renderSlides({ item }) {
    return (
      <View flex={1} bg="white">
        <Image alt="Imagem Pet" source={item.image} w="100%" />
      </View>
    )
  }
  return (
    <View flex={1} bg="white">
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: 'white',
          width: 30,
          position: 'relative',
          top: -50
        }}
        dotStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'white',
          position: 'relative',
          top: -50
        }}
        renderDoneButton={() => <></>}
        renderNextButton={() => <></>}
      />
      <VStack bg="white" pt={4} mb={30}>
        <Text
          fontSize={14}
          fontWeight="bold"
          color="secondary.700"
          textAlign="center"
          mx="auto"
          mb={1}
          w="70%"
        >
          Encontre o cuidado ideal para seu melhor amigo, disponibilizamos
          serviços para que seu animal de estimação esteja sempre ativo e feliz
        </Text>

        <VStack>
          <Button
            bg="#00ABBC"
            width="70%"
            py={4}
            px={8}
            title="Seja um cuidador"
            weight="bold"
            onPress={() =>
              navigation.navigate('createAccount', { isCare: true })
            }
          />
          <Button
            bg="#511AC7"
            width="70%"
            py={4}
            px={8}
            title="Sou um tutor"
            weight="bold"
            onPress={() =>
              navigation.navigate('createAccount', { isCare: false })
            }
          />
        </VStack>
        <Image
          alt="Fundo branco"
          position="absolute"
          top={-60}
          w="100%"
          h={300}
          zIndex={-1}
          source={require('../../assets/img/whiteVectorBottom.png')}
        />
      </VStack>
    </View>
  )
}
