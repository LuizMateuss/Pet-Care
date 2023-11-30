// https://www.youtube.com/watch?v=BM72He8W3SE
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
import { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APIconnection } from '../api/connection';

import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
export function SignIn() {
  const [isCare, setIsCare] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  // This goes inside your component
  // This useEffect will run the handleResponse function when response changes
  useEffect(() => {
    handleResponse();
  }, [response]);
  // GitHub Endpoints

  // const token = '3d980f1d0279cd4cba89'
  const token = '01a2a6a98303f91880a4'
  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    // revocationEndpoint: `https://github.com/settings/connections/applications/${token}`,
    revocationEndpoint: `https://github.com/settings/connections/applications/${token}`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      // clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      clientId: `${token}`,
      scopes: ["identity", "user:email", "user:follow"],
      redirectUri: makeRedirectUri(),
      // redirectUri: 'petcare://',
    },
    discovery,
  );

  useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    console.log('res1: ', response)
    console.log('req: ', request)
    // Verify that everything went well
    if (response?.type === "success") {
      // Here we grab the code from the response
      const { code } = response.params;

      // And use this code to get the access_token
      const { token_type, scope, access_token } = await createTokenWithCode(code);

      // Just in case we don't have the token return early
      if (!access_token) return;

      // GithubAuthProvider is a class that we can import from 'firebase/auth'
      // We pass the token and it returns a credential
      // const credential = GithubAuthProvider.credential(access_token);

      // Finally we use that credential to register the user in Firebase
      // const data = await signInWithCredential(auth, credential);
      console.log('acc: ', access_token)
    }
  }

  // This function makes a POST request for the token
  async function createTokenWithCode(code) {
    const url =
      `https://github.com/login/oauth/access_token` +
      // `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}` +
      `?client_id=${token}` +
      // `&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}` +
      // `&client_secret=403a63ebd1dc08318d75c3eaac25b8a928d5b786` +
      `&client_secret=dffcd730e8b4dbe63fd9827a796feaea57ed716f` +
      `&code=${code}`; // 👈 we are passing the code here

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // The response should come with: { token_type, scope, access_token }
    return res.json();
  }
  //valida campos vázios
  function handleSignIn() {
    if (!email || !password || isCare === '') {
      return Alert.alert(
        'Tente novamente',
        'Por favor, informe todos os campos.'
      )
    }
    setIsLoading(true)
    verifyUser()
  }

  async function verifyUser() {
    let configEmail = email.toLowerCase().trim()
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(configEmail) == false) {
      setIsLoading(false)
      return Alert.alert('E-mail inválido', 'Insira um e-mail válido!')
    } else {
      //Conecta com o banco
      let sendIsCare
      if (isCare) sendIsCare = 'C'
      else sendIsCare = 'T'

      try {
        const resLogin = await APIconnection(
          `/login`,
          {
            "email": configEmail,
            "password": password,
            "isCare": sendIsCare
          }
        );

        const bdEmail = resLogin.nm_email
        const bdPassword = resLogin.nm_senha
        const bdIsCare = resLogin.cd_iscare
        const user = { name: resLogin.nm_usuario, id: resLogin.cd_usuario }

        setIsLoading(false)
        if (
          configEmail === bdEmail &&
          password === bdPassword &&
          sendIsCare === bdIsCare
        ) {
          verifyIsCareAndNextPage(user)
        } else {
          Alert.alert(
            'E-mail, senha ou tipo de conta inválido!',
            'Verifique suas informações ou faça cadastro, caso ainda não tenha.'
          )
        }

      } catch (error) {
        console.error(error)
        setIsLoading(false)
        Alert.alert(
          'Desulpe!',
          'Estamos enfrentando problemas de conexão, por favor tente novamente mais tarde.'
        )
      }
    }
  }

  function verifyIsCareAndNextPage(user) {
    if (isCare) {
      navigation.navigate('startPetCare', {
        isCare,
        user
      })
    } else {
      navigation.navigate('menuHamburguer', {
        screen: 'startPetCare',
        params: { isCare, user }
      })
    }
  }

  return (
    <ScrollView bg="white" keyboardShouldPersistTaps="always">
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
              onPress={handleSignIn}
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
            // onPress={() => {
            //   promptAsync()
            // }}
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
                <TouchableOpacity onPress={() => { promptAsync() }}>
                  <Image
                    alt="Facebook"
                    source={require('../../assets/img/facebook.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { promptAsync() }}>
                  <Image
                    alt="Github"
                    source={require('../../assets/img/github.png')}
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
