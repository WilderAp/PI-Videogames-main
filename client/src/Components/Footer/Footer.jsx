import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub.esm"

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <nav className="footer__navbar">
                <ul className="footer__navbar--menu">
                    <li  className="footer__navbar--item" style={{ listStyle: "none", color: "white" }}>
                        <AiFillGithub style={{ marginRight: "5px"}}/>
                        <a  style={{textDecoration: "none", paddingLeft: "5px", color: "white"}} href="https://github.com/WilderAp"  rel="noreferrer" target="_blank">WilderAp</a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;