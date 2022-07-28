
const { getAllOrders } = require('./orders.model')
module.exports = {
    Query : {

        /*
            resolver parameters:
                - parent: the root object (when just starting out)
                - args: used when there is a parameterized query (filtering products based on a condition)
                - context: useful for data that is shared across all the resolvers (authentication data, etc)
                - info: contains information about the current state of the operation 
        */
        orders: async (parent, args, context, info) => {
            console.log(`Resolver called. Getting orders....`)
            return await getAllOrders();
        }
    }
}