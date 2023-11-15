import { Link } from "react-router-dom";
import { MdGamepad } from "@react-icons/all-files/md/MdGamepad.esm"
import "./Landingpage/LandingPage.css"
import Footer from "../Components/Footer/Footer";

const LandingPage = () => {
    return (
        <>
        <div className="Landing">
            <h1 style={{color: "#f7f7f7", textShadow: "0px 0px 9px #457b9d"}}>WELCOME TO</h1>
            <MdGamepad style={{ height: "50px", width: "40px", color: "#ffff" }} />
            <h1 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #e9c46a" }} className="blink"> DREAM VIDEOGAMES API {":)"}</h1>
            <button className="join" style={{ width: "350px", height: "30px" }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <Link to={"/home"} className="join_button" style={{ display: 'flex', width: "350px", height: "30px", padding: "10px", textDecoration: "none", fontSize: "18px", justifyContent: "center", alignItems: "center", color: "#c28e0b", textShadow: "0px 0px 7px black" }}>
                    JOIN
                </Link>
            </button>

        </div>
        <Footer/>
        </>
    )
};

export default LandingPage;