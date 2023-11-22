import { ScrollView, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Order } from '../components/Order'

export function Requests({ route }) {
  const {user, isCare} = route.params
  const [requests, setRequests] = useState([{cd_servico: 0}])
  async function getRequests(){
    try{
      const req = await fetch(
        `${process.env.SERVER_LINK}/requests`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      const res = await req.json()
      setRequests(res)
    }catch(error){
      console.error(error)
    }
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
            user={user}
            isCare={isCare}
          />
        )}
      </ScrollView>
    </VStack>
  )
}
