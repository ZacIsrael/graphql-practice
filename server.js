
// express server
const express = require('express');

// buildSchema allows developers to create a schema using graphql
const { buildSchema } = require('graphql');

// express middleware function that respons to graphql queries 
const { graphqlHTTP } = require('express-graphql');


// buildig schema for an ecommerce API
const schema = buildSchema(`
    type Query {
        description: String
        price: Float
    }
`);

const root = {
    description: 'Red Shoe',
    price: 42.12
}
// application object
const app = express();

/* 
functional graphql server
test in postman: http://localhost:3000/graphql, 
body: 
{
    "query": "{ description }"
}
this returns the description
*/
app.use('/graphql',graphqlHTTP({
    schema: schema,
    // determines the values that will be used in the response to the query 
    rootValue: root
}))

// this app is listening for requests on port 3000
app.listen(3000, () => {
    console.log('Running GraphQL server...');
})