import { LinearGradient } from 'expo-linear-gradient'
import {
  HStack,
  VStack,
  Image,
  Text,
  View,
  Radio,
  ScrollView
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { InputData } from '../components/InputData'
import { ServiceButton } from '../components/ServiceButton'
import { useNavigation } from '@react-navigation/native'
import {SERVER_LINK, SERVER_METHOD} from '@env'

export function SignIn() {
  const [value, setValue] = useState('')
  const navigation = useNavigation()

  //Conecta com o banco
  async function verifyUser() {
    let req = await fetch(SERVER_LINK+'cuidador/1',{
      method: SERVER_METHOD,
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    //resposta
    let ress = await req.json()
    console.log(ress)
  }

  return (
    <ScrollView bg="white">
      <LinearGradient colors={['#511AC7', '#00ABBC']}>
        <VStack>

          {/* IMAGEM PET CARE */}
          <View alignItems="center" mt={10}>
            <Image
              alt="Logo pet care"
              source={require('../../assets/img/petCareLogo.png')}
            />
          </View>

          {/* TAG COM CAMPOS EMAIL, PSSWD E RADIO */}
          <VStack w="80%" mx="auto">

            <InputData title="E-mail:" />
            <InputData title="Senha:" type="password" />

            <Radio.Group
              colorScheme="green"
              onChange={nextValue => {
                setValue(nextValue)
              }}
            >
              <HStack w="80%" mx="auto" mb={5} justifyContent="space-between">
                <Radio
                  borderWidth={1}
                  borderColor="white"
                  bg="transparent"
                  value="cuidador"
                  my="1"
                >
                  <Text color="white">Sou cuidador</Text>
                </Radio>
                <Radio
                  borderWidth={1}
                  borderColor="white"
                  bg="transparent"
                  value="tutor"
                  my="1"
                >
                  <Text color="white">Sou tutor</Text>
                </Radio>
              </HStack>
            </Radio.Group>

            <ServiceButton title="Logar" color="white" 
              nextPage={verifyUser}
            />


            <View borderBottomWidth={1} my={5} borderColor="white" />
            <Text textAlign="center" color="white" fontWeight="black">
              Não tem uma conta?
            </Text>

            <ServiceButton
              title="Cadastre-se"
              color="white"
              nextPage={() => navigation.navigate('optionsSignUp')}
            />
          </VStack>


          {/* LOGIN COM OUTROS SERVIÇOS */}
          <View alignItems="center">
            <VStack position="absolute" zIndex={1} top={10}>
              <Text
                my={5}
                fontSize={15}
                fontWeight="black"
                color="secondary.700"
              >
                Continuar com
              </Text>
              
              <HStack mx={4} justifyContent="space-between">
                <TouchableOpacity>
                  <Image
                    alt="Facebook"
                    source={require('../../assets/img/facebook.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    alt="Google"
                    source={require('../../assets/img/google.png')}
                  />
                </TouchableOpacity>
              </HStack>
            </VStack>
            <Image
              alt="Logo pet care"
              w="100%"
              bottom={-20}
              h={250}
              source={require('../../assets/img/whiteVectorBottom.png')}
            />
          </View>

        </VStack>
      </LinearGradient>
    </ScrollView>
  )
}
