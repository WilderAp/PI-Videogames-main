import Cards from "../Components/Cards/Cards";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import style from "../Pages/Home.css"
import { getVideogames } from "../Redux/Actions/actions";
import Pagination from "../Components/Pagination/Pagination";



const Home = ({ children }) => {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.allVideogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamePerPage] = useState(15);
    const indexOfLastGames = currentPage * gamePerPage;
    const indexOfFirstGames = indexOfLastGames - gamePerPage;
    const currentGames = allVideogames.slice(indexOfFirstGames, indexOfLastGames);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        console.log("Se montó el componente")
        dispatch(getVideogames())
    }, [dispatch]);


    return (
        <>
            
            <Header />
            <main className="Home">
                <Cards videogames={currentGames} />
            </main>
            <div className="pagination">
                <Pagination
                    countryPerPage={gamePerPage}
                    allCountries={allVideogames.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div>
            <Footer />
        </>
    )
};

export default Home;