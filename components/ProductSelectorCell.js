function ProductSelectorCell({product,index}) {
    return (
        <div className={((index % 2 == 0) ? "bg-gray-50" : "bg-white") + " px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"}>
        
            <div className="text-sm font-medium text-gray-500 sm:col-span-5 py-2">{product.name}</div>
            <div className="text-sm text-white text-center bg-amber-400 hover:bg-amber-300 rounded-md py-2 cursor-pointer">加入</div>
        </div>
    );
}

export default ProductSelectorCell;