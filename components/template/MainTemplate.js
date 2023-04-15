import { useState } from 'react'
import CategoryNavbar from "components/CategoryNavbar"
import Footer from "components/Footer"
import NavbarContext from 'utilities/NavbarContext'
import NotificationStack from 'components/NotificationStack'

const MainTemplate = (props) => {

    const [loadCartItems, doLoadCartItems] = useState(0);
    const [notification, setNotification] = useState(null);


    function reloadCartItems() {
        doLoadCartItems(prev => prev + 1)
    }

    function notify(message) {
        setNotification(message)
    }

    return (
        <NavbarContext.Provider value={{reloadCartItems, notify}}>
            <CategoryNavbar loadCartItems={loadCartItems} />
                {props.children}
            <Footer />
            <NotificationStack notification={notification} />
        </ NavbarContext.Provider>
    );
}

export default MainTemplate;
