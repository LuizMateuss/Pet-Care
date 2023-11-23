import { useEffect, useState } from 'react'
import {
  VStack,
  ScrollView,
  View,
  Image,
  Text,
  HStack,
  Modal,
  Platform
} from 'native-base'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import {
  CalendarBlank,
  CaretLeft,
  MagnifyingGlass
} from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import {
  DateTimePicker,
  DateTimePickerAndroid
} from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APIconnection } from '../api/connection';

export function SearchPetCare({ route }) {
  const { isCare, user } = route.params
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [newName, setNewName] = useState(user.name)
  const [newEmail, setNewEmail] = useState()
  const [newPhone, setNewPhone] = useState()

  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')
  const [address, setAddress] = useState()
  const [selectedPet, setSelectedPet] = useState()

  const [showModal, setShowModal] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  async function handlePet() {
    const response = await AsyncStorage.getItem('@petcare:selectedPet')
    setSelectedPet(JSON.parse(response))
  }
  async function handleAddress() {
    try{
      const res = await APIconnection(
        `/addressInformations/${user.id}`,
        null,
        'GET'
      )
  
      setAddress({
        street: res[0].nm_logradouro,
        houseNumber: res[0].cd_numero_rua,
        complement: res[0].nm_complemento,
        district: res[0].nm_bairro,
        zipCode: res[0].cd_cep,
        city: res[0].nm_cidade,
        uf: res[0].nm_uf
      })
      setNewEmail(res[0].nm_email)
      setNewPhone(res[0].cd_telefone)
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    handlePet()
    handleAddress()
  }, [isFocused])

  return (
    <View flex={1} pt={10} bg="white">
      <ScrollView bg="white">
        <VStack>
          <HStack alignItems="center">
            <TouchableOpacity
              onPress={() => navigation.navigate('menuHamburguer', { isCare })}
            >
              <CaretLeft size={32} color="#511AC7" />
            </TouchableOpacity>

            <Text
              mx="auto"
              textAlign="center"
              fontWeight="black"
              color="white"
              fontSize={18}
              bg="primary.700"
              borderRadius={20}
              p={5}
            >
              Vamos encontrar o melhor cuidador disponível para você!
            </Text>
            <View p={2}></View>
          </HStack>

          <Text
            w="80%"
            mx="auto"
            textAlign="center"
            fontWeight="light"
            color="#511AC7"
            fontSize={15}
          >
            São 30 minutos de passeio e muita diversão para seu pet.
          </Text>
          <Button
            my={4}
            title="Selecionar animal"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => navigation.navigate('selectAnimal', { user })}
          />
          <VStack bg="#f4f4f4">
            <Text
              textAlign="center"
              fontWeight="light"
              color="#000"
              fontSize={20}
            >
              Animal selecionado:
            </Text>
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={18}
            >
              {selectedPet ? (
                <Text
                  textAlign="center"
                  fontWeight="black"
                  color="#511AC7"
                  fontSize={16}
                >
                  {selectedPet.nm_animal}
                </Text>
              ) : (
                <Text
                  textAlign="center"
                  fontWeight="black"
                  color="#511AC7"
                  fontSize={16}
                >
                  Nenhum animal selecionado.
                </Text>
              )}
            </Text>
          </VStack>
          <Button
            my={4}
            title="Alterar local"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() =>
              navigation.navigate('selectLocal', {
                isCare,
                user,
                newName,
                newEmail,
                newPhone
              })
            }
          />
          <VStack bg="#f4f4f4" py={2}>
            <Text
              textAlign="center"
              fontWeight="light"
              color="#000"
              fontSize={20}
            >
              Local selecionado:
            </Text>
            {address ? (
              <Text
                textAlign="center"
                fontWeight="black"
                color="#511AC7"
                fontSize={16}
              >
                {address.street}, {address.houseNumber}. {address.complement}.{' '}
                {address.district}, {address.city} - {address.uf},{' '}
                {address.zipCode}.
              </Text>
            ) : (
              <Text
                textAlign="center"
                fontWeight="black"
                color="#511AC7"
                fontSize={16}
              >
                Nenhum endereço selecionado.
              </Text>
            )}
          </VStack>
          <Button
            my={4}
            title="Selecionar data"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => setShowModal(true)}
          />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content
              bg="primary.700"
              w="80%"
              p={4}
              borderRadius={20}
              alignItems="center"
            >
              <VStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Button
                    title="Selecione a data"
                    bg="white"
                    w="80%"
                    color="#511AC7"
                    onPress={() => showMode('date')}
                  />
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Button
                    title="Selecione o horário"
                    bg="white"
                    w="80%"
                    color="#511AC7"
                    onPress={() => showMode('time')}
                  />
                </HStack>
                <Text
                  color="white"
                  fontSize={20}
                  fontWeight="black"
                  textAlign="center"
                  my={2}
                >
                  Dia e horário selecionados:
                </Text>
                <Text
                  color="white"
                  fontSize={20}
                  fontWeight="black"
                  textAlign="center"
                  my={2}
                >
                  {date.getDate()}/{date.getMonth()}/{date.getFullYear()} às{' '}
                  {date.getHours()}:{date.getMinutes()}
                </Text>
              </VStack>
              <Button
                title="Adicionar data"
                mt={4}
                w="100%"
                color="white"
                borderWidth={1}
                borderColor="white"
                onPress={() => setShowModal(false)}
              />
            </Modal.Content>
          </Modal>
          <VStack bg="#f4f4f4">
            <Text
              textAlign="center"
              fontWeight="light"
              color="#000"
              fontSize={20}
            >
              Data e hora selecionada:
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Text
              textAlign="center"
              fontWeight="black"
              color="#511AC7"
              fontSize={18}
            >
              Dia {date.getDate()}/{date.getMonth()}/{date.getFullYear()} às{' '}
              {date.getHours()}:{date.getMinutes()}
            </Text>
          </VStack>
          <Button
            title="Ir para tela de pagamento"
            bg="#511AC7"
            w="70%"
            py={4}
            onPress={() => {
              const serviceDate = {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                hour: date.getHours(),
                minute: date.getMinutes()
              }
              navigation.navigate('contractService', {
                isCare,
                user,
                selectedPet,
                serviceDate
              })
            }}
          />
        </VStack>
      </ScrollView>
    </View>
  )
}
