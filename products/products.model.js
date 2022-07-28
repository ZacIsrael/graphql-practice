const products = [
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
]

async function getAllProducts(){
    return products;
}

async function getProductsByPrice(min, max){
    return products.filter((product) => {
        const price = product.price
        return price >= min && price <= max
    })
}

async function getProductByID(id){
    return products.find((product) => {
        return product.id === id;
    })
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductByID
}