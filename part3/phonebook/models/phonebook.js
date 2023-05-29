const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log(`Connecting to ${process.env.MONGO_URI}`)

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Phonebook', phonebookSchema)
