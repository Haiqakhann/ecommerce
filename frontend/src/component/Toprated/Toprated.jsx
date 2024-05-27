import Products from "../Products/Products"

const Toprated = () => {
  return (
    <section className="max-padd-container bg-primary p-12 xl:py-28">
        <div>
            <h2 className="h3">
                <span className="text-secondary">Popular </span>
                Products
            </h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium vero deserunt et, adipisci deleniti soluta aliquam doloremque architecto nobis aspernatur.</p>
            <div className="bg-primary rounded-3xl py-8">
              <Products ispopular={true} />

            </div>
        </div>
    </section>
  )
}

export default Toprated
