import {StyleSheet} from "react-native";

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    map:{
        height: '60%'
    },
    search:{
        height: '40%'
    },
    distance:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding: 10
    },
    distance__text:{
        fontSize:20,
        fontWeight:'bold'
    },
    price:{
        backgroundColor: '#000',
        padding: 7,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    price__text:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    checkoutmp:{
        flex:1,
        marginTop: 30
    },
    motorista:{
        alignItems:'center',
        backgroundColor:'#222'
    },
    motorista__image:{
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20
    },
    motorista__text:{
        fontWeight:'bold',
        fontSize:22,
        color:'#fff'
    }
});

export {css};