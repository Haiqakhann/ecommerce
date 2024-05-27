import { Shopcontext } from "../../Context/Shopcontext";
import { useContext } from "react";
import ProductMap from "../ProductMap/ProductMap";

const Products = ({categoryy,isnew,ispopular}) => {    
  const {products} = useContext(Shopcontext)

  function getFilteredProducts() {
    if(categoryy){

      return products.filter(product => {return(product.category === categoryy)} );
    }
    if(isnew){
      const products_ = products.filter(product => {return(product.new === isnew)} );
      products_.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const top8newestItems = products_.slice(0, 8);
      return top8newestItems;
    }
    if(ispopular){
      return products.filter(product => { return(product.popular === ispopular)} ).slice(0, 8);
    }
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
        {products && getFilteredProducts().map((item)=>{     
            return(
              <ProductMap key={item.id} id={item._id} image={item.image} name={item.name} description={item.description} price={item.price} category={item.category} />
            )
        })
        }
    </div>
  )
}

export default Products
