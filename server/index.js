// import express from 'express'
// import axios from 'axios'
// import cors from 'cors'
// import bodyParser from 'body-parser'

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

// API URLs
const starWarsApi = 'https://swapi.dev/api/people/'
const imageApi = 'https://imsea.herokuapp.com/api/1?q='

// Use cors for client and body parser for parsing post query
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get query to send data to client
app.get('/:id', async (req, res) => {
  let person = await axios.get(`${starWarsApi}${req.params.id}`)
  let images = await axios.get(`${imageApi}${person.data.name}`)

  res.send({ person: person.data, imageUrl: images.data.results[0] })
})

// Post query to find character
app.post('/', async (req, res) => {

  try {
    let persons = await axios.get(starWarsApi)
    let collection = persons.data.results
    let toReturn = collection.find((item) => { return item.name === req.body.name ? item : undefined })

    if (toReturn) {
      let images = await axios.get(`${imageApi}${toReturn.name}`)
      res.send({ person: toReturn, imageURL: images.data.results[0] })
    } else {
      res.status(404).send({ message: 'Character not found' })
      throw new Error('Character not found!')
    }
  } catch (e) {
    console.log(e, 'APIs trouble')
  }
})

app.get('/', (req, res) => {
  res.send('Query is good')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})