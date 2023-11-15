import { Link } from "react-router-dom";
import "./Card.css";


export default function Card({ id, name, image, genres, platforms }) {



    return (
        <div className="card-cont">
            {/* <h1>{id}</h1> */}
            <Link to={`/detail/${id}`} className='card-img-cont' >
                <img src={image} alt='videogame img' />
            </Link>
            <div className='card-divisor'></div>
            <h2 className='card-name'>{name}</h2>
            <h3>{platforms?.map((plat)=> plat).join(" | ")}</h3>
            <h3>{genres.map((genre)=> genre.name).join(" | ")}</h3>

        </div>
    );
}

