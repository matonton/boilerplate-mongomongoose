require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hoopla:XxfQnridOJlUHvkC@cluster0.jk4rw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// console.log(db);
db.on('error', () => console.error('connection error'));
db.once('open', function() {
  console.log("welcome to your db");
});

// build Schema
const { Schema } = mongoose;
var personSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, required: true },
  favoriteFoods: [String]
});

// build model
var Person = mongoose.model('Person', personSchema);
/*
follow this pattern for asynchronous operations in Node convention
const someFunc = function(done) {
  //... do something
  if (error) return done(error);
  done(null, result);
};*/

var createAndSavePerson = function(done) {
  // build document
  var silence = new Person({ name: 'Silence', age: 12, favoriteFoods: ['rags', 'weeds'] });

  console.log(silence);

  silence.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ 'name': personName }, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ 'favoriteFoods': food }, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ '_id': personId }, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove } , function(err, result) {
    if (err) return console.log(err);
    done(null, result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var query = Person.find({ favoriteFoods: foodToSearch });
  console.log(query);
  query.sort( { name: 1 });
  query.limit(2);
  query.select('name favoriteFoods');
  query.exec(function(err, result) {
    if(err) return console.log(err);
    done(null, result);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
