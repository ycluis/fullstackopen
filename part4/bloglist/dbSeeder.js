/* eslint-disable n/no-path-concat */
const config = require('./utils/config')
const path = require('path')

const fs = require('fs')
const mongoose = require('mongoose')

const blogModel = require('./models/blog')
const userModel = require('./models/user')

const blog = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/blog.json'), 'utf-8'))

const user = JSON.parse(fs.readFileSync(path.join(__dirname, '/_data/user.json'), 'utf-8'))

const connectDb = async () => {
  const conn = await mongoose.connect(config.MONGO_URI)

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

const importDbData = async () => {
  try {
    await connectDb()
    await blogModel.create(blog)
    await userModel.create(user)
    console.log(`Data imported successfully`)
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteDbData = async () => {
  try {
    await connectDb()
    await blogModel.deleteMany()
    await userModel.deleteMany()
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
