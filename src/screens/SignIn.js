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
import { Alert, TouchableOpacity } from 'react-native'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import {SERVER_LINK, SERVER_METHOD} from '@env'

export function SignIn() {
  const [isCare, setIsCare] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [value, setValue] = useState('')
  const navigation = useNavigation()


  //Conecta com o banco
  async function verifyUser() {
    let num
    //define qualquer valor para não dar erro na api, caindo no default do switch
    if(!email){
      num='oi'
    }else{
      num=email
    }
    //chama a função na api
    let req = await fetch(SERVER_LINK+`view/${num}`,{
      method: SERVER_METHOD,
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })

    //resposta
    let ress = await req.json()

    //retorna um erro da api
    if(!password || num=='oi' || num>10)
      console.warn(ress)
    //retorna o numero do objeto da view especificado na senha
    else if(password.match(/[0-9]/) && password < ress.length)
      console.warn(ress[password])
    else
    //informa a possibilidade máxima de objetos
      console.warn(`Insira um número menor ou igual a ${ress.length-1} em senha`)

    //apenas um informativo
    setTimeout(() => {
      console.log("Numero da view: "+num)
      console.log("Numeros de objetos: "+ress.length)
    }, 500);
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

            <Input placeholder="E-mail:" onChangeText={setEmail} />
            <Input
              placeholder="Senha:"
              type="password"
              onChangeText={setPassword}
            />

            <Radio.Group
              colorScheme="green"
              onChange={value => {
                setIsCare(value)
              }}
            >
              <HStack w="80%" mx="auto" mb={5} justifyContent="space-between">
                <Radio
                  borderWidth={1}
                  borderColor="white"
                  bg="transparent"
                  value={true}
                  my="1"
                >
                  <Text color="white">Sou cuidador</Text>
                </Radio>
                <Radio
                  borderWidth={1}
                  borderColor="white"
                  bg="transparent"
                  value={false}
                  my="1"
                >
                  <Text color="white">Sou tutor</Text>
                </Radio>
              </HStack>
            </Radio.Group>
            <Button
              title="Logar"
              borderWidth={1}
              borderColor="white"
              marginY={1}
              width="100%"
              onPress={verifyUser}
              isLoading={isLoading}
            />

            <View borderBottomWidth={1} my={5} borderColor="white" />
            <Text textAlign="center" color="white" fontWeight="black">
              Não tem uma conta?
            </Text>
            <Button
              title="Cadastre-se"
              borderWidth={1}
              borderColor="white"
              marginY={1}
              width="100%"
              onPress={() => navigation.navigate('optionsSignUp')}
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
