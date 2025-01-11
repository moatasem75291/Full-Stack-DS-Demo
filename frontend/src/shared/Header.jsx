import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <div className="logo-section">
                    <h1>Full Stack DS Demo Projects</h1>
                    <p className="subtitle">Iris Classification & Image Captioning</p>
                    <nav className="header-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <span> | </span>
                        <a href="https://github.com/moatasem75291/Full-Stack-DS-Demo" target="_blank" rel="noopener noreferrer">Source Code</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;