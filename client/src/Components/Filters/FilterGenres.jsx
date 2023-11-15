import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, getGenres } from "../../Redux/Actions/actions";

export default function FilterGenres() {
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres);
    const [genre, setGenre] = useState("");


    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function handleFilter(event) {
        event.preventDefault()
        const genre = event.target.value;
        // setCurrentPage(1);
        setGenre(genre);
        dispatch(filterByGenre(genre));
    }

    return (
        <div>
            <select name="genres-filter" id="genres-filter" onChange={handleFilter} value={genre}>
                <option value="All">All Genres</option>
                {genres.map((genre) => (<option key={genre.id} value={genre.name}>{genre?.name.toUpperCase()}</option>))}
            </select>


        </div>
    )

}
