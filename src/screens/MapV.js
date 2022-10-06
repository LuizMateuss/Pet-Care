import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MercadoPago } from './screens'; 
import MercadoPago from './MercadoPago';
//ele criou um index.js (MapIndex) que quando chama-se a screens vai pra ela direto por conta de ser index 

const Stack = createStackNavigator();
//era o arquivo app.js no video
export default function MapV(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MercadoPAgo" component={MercadoPago} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}