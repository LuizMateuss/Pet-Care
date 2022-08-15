import { ChatDots, X, Camera, PaperPlaneRight } from 'phosphor-react-native'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { InputMessage } from '../components/InputMessage'
import { Message } from '../components/Message'

import { useNavigation } from '@react-navigation/native'

export function Chat() {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mobile}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <X size={25} color="#ffffff" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.chatIcon}>
              <ChatDots size={25} color="#00ABBC" />
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.chatMessages}>
            <Message
              message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
              reply={true}
            />
            <Message
              message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
              reply={false}
            />
            <Message
              message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
              reply={true}
            />
            <Message
              message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, unde velit, omnis beatae distinctio porro ut vel repellendus dolor, quod voluptatibus voluptatem veniam maxime quisquam. Eveniet numquam veritatis iste incidunt!"
              reply={true}
            />
          </View>
        </ScrollView>
        <View>
          <InputMessage />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: 30,
    backgroundColor: '#FFFFFF'
  },
  chatHeader: {
    backgroundColor: '#00ABBC',
    borderRadius: 20,
    padding: 20
  },
  chatMessages: {
    padding: 20
  },
  chatIcon: {
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center'
  },
  mobile: {
    borderRadius: 20,
    borderColor: '#00ABBC',
    borderWidth: 0.5,
    height: Dimensions.get('screen').height * 0.85
  }
})
