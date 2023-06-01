const express = require('express')
const data = require('./data.json')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const routes = express.Router()

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, "data.json"),
    JSON.stringify(data, null, 4),
    err => {
      if (err) throw err

      cb(JSON.stringify({ message: "ok" }))
    }
  )
}

function addObj(d) {
  try {
    const { latitude, longitude, wifi, movel, movelQualidade, movelTipoConec } = d

    if (latitude === null || longitude === null || wifi === null || movel === null || movelQualidade === null || movelTipoConec === null) {
      return {
        status: `Dados informados inválidos: `,
        data: { "latitude": 0, "longitude": 0, "wifi": 0, "movel": 0, "movelQualidade": 0, "movelTipoConec": "4G" }
      };
    }

    //o que fazer quando já estiver no arquivo?
    let objAux = data.find(d => { return d.latitude === latitude && d.longitude === longitude })
    if (objAux) {
      objAux.wifi = wifi
      objAux.movel = movel
      objAux.movelQualidade = movelQualidade
      objAux.movelTipoConec = movelTipoConec
    } else {
      data.push({ latitude, longitude, wifi, movel, movelQualidade, movelTipoConec })
    }
    //console.log(`gravado:${latitude} - ${longitude}`);
    return '';
  } catch (e) {
    return { status: `Erro ao gravar os dados: ${e}`, data: {} }
  }
}

routes.post('/', (req, res) => {
  const aux = addObj(req.body)

  if (aux === '') return writeFile((message) => res.end(message))
  else return res.status(400).json(aux)
})

routes.post('/list/', (req, res) => {
  try {
    let cont = 0
    const list = req.body

    list.map(o => {
      const ret = addObj(o)
      
      if (ret === '') cont += 1 
    })
    console.log(`gravados ${cont} totais ${list.length} `)
    if (cont > 0) return writeFile((message) => res.end(message))
    else return res.status(400).json({ status: `Nenhum dado gravado` })
  } catch (e) {
    return { status: `Erro ao gravar os dados: ${e}`, data: {} }
  }
})

routes.get('/', (req, res) => {
  const { movelTipoConec } = URL.parse(req.url,true).query  

  let dataAux = data
  
  if (movelTipoConec != null) {  
    dataAux = dataAux.filter(d => {
      return d.movelTipoConec === movelTipoConec
    })
  }
  res.send(dataAux)
});

module.exports = routes