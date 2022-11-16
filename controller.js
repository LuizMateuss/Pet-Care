//Constantes
const express=require('express');
const bodyParser=require('body-parser');
const mercadopago=require('mercadopago');
const cors=require('cors');
const config=require('./config')

let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mercadopago.configure({access_token: config.token});

//Routes
app.post('/',(req,res)=>{
    let preference = {
        items:[{
            title: 'Passeio',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(req.body.price)
        }],
        payer:{
            name: "Fulano",
            email: "demo@mail.com"
        },
        back_urls:{
            failure:"https://www.webdesignemfoco.com/failure",
            pending:"https://www.webdesignemfoco.com/pending",
            success:"https://www.webdesignemfoco.com/success",
        },
        payment_methods: {
            installments:1,
            excluded_payment_types: [
                {"id":"ticket"}
            ]
        }
    };
    mercadopago.preferences.create(preference).then(function (data) {
        res.send(JSON.stringify(data.response.sandbox_init_point));
    }).catch(function (error) {
        console.log(error);
    });
});

//Start server
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});

