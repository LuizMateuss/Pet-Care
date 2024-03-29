import { HStack, VStack, View, Text, ScrollView, Image } from 'native-base'
import { MapPin } from 'phosphor-react-native'
import { Button } from '../components/Button'

import { useNavigation } from '@react-navigation/native'

export function OrderInfo({ route }) {
  const navigation = useNavigation()
  const { request, user, isCare } = route.params

  async function acceptRequest(){
    await fetch(`${process.env.SERVER_LINK}/requestAccept/${user.id}/${request.cd_servico}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    nextPage()
  }
  function nextPage(){
    navigation.navigate('startPetCare', { user, isCare })
  }

  return (
    <VStack mt={8}>
      <ScrollView>
        <Text
          textAlign="center"
          fontSize={35}
          fontWeight="black"
          color="secondary.700"
        >
          Solicitação
        </Text>
        <VStack w="90%" p={4} mx="auto" bg="secondary.700" rounded={40}>
          <HStack alignItems="center">
            <Image
              alt="Imagem do tutor"
              source={require('../../assets/img/anonymous.png')}
              w={100}
              h={100}
              borderRadius={50}
            />
            <VStack ml={5}>
              <Text fontSize={20} fontWeight="black" color="white">
                {request.nm_usuario}
              </Text>
              <HStack>
                <MapPin size={24} color="#FFFFFF" />
                <Text ml={5} fontSize={14} color="white">
                  Santos, SP
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <VStack mt={2} alignItems="center">
            <Text fontSize={35} fontWeight="black" color="white">
              {request.nm_tipo_servico}
            </Text>
            <Text fontSize={16} color="white">
              Solicitação para: {request.dt_time_servico}
            </Text>
          </VStack>
        </VStack>
        <Text
          fontWeight="medium"
          fontSize={20}
          color="secondary.700"
          textAlign="center"
          my={5}
        >
          Valor do serviço: R${request.vl_servico}
        </Text>
        <VStack w="90%" p={4} mx="auto" bg="secondary.700" mb={10} rounded={40}>
          <VStack>
            <Image
              alt="Imagem pet"
              source={require('../../assets/img/PerfilAnimalImagem.png')}
              mx="auto"
            />
            <Text
              textAlign="center"
              fontSize={20}
              fontWeight="black"
              color="white"
            >
              Detalhes do animal
            </Text>
            <HStack justifyContent="space-between">
              <VStack>
                <Text fontSize={18} color="white">
                  Peso
                </Text>
                <Text fontSize={18} color="white">
                  Idade
                </Text>
                <Text fontSize={18} color="white">
                  Raça
                </Text>
                <Text fontSize={18} color="white">
                  Gênero
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={18} color="white">
                  {request.cd_peso_animal}kg
                </Text>
                <Text fontSize={18} color="white">
                  {request.dt_nascimento_animal}
                </Text>
                <Text fontSize={18} color="white">
                  {request.race}
                </Text>
                <Text fontSize={18} color="white">
                  {request.nm_genero_animal}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>

        <HStack justifyContent="space-between">
          <Button
            color="secondary.700"
            title="Aceitar"
            borderWidth={1}
            borderColor="secondary.700"
            w="40%"
            onPress={() => acceptRequest()}
          />
          <Button
            color="red.700"
            title="Recusar"
            borderWidth={1}
            borderColor="red.700"
            w="40%"
            onPress={() => navigation.goBack()}
          />
        </HStack>
        <Button
          color="secondary.700"
          title="Voltar"
          borderWidth={1}
          borderColor="secondary.700"
          width="90%"
          mb={5}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </VStack>
  )
}
