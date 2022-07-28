
// express server
const express = require('express');

// path module used for constructing relative paths 
const path = require('path');

// buildSchema allows developers to create a schema using graphql
const { buildSchema } = require('graphql');

// express middleware function that respons to graphql queries 
const { graphqlHTTP } = require('express-graphql');

// the products and orders arrays 
const { getAllProducts } = require('./products/products.model');
const { getAllOrders } = require('./orders/orders.model');

const products = getAllProducts();
const orders = getAllOrders();
/*
loadFilesSync reads in any files matching some pattern and pass the 
text contained in those files into the typeDefs field in 
the makeExecutableSchema function */
const { loadFilesSync } = require('@graphql-tools/load-files')

/*
makeExecutableSchema combines schema and resolvers to make executable schema. 
It's part of a graphql-tools package that makes it easier to use the schema 
language while also writing resolvers. So you define types and resolvers and 
pass them to makeExecutableSchema
*/
const { makeExecutableSchema } = require('@graphql-tools/schema')

// looks into any directories or subdirectories and locates the files with 0 or more characters and end with .graphql
const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql'));

// retrieves all of the resolver functions
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));
// makeExecutableSchema allows us to split up the schemas instead of them being in one long string
const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});

// buildig schema for an ecommerce API
// the type Query lists all of the different pieces of data that can be queried for in the API
// the explanation mark after the type indicates that the field is required 
/*
const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }

    type Review {
        rating: Int!
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }
`); */

const root = {
    products: products,
    orders: orders
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
    rootValue: root,
    // graphiql = true, displays teh frontend application so developers won't have to use postman to test 
    // http://localhost:3000/graphql
    graphiql: true
}))

// this app is listening for requests on port 3000
app.listen(3000, () => {
    console.log('Running GraphQL server...');
})