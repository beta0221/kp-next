import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import styles from './Pagination.module.css';

function Pagination({ page, setPage, lastPage }) {

    const [pages, setPages] = useState([]);
    const [cropHead, setCropHead] = useState(false)
    const [cropTail, setCropTail] = useState(false)

    useEffect(() => {
        let from = ((page - 3) <= 0 ) ? 1 : (page - 3)
        let to = ((page + 3) > lastPage) ? lastPage : (page + 3)
        let _pages = []
        for (let i = from; i <= to; i++) {
            _pages.push(i)
        }
        setPages(_pages)
        setCropHead((page - 4) > 0)
        setCropTail((page + 3) < lastPage)
    }, [page, lastPage])


    return (
        <>

            <div className="flex flex-1 items-center justify-center">

                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            className={`${styles.arrowLeftButton} ${(page <= 1) ? styles.arrowInActive : styles.arrowActive}`}
                            onClick={() => {
                                if (page <= 1) { return }
                                setPage(page - 1)
                            }}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                        {(
                            (cropHead) ?
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span> : 
                                null
                        )}


                        {pages.map((pageNum) => (
                            <button
                                key={pageNum}
                                className={(pageNum == page) ? styles.currentPageButton : styles.pageButton}
                                onClick={() => { setPage(pageNum) }}
                            >
                                {pageNum}
                            </button>

                        ))}

                        {(
                            (cropTail) ?
                                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span> : 
                                null
                        )}

                        <button
                            className={`${styles.arrowRightButton} ${(page >= lastPage) ? styles.arrowInActive : styles.arrowActive}`}
                            onClick={() => {
                                if (page >= lastPage) { return }
                                setPage(page + 1)
                            }}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </>
    )

}

export default Pagination;











