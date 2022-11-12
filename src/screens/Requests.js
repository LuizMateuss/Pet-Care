import { ScrollView, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Order } from '../components/Order'

export function Requests() {
  const [requests, setRequests] = useState([{cd_servico: 0}])
  async function getRequests(){
    const req = await fetch(
      `${process.env.SERVER_LINK}requests`,
      {
        method: process.env.SERVER_METHOD,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const res = await req.json()
    setRequests(res)
  }
  useEffect(()=>{getRequests()},[])

  return (
    <VStack>
      <Header title="Solicitações" color="#00ABBC" />

      <ScrollView h="80%">
        {requests.map((request)=>
          <Order
            key={request.cd_servico}
            name={request.nm_usuario}
            specie={request.specie}
            request={request}
          />
        )}
      </ScrollView>
    </VStack>
  )
}
