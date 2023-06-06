/* eslint-disable n/no-path-concat */
const config = require('./utils/config')
const path = require('path')

const fs = require('fs')
const mongoose = require('mongoose')

const phonebookModel = require('./models/phonebook')

const phonebook = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/dummy.json'), 'utf-8'))

const connectDb = async () => {
  const conn = await mongoose.connect(config.MONGO_URI)

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

const importDbData = async () => {
  try {
    await connectDb()
    await phonebookModel.create(phonebook)
    console.log(`Data imported successfully`)
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteDbData = async () => {
  try {
    await connectDb()
    await phonebookModel.deleteMany()
    console.log(`Data deleted successfully`)
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '-i') {
  importDbData()
} else if (process.argv[2] === '-d') {
  deleteDbData()
} else {
  console.log('Invalid params')
  process.exit()
}
