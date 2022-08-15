import { useState, useEffect } from 'react'
import {
  HStack,
  VStack,
  View,
  Text,
  Button,
  Image,
  useTheme,
  Input
} from 'native-base'
import { StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { CaretLeft } from 'phosphor-react-native'

const ModalRating = ({ visible, children, ...props }) => {
  const { colors } = useTheme()
  const [showModal, setShowModal] = useState(props.visible)

  useEffect(() => {
    toggleModal()
  }, [visible])

  const toggleModal = () => {
    visible ? setShowModal(true) : setShowModal(false)
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  )
}

export function HistoryCard(props) {
  const [visible, setVisible] = useState(false)

  const [defaultRating, setDefaultRating] = useState(2)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  const RatingBar = () => {
    return (
      <HStack>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                w={25}
                h={25}
                alt="Estrelas de avaliação"
                source={
                  item <= defaultRating
                    ? require('../../assets/img/star_filled.png')
                    : require('../../assets/img/star_corner.png')
                }
              />
            </TouchableOpacity>
          )
        })}
      </HStack>
    )
  }
  return (
    <VStack
      borderWidth={1}
      borderColor="secondary.700"
      borderRadius={40}
      w="90%"
      mx="auto"
      my={5}
    >
      <VStack borderTopRadius={40} alignItems="center" bg="secondary.700" p={4}>
        <Image
          alt="Image tutor"
          style={styles.imageUser}
          source={props.image}
        />
        <Text fontWeight="black" fontSize={20} color="white">
          {props.name}
        </Text>
      </VStack>
      <View m="auto" style={styles.shape}>
        <View style={styles.shapeBg}></View>
      </View>
      <VStack p={4}>
        <Text
          textAlign="center"
          fontWeight="black"
          fontSize={18}
          color="secondary.700"
        >
          Detalhes do serviço
        </Text>
        <HStack justifyContent="space-between" mx={4}>
          <VStack>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Tipo
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Data
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              Valor
            </Text>
          </VStack>
          <VStack>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              {props.typeService}
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              {props.dateService}
            </Text>
            <Text fontWeight="black" fontSize={14} color="secondary.700">
              R${props.valueService}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack
        p={2}
        justifyContent="space-between"
        bg="secondary.700"
        borderBottomRadius={40}
      >
        <Button bg="transparent" _pressed={{ bg: 'transparent' }} ml={6}>
          <Text fontWeight="black" fontSize={16} color="white">
            {props.isCare ? 'Perfil do tutor' : 'Perfil do cuidador'}
          </Text>
        </Button>
        <Button
          onPress={() => setVisible(true)}
          bg="transparent"
          _pressed={{ bg: 'transparent' }}
          mr={6}
        >
          <Text fontWeight="black" fontSize={16} color="white">
            Avaliar
          </Text>
        </Button>
      </HStack>
      <ModalRating visible={visible}>
        <View style={styles.modalCard}>
          <CaretLeft size={26} color="#511AC7" />
          <VStack alignItems="center">
            <Image
              mb={5}
              borderRadius={50}
              alt="Foto tutor"
              source={props.image}
            />
            <RatingBar />
          </VStack>
          <Input
            multiline
            placeholder="Escreva sua avaliação"
            bg="#F3F3F3"
            borderRadius={20}
            pb={20}
            mt={5}
            borderColor="transparent"
          />
        </View>
        <VStack borderBottomRadius={20} w="90%" p="5" bg="primary.700">
          <Text
            textAlign="center"
            fontWeight="black"
            fontSize={16}
            color="white"
            onPress={() => setVisible(false)}
          >
            {props.isCare ? 'Avaliar tutor' : 'Avaliar cuidador'}
          </Text>
        </VStack>
      </ModalRating>
    </VStack>
  )
}

const styles = StyleSheet.create({
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  shape: {
    overflow: 'hidden',
    height: 25,

    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,

    backgroundColor: 'transparent',
    transform: [{ scaleX: 7 }]
  },
  shapeBg: {
    backgroundColor: '#00ABBC',
    width: 50,
    height: 50,
    transform: [{ scaleX: 7 }]
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(217,217,217,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    width: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderColor: '#511AC7',
    borderWidth: 1
  }
})
