import { Link } from "react-router-dom";
import "../style/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="button-container">
                <Link to="/iris" className="main-button">
                    Iris Classification
                </Link>
                <Link to="/image-captioning" className="main-button">
                    Image Captioning
                </Link>
            </div>
        </div>
    );
}

export default HomePage;