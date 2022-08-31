import { VStack, Image, Text, View, ScrollView } from 'native-base'
import { SliderBox } from 'react-native-image-slider-box'
import { useNavigation } from '@react-navigation/native'
import { ServiceButton } from '../components/ServiceButton'

export function OptionsSignUp() {
  const navigation = useNavigation()
  const images = [
    require('../../assets/img/husky-bg.png'),
    require('../../assets/img/cat-dog-bg.png'),
    require('../../assets/img/dog-bg.png')
  ]
  return (
    <View flex={1} bg="white">
      <ScrollView>
        <View position="relative" zIndex={-2}>
          <SliderBox
            disableOnPress
            images={images}
            sliderBoxHeight={500}
            autoplayInterval={8000}
            autoplay
            circleLoop
            dotColor="#FFF"
            inactiveDotColor="transparent"
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'white',
              marginBottom: 60
            }}
          />
        </View>
        <VStack>
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
            serviços para que seu animal de estimação esteja sempre ativo e
            feliz
          </Text>

          <VStack>
            <ServiceButton
              backgroundColor="#00ABBC"
              width="70%"
              margin="auto"
              marginY={1}
              paddingY={4}
              paddingX={8}
              title="Seja um cuidador"
              weight="bold"
              color="white"
              handleFunction={() =>
                navigation.navigate('createAccount', { isCare: true })
              }
            />
            <ServiceButton
              backgroundColor="#511AC7"
              width="70%"
              margin="auto"
              marginY={1}
              paddingY={4}
              paddingX={8}
              title="Sou um tutor"
              weight="bold"
              color="white"
              handleFunction={() =>
                navigation.navigate('createAccount', { isCare: false })
              }
            />
          </VStack>
          <Image
            position="absolute"
            zIndex={-1}
            top={-60}
            alt="Fundo branco"
            w="100%"
            h={308}
            source={require('../../assets/img/whiteVectorBottom.png')}
          />
        </VStack>
      </ScrollView>
    </View>
  )
}
