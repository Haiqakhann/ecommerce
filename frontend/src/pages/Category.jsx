import Products from "../component/Products/Products"

const Category = ({Pcategory}) => {

  return (
    <section className="max-padd-container bg-primary">
      <div className="max-sm:mt-4 pt-8">
        <div className={`bg-cover bg-no-repeat bg-center h-72 ${Pcategory==='men'?'bg-bannermen':Pcategory==='women'?'bg-bannerwomen':Pcategory==='kid'?'bg-bannerkids':""} `}>
        </div>
        <div className="bg-primary rounded-3xl py-8">
          <Products categoryy={Pcategory} />
        </div>
      </div>
    </section>
  )
}

export default Category
