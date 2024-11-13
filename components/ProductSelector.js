import ProductSelectorCell from "./ProductSelectorCell";


function ProductSelector({ cat, products }) {
    return (

        <div className="overflow-hidden bg-white shadow sm:rounded-lg ">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900">{cat.name}</h2>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>


            <div>
                <img src={cat.imgUrl} className="object-cover h-full w-full" />
            </div>

            <div className="border-t border-gray-200">
                <dl>

                    {products.map((product,index) =>
                        <ProductSelectorCell key={index} index={index} product={product} />
                    )}

                </dl>
            </div>
        </div>

    );
}

export default ProductSelector;