import config from '../../config'
import { WebView } from 'react-native-webview';
import React,{useState, useEffect, useRef} from 'react';
import { theme } from 'native-base';



export default function testeMercado(props){
    
    const [url,setUrl] = useState(null);

    useEffect(()=>{
        async function sendServer(){
            let response=await fetch(config.urlRoot,{
               method: 'POST',
               headers:{
                   Accept: 'application/json',
                   'Content-Type':'application/json'
               },
                body: JSON.stringify({
                    price: props.route.params.price
                })
            });
            let json=await response.json();
            setUrl(json);
        }
        sendServer();
      },[]);
      
      async function stateChange(state){
        let url=state.url;
        if(state.canGoBack == true && !url.includes('mercadopago')){
            if(url.includes("approved")){
                props.navigation.navigate('ContractService'); //tela após o pagamento ser aprovado
            }else{
                props.navigation.navigate('testemercado'); //tela para uma nova tentativa de pagamento
            }
        }
      }

      return ( //colocar um estilização
        <View> 
            {url &&
                <WebView
                    originWhitelist={['*']}
                    source={{uri: url}}
                    style={theme.testemp} //estilização do mercado
                    startInLoadingState={true}
                    onNavigationStateChange={state=>stateChange(state)}
                />
            }
        </View>
      );
}