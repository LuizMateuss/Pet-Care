import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { User } from 'phosphor-react-native'

// type Props = {
//   message: string;
//   reply: boolean;
// }
export function Message(props) {
  return (
    <View style={styles.message}>
      {props.reply ? (
        <>
          <Image
            style={styles.userImageChatReply}
            source={require('../../assets/img/anonymous.png')}
          />

          <View style={styles.userMessageReply}>
            <Text style={{ color: '#ffffff' }}>{props.message}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.userMessageReply, styles.userMessage]}>
            <Text style={{ color: '#ffffff' }}>{props.message}</Text>
          </View>

          <Image
            style={styles.userImageChatReply}
            source={require('../../assets/img/anonymous.png')}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25
  },
  userImageChatReply: {
    borderRadius: 50
  },
  userMessageReply: {
    backgroundColor: '#00ABBC',
    padding: 10,
    width: Dimensions.get('window').width * 0.6,
    marginLeft: 15,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  userMessage: {
    borderTopRightRadius: 0,
    marginRight: 15,
    borderTopLeftRadius: 20,
    marginLeft: 0
  }
})
