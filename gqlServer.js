var fs = require('fs')
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var Notes = require('./database.js');

// Construct a schema, using GraphQL schema language
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getnotes: [Note]
  }
  type Note {
    title: String
    description: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getnotes: async () => {
    try {
      const notes = await Notes.find({});
      return notes;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');