const database = require('./database');
const notesDatabase = require ('./notes.json');

const seedDatabase = async()=>{
    database.insertMany(notesDatabase);
    console.log("Seed Completed!");
    console.log("Refresh the page!");
}

seedDatabase()