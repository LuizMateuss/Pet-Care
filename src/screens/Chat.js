import { ChatDots, X } from 'phosphor-react-native'
import { Dimensions, TouchableOpacity } from 'react-native'
import { View, ScrollView } from 'native-base'
import { InputMessage } from '../components/InputMessage'
import { Message } from '../components/Message'

import { useNavigation } from '@react-navigation/native'
/*
  Tela de chat
  -> Componente message recebe:
    -> Mensagem a ser enviada (string)
    -> Reply (bool), se for verdadeira, inverte dando sendo a resposta de quem está conversando.
    -> isCare (bool), vai validar se é um cuidador de acordo com o que foi passado na rota e passar uma color específica.
*/
export function Chat({ route }) {
  const navigation = useNavigation()
  const { isCare } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'
  return (
    <View flex={1} bg="white">
      <ScrollView m={15} mt={30} bg="white">
        <View
          borderRadius={20}
          borderWidth={0.5}
          borderColor={mainColor}
          h={Dimensions.get('screen').height * 0.85}
        >
          <View bg={mainColor} borderRadius={20} p={10}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <X size={25} color="#ffffff" />
            </TouchableOpacity>
            <View alignItems="center">
              <View bg="white" borderRadius={40} p={5}>
                <ChatDots size={25} color={mainColor} />
              </View>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View m="auto">
              <Message
                message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
                reply={true}
                isCare={isCare}
              />
              <Message
                message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
                reply={false}
                isCare={isCare}
              />
              <Message
                message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
                reply={true}
                isCare={isCare}
              />
              <Message
                message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
                reply={true}
                isCare={isCare}
              />
            </View>
          </ScrollView>
          <View>
            <InputMessage isCare={isCare} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
