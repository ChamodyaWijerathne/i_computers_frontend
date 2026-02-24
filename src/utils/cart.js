
export function getCart(){
    const cartString = localStorage.getItem("cart")

    if(cartString==null){
        localStorage.setItem("cart", "[]")
        return[]
    }else{
        const cart = JSON.parse(cartString)
        return cart
    }
}

const sampleCart = [
    {
        product:{
            productId: "123456",
            name: "Sample Product",
            price: 99.99,
            labeledPrice: 149.99,
            images: ["https://via.placeholder.com/300x400", "https://via.placeholder.com/300x400?text=Image+2"],
           
        },
        qty: 2
        
    },
    {
        product:{
            productId: "789012",
            name: "Another Product",
            price: 49.99,
            labeledPrice: 79.99,
            images: ["https://via.placeholder.com/300x400", "https://via.placeholder.com/300x400?text=Image+2"],
        },
        qty: 1
    }
]

export function addToCart(product, qty){
    const cart = getCart()
    const existingProductIndex = cart.findIndex(
        (item)=>{
            return item.product.productId == product.productId// Check if the product already exists in the cart by comparing productId
        }
    )
    if(existingProductIndex == -1){
        if(qty <= 0){
            console.error("Quantity must be greater than 0")
            return
        }

        cart.push({
            product:{
                productId: product.productId,
                name: product.name,
                price: product.price,
                labeledPrice: product.labeledPrice,
                images: product.images[0]
            },
            qty: qty
        })
    }else{
        const newQty = cart[existingProductIndex].qty + qty// Update the quantity of the existing product in the cart

    // If the new quantity is less than or equal to 0, remove the product from the cart
        if(newQty <= 0){
            cart.splice(existingProductIndex, 1)//arguments: index to start removing, number of items to remove 
        
        }else{
            cart[existingProductIndex].qty = newQty
        }
    }

    const cartString = JSON.stringify(cart)// Convert the updated cart array back to a JSON string
    localStorage.setItem("cart", cartString)// Save the updated cart string back to localStorage
}

export function getCartTotal(cart){
    
}