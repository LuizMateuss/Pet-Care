import { ScrollView, VStack } from 'native-base'
import { Header } from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { RequestedServiceCard } from '../components/RequestedServiceCard'
import { useState, useEffect } from 'react'

export function RequestedServices({ route }) {
  const navigation = useNavigation()

  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [requestedServices, setRequestedServices] = useState([{cd_servico: 0}])


  async function getRequestedService(){
    const req = await fetch(
      `${process.env.SERVER_LINK}requestedServices/${user.id}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await req.json()
    setRequestedServices(res)
  }
  useEffect(()=>{getRequestedService()},[])

  return (
    <VStack>
      <Header title="Serviços agendados" color={mainColor} />

      <ScrollView>
        {requestedServices.map((servico)=>
          <RequestedServiceCard
            key={servico.cd_servico}
            name={isCare ? 'Nome tutor' : ''}
            image={require('../../assets/img/anonymous.png')}
            typeService={servico.nm_tipo_servico}
            dateService={servico.dt_time_servico}
            valueService={servico.vl_servico}
            isCare={isCare}
            user={user}
          />
        )}
      </ScrollView>
    </VStack>
  )
}
