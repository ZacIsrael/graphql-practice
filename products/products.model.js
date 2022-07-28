const products = [
    {
        id: 'redshoe',
        description: 'Red Shoe',
        price: 42.12,
        reviews: []
    },
    {
        id: 'blueshoe',
        description: 'Blue Shoe',
        price: 102.35,
        reviews: []
    },
    {
        id: 'greensirt',
        description: 'Green Polo Shirt',
        price: 50.00,
        reviews: []
    },
    {
        id: 'blackpants',
        description: 'Black Cargo Pants',
        price: 60.00,
        reviews: []
    },
    {
        id: 'whiteshirt',
        description: 'White T-shirt',
        price: 10.00,
        reviews: []
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

async function addNewProduct(id, description, price){

    const newProduct = {
        id, 
        price,
        description,
        reviews: []
    }
    products.push(newProduct);
    return newProduct;
}

async function addNewProductReview(productID, rating, comment){
    
    // find the correct product
    const product = await getProductByID(productID);
    if(product){
        const newReview = {
            rating,
            comment
        };
        // add the review
        product.reviews.push(newReview);
        // return the new Review 
        return newReview; 
    }
    
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductByID,
    addNewProduct,
    addNewProductReview
}