
// express server
const express = require('express');

// buildSchema allows developers to create a schema using graphql
const { buildSchema } = require('graphql');

// express middleware function that respons to graphql queries 
const { graphqlHTTP } = require('express-graphql');


// buildig schema for an ecommerce API
// the type Query lists all of the different pieces of data that can be queried for in the API
// the explanation mark after the type indicates that the field is required 
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
`);

const root = {
    products: [
        {
            id: 'redshoe',
            description: 'Red Shoe',
            price: 42.12
        },
        {
            id: 'blueshoe',
            description: 'Blue Shoe',
            price: 102.35
        },
        {
            id: 'greensirt',
            description: 'Green Polo Shirt',
            price: 50.00
        },
        {
            id: 'blackpants',
            description: 'Black Cargo Pants',
            price: 60.00
        },
        {
            id: 'whiteshirt',
            description: 'White T-shirt',
            price: 10.00
        },
    ],
    orders: [
        {
            date: '2020-07-02',
            subtotal: 130.00,
            items: [
                {
                    product: {
                        id: 'blackpants',
                        description: 'Black Cargo Pants',
                        price: 60.00
                    },
                    quantity: 2
                },
                {
                    product: {
                        id: 'whiteshirt',
                        description: 'White T-shirt',
                        price: 10.00
                    },
                    quantity: 1
                }
            ]
        }
    ]
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