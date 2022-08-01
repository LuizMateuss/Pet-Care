import { HStack, Text, VStack, View, useTheme, ScrollView } from 'native-base'

import { Dimensions, Image, StyleSheet } from 'react-native'

import { PawPrint } from 'phosphor-react-native'

import { ServiceButton } from '../components/ServiceButton'

const styles = StyleSheet.create({
  ImageMap: {
    position: 'relative',
    zIndex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5
  }
})
export function StartService() {

  const { colors } = useTheme()
  
  return (
      <VStack pb={12}>
      <HStack position="absolute"  zIndex={1} w="full" bg="white" justifyContent="center" pt={8} pb={8} rounded={20} >
        <Text bg="secondary.700" p={8} rounded={20} color="white">Localização do Serviço</Text>
      </HStack>

      
      <Image style={styles.ImageMap} source={require('../../assets/img/map_image.png')}/>
        
      <VStack position="relative" bottom={10} zIndex={1} w="full" bg="white" justifyContent="center" py={10} px={5} rounded={20} >
        <VStack bg="secondary.700" py={5} rounded={20} alignItems="center" w="100%">
          <View p={2} rounded={40} bg="white">
            <PawPrint size={25} color="#00ABBC" />
          </View>
          <Text color="white">Data: 14/06/2022</Text>
          <Text color="white">Hora de início: 20:29</Text>
          <Text color="white">Serviço: Passeio</Text>
          <Text color="white">Cliente: xxx-xxx</Text>
        </VStack>
        <VStack mt={4}>
        <ServiceButton title="Começar serviço" color={colors.cyan[700]} />
        <ServiceButton title="Chat" color={colors.secondary[700]}/>
        <ServiceButton title="Cancelar" color={colors.red[700]}/>
        </VStack>
      </VStack>

      
      
    </VStack>
  )
}

