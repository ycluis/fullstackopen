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
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        const numFormat = v.split('-')
        if (numFormat.length === 1 || numFormat.length > 2) {
          return false
        }
        if (numFormat[0].length < 2 || numFormat[0].length > 3) {
          return false
        }
        return true
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Phonebook', phonebookSchema)
