
import ProductCard from "./productCard";

export default function OnSaleNow() {
    return (
        <div>
            <h1>On Sale Now!</h1>
            <ProductCard
                    name="MacBook Air"
                    image="https://picsum.photos/id/237/200/300"
                    price="$555"
                  />
            
                  <ProductCard
                    name="MacBook Pro"
                    image="https://picsum.photos/id/238/200/300"
                    price="$1200"
                  />
            
                  <ProductCard
                    name="iMac"
                    image="https://picsum.photos/id/239/200/300"
                    price="$2200"
                  />
                  
        </div>
    )
}