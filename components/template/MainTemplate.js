import { useState } from 'react'
import CategoryNavbar from "components/CategoryNavbar"
import Footer from "components/Footer"
import NavbarContext from 'utilities/NavbarContext'

const MainTemplate = (props) => {

    const [loadCartItems, doLoadCartItems] = useState(0);

    function reloadCartItems() {
        doLoadCartItems(prev => prev + 1)
    }

    return (
        <NavbarContext.Provider value={{reloadCartItems}}>
            <CategoryNavbar loadCartItems={loadCartItems} />
                {props.children}
            <Footer />
        </ NavbarContext.Provider>
    );
}

export default MainTemplate;
