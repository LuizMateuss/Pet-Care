import { View, TextInput, StyleSheet, Dimensions } from 'react-native'

import { PaperPlaneRight, Camera } from 'phosphor-react-native'

export function InputMessage() {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.chatInputView}>
        <View style={[styles.chatIcon, styles.cameraIcon]}>
          <Camera size={32} color="#ffffff" />
        </View>
        <TextInput
          style={styles.chatInput}
          placeholder="Envie sua menssagem..."
          placeholderTextColor="#000000"
        />
      </View>
      <View style={styles.chatIcon}>
        <PaperPlaneRight size={32} color="#ffffff" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
    justifyContent: 'center'
  },
  chatInputView: {
    width: Dimensions.get('screen').width * 0.7
  },
  chatInput: {
    backgroundColor: 'transparent',
    borderColor: '#00ABBC',
    borderWidth: 1,
    padding: 11,
    borderRadius: 50,
    paddingLeft: 60
  },
  chatIcon: {
    backgroundColor: '#00ABBC',
    borderRadius: 50,
    padding: 10,
    marginLeft: 5
  },
  cameraIcon: {
    position: 'absolute',
    left: -5
  }
})
