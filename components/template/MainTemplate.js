import CategoryNavbar from "components/CategoryNavbar"
import Footer from "components/Footer"

const MainTemplate = (props) => {
    return (
        <>
            <CategoryNavbar />
                {props.children}
            <Footer />
        </>
    );
}

export default MainTemplate;
