const express = require('express')
const routes = require('./routes.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const porta = 8080

app.disable('x-powered-by')

app.use(cors())
app.use(bodyParser.json());
app.use(routes)

// app.use(bodyParser.json({ limit: "50mb" }))
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


function MensagemDeInicio() {
  console.log('\nIniciado o servidor na porta ' + porta + '.\n')
}

app.listen(porta, MensagemDeInicio())


//const http = require('http')
// const URL = require('url')
// const fs = require('fs')
// const path = require('path')

// http.createServer((req, res) => {
//     const {latitude, longitude, wifi, movel} = URL.parse(req.url,true).query

//     res.writeHead(200, {
//         'Access-Control-Allow-Origin': '*'
//     })
//     if(!latitude || !longitude || !wifi || !movel)
//         return res.end(JSON.stringify(data))

//     data.data.push({latitude, longitude, wifi, movel})

//     return writeFile((message) => res.end(message))
// }).listen(3000, () => console.log('server is running'))
