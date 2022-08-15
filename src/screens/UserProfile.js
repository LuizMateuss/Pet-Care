import {
  HStack,
  VStack,
  View,
  Text,
  ScrollView,
  Image,
  Button
} from 'native-base'
import { Info, MapPin } from 'phosphor-react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Header } from '../components/Header'
import { ServiceButton } from '../components/ServiceButton'

export function UserProfile() {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
  const RatingBar = () => {
    return (
      <HStack>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={item}>
              <Image
                w={15}
                h={15}
                mx={1}
                alt="Estrelas de avaliação"
                source={require('../../assets/img/star_filled.png')}
              />
            </TouchableOpacity>
          )
        })}
      </HStack>
    )
  }
  return (
    <VStack>
      <Header title="Perfil do tutor" color="#511AC7" />
      <VStack bg="primary.700" p={5} alignItems="center">
        <Image
          w={100}
          h={100}
          mb={5}
          borderRadius={50}
          alt="Foto do tutor"
          source={require('../../assets/img/anonymous.png')}
        />
        <Text mb={1} fontWeight="black" fontSize={16} color="white">
          Nome tutor
        </Text>
        <RatingBar />
        <HStack mt={2}>
          <MapPin size={24} color="#FFFFFF" />
          <Text ml={5} fontSize={14} color="white">
            Santos, SP
          </Text>
        </HStack>
      </VStack>
      <VStack
        alignItems="center"
        m={5}
        borderRadius={20}
        bg="primary.700"
        px={4}
      >
        <HStack mt={2}>
          <Info size={24} color="#FFFFFF" />
          <Text ml={5} fontSize={14} color="white">
            Sobre mim
          </Text>
        </HStack>
        <Text py={4} fontSize={12} color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
          velit urna. Nam ullamcorper eleifend cursus. Donec in sapien ante. Ut
          dictum hendrerit justo, ac hendrerit quam volutpat quis.{' '}
        </Text>
      </VStack>
      <View w="40%" m="auto">
        <ServiceButton title="Chat" color="primary.700" />
      </View>
    </VStack>
  )
}
