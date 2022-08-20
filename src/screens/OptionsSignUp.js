import {
  HStack,
  VStack,
  Image,
  Text,
  View,
  ScrollView,
  Button
} from 'native-base'
import { ImageBackground, StyleSheet } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { ButtonMain } from '../components/ButtonMain'
import { useNavigation } from '@react-navigation/native'

export function OptionsSignUp() {
  const navigation = useNavigation()
  const images = [
    require('../../assets/img/husky-bg.png'),
    require('../../assets/img/cat-dog-bg.png'),
    require('../../assets/img/dog-bg.png')
  ]
  return (
    <VStack>
      <ScrollView>
        <View position="relative" zIndex={-2}>
          <SliderBox
            disableOnPress
            images={images}
            sliderBoxHeight={552}
            autoplayInterval={10000}
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
            w="70%"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
            velit urna. Nam ullamcorper eleifend cursus. Donec in sapien ante.
            Ut dictum hendrerit justo, ac hendrerit quam volutpat quis. Sed nibh
            massa, vehicula ac justo in, sollicitudin ullamcorper tortor.
          </Text>

          <VStack>
            <Button
              bg="#00ABBC"
              rounded={60}
              w="70%"
              m="auto"
              my={3}
              py={4}
              px={8}
              _pressed={{ opacity: 1 }}
              onPress={() =>
                navigation.navigate('createAccount', {
                  isCare: true
                })
              }
            >
              <Text
                fontWeight="bold"
                textAlign="center"
                fontSize={14}
                color="white"
              >
                Seja um cuidador
              </Text>
            </Button>
            <Button
              bg="#511AC7"
              rounded={60}
              w="70%"
              m="auto"
              my={3}
              py={4}
              px={8}
              _pressed={{ opacity: 1 }}
              onPress={() =>
                navigation.navigate('createAccount', {
                  isCare: false
                })
              }
            >
              <Text
                fontWeight="bold"
                textAlign="center"
                fontSize={14}
                color="white"
              >
                Sou um tutor
              </Text>
            </Button>
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
    </VStack>
  )
}
