const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
  }

  
  const password = process.argv[2]
  
  const url =
    `mongodb+srv://fullstack:${password}@cluster0-ocval.mongodb.net/puhelinluettelo`
  
  mongoose.connect(url, { useNewUrlParser: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
  })
 
  
  const Person = mongoose.model('Person', personSchema)

  if ( process.argv.length<4 ) {
      console.log('Puhelinluettelo \n')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + ' '  +person.number)
        })
        mongoose.connection.close()
    })

  }
  else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(response => {
    console.log('lisätään ' +person.name+ ' numero ' +person.number+ ' tietokantaan')
    mongoose.connection.close();
  })
  }
