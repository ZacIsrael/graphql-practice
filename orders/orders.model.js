const orders = [
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

async function getAllOrders(){
    return orders;
}

module.exports = {
    getAllOrders
}