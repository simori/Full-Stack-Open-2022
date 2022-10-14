const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('usage: node index.js password [name number]');
  process.exit(1);
}

const password = process.argv[2];
// ${password}

const url = `mongodb+srv://fullstacksimppa:${password}@cluster0.tisx0.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;
mongoose.connect(url);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
  process.exit(1);
} else if (process.argv.length === 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model('Person', personSchema);

  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook!`);
    mongoose.connection.close();
  });
  process.exit(1);
}
