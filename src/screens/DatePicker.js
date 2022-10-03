import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function App() {
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() +1) + '/' + tempDate.getFullYear();
        let fTime = 'Horas: ' + tempDate.getHours() + ' | Minutos: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime)

        console.log(fDate + ' (' + fTime + ')')
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
        <View style={StyleSheet.container}>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{Text}</Text>
            <View style={{margin:20}}>
                <Button title='Selecione a data' onPress={() => showMode('date')}></Button>
            </View>

            <View style={{margin:20}}>
                <Button title='Selecione a hora' onPress={() => showMode('time')}></Button>
            </View>

            {show && <DateTimePickerAndroid
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={True}
                display='default'
                onChange={onChange}
            />}

            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});