const mongoose = require('mongoose')

const phonebookSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        const numberFormat = v.split('-')
        if (numberFormat.length === 1 || numberFormat.length > 2) {
          return false
        }
        if (numberFormat[0].length < 2 || numberFormat[0].length > 3) {
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
