import "../style/Footer.css";

const Footer = () => {  
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <p>Demo Project © 2025</p>
                </div>
                <div className="footer-section">
                    <a href="https://github.com/moatasem75291" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span className="separator"> | </span>
                    <a href="https://www.linkedin.com/in/mo3tsm2212/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;