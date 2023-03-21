import { useContext } from "react";
import CategoryContext from "utilities/CategoryContext"

export default function ProductList(){

    const cats = useContext(CategoryContext)

    return (
        
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {cats.map((cat) => (
                        <div key={cat.id} className="group relative">
                            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                <img
                                    src={cat.imgUrl}
                                    alt={cat.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

