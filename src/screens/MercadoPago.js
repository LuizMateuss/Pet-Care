import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {css} from '../assets/css/Css';
import config from '../config';
import { WebView } from 'react-native-webview';
import cssMP from '../../assets/cssMP/cssMP';


export default function MercadoPago(props) {

    const [url,setUrl] = useState(null);
    
    useEffect(()=>{
        async function sendServer(){
            //o ip é o que aparece no expo 
            let response=await fetch(config.urlRoot,{
               method: 'POST',
               headers:{
                   Accept: 'application/json',
                   'Content-Type':'application/json'
               },
                body: JSON.stringify({
                    price: props.route.params.price,
                    address: props.route.params.address
                })
            });
            let json=await response.json();
            console.log(json);
        }
        sendServer();
    },[]);

    async function stateChange(state)
    {
        let url=state.url;
        if(state.canGoBack == true && !url.includes('mercadopago')){
            if(url.includes("approved")){
                props.navigation.navigate('HistoryCare'); //página quando dá certo
            }else{
                props.navigation.navigate('ContractService'); //página quando dá erro
            }
        }      
    }
    
    return (
        <View style={css.container}>
            { url &&
                <WebView
                    originWhitelist={['*']}
                    source={{uri: url}}
                    style={css.checkoutmp}
                    startInLoadingState={true}
                    onNavigationStateChange={state=>stateChange(state)}
                />
            }
        </View>
    );
}