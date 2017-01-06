const express = require('express')
const server = express()
server.set('view engine', 'pug')

server.get('/', (request, response, next) => {
  response.render('index')
})

if (process.env.NODE_ENV !== 'test') {
  server.listen(3000, function(){
    console.log('listening at http://localhost:3000')
  })
}

module.exports = server
