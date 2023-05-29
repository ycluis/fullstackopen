const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://fullstackopen:${process.argv[2]}@fullstackopen.yvwouol.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
  Phonebook.find({}).then((res) => {
    console.log('phonebook: ')
    res.forEach((result) => {
      console.log(`${result.name} ${result.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const phonebook = new Phonebook({ name, number })

  phonebook.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
