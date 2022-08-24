import { useState } from 'react'
import { HStack, Image } from 'native-base'
import { TouchableOpacity } from 'react-native'

export function RatingBar(props) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])

  return (
    <HStack>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity activeOpacity={0.7} key={item}>
            <Image
              w={15}
              h={15}
              mx={1}
              alt="Estrelas de avaliação"
              source={require('../../assets/img/star_filled.png')}
            />
          </TouchableOpacity>
        )
      })}
    </HStack>
  )
}
