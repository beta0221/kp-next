import { useEffect } from "react";
import { useRouter } from 'next/router';


function Redirector({href}) {

    const router = useRouter();
    useEffect(() => {
        router.replace(href);
    }, [])


    return (
        <div>
            <h5>Redirecting...</h5>
            <span>{href}</span>
        </div>
    );
}

export default Redirector;