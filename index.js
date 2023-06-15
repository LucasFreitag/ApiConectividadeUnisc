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

function MensagemDeInicio() {
  console.log('\nIniciado o servidor na porta ' + porta + '.\n')
}

app.listen(porta, MensagemDeInicio())
