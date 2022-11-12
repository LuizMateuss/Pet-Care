import { ScrollView, VStack } from 'native-base'
import { Header } from '../components/Header'
import { useNavigation } from '@react-navigation/native'
import { RequestedServiceCard } from '../components/RequestedServiceCard'
import { useState, useEffect } from 'react'

export function ConfirmedServices({ route }) {
  const navigation = useNavigation()

  const { isCare, user } = route.params
  const mainColor = isCare ? '#00ABBC' : '#511AC7'

  const [confirmedServices, setConfirmedServices] = useState([{cd_servico: 0}])

  async function getConfirmedService(){
    const req = await fetch(
      `${process.env.SERVER_LINK}confirmedServices/${user.id}`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await req.json()
    setConfirmedServices(res)
  }
  useEffect(()=>{getConfirmedService()},[])

  return (
    <VStack>
      <Header title="Serviços confirmados" color={mainColor} />

      <ScrollView>
        {confirmedServices.map((service)=>
          <RequestedServiceCard
            key={service.cd_servico}
            name={isCare ? `${service.tutorName}` : `${service.cuidadorName}`}
            status="Confirmado"
            image={require('../../assets/img/anonymous.png')}
            typeService={service.nm_tipo_servico}
            dateService={service.dt_time_servico}
            valueService={service.vl_servico}
            isCare={isCare}
            user={user}
            service={service}
          />
        )}
      </ScrollView>
    </VStack>
  )
}
