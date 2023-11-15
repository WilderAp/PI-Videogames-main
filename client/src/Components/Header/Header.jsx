import { FaGamepad } from "@react-icons/all-files/fa/FaGamepad.esm"
import { Link } from "react-router-dom";
import "../Header/Header.css";
import SearchBar from "../SearchBar/SearchBar";
import OrderAZ from "../Filters/OrderAZ";
import OrderRating from "../Filters/OrderRating";
import FilterGenres from "../Filters/FilterGenres";
import FilterOrigin from "../Filters/FilterOrigin";

const Header = ({ children }) => {
	return (
		<header className="header">
			<figure className="header__logo">
				<Link to={"/home"} className="figure">
					<FaGamepad  size={"45px"} />
				</Link>
				<figcaption className="header__logo__name--container">
					<Link to={"/home"} className="header__logo--name" style={{  textShadow: "0px 0px 9px #457b9d", fontSize: "18px", margin: "3px" }}>VIDEOGAMES </Link>
				</figcaption>
			</figure>
			<OrderAZ/> <OrderRating/> <FilterGenres/>
			<SearchBar/>
			<nav className="header__navbar">
				{children}
				<FilterOrigin/>

				<ul className="header__navbar--menu">
					<li className="header__navbar--item">
						<button style={{ width: "100px" }}>
							<Link to={"/home"} style={{ color: "blue", fontSize: "15px" }} className="header__navbar--link">
								GAMES
							</Link>
						</button>
					</li>
					<li className="Form">
						<button style={{marginTop: "1px"}}>
							<Link to={"/form"} style={{ color: "blue", fontSize: "15px", textDecoration: "none" }} className="Form_Button">
								CREATE GAME
							</Link>
						</button>
					</li>
					
					
				</ul>
			</nav>
		</header>
	)


};

export default Header;