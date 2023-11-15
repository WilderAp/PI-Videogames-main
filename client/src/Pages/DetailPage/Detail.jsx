import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Header from "../../Components/Header/Header";


const Detail = () => {

    const { id } = useParams()
    const [videogame, setVideogame] = useState({})

    useEffect(() => {
        axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => { //response.data
            if (data.name) {
                setVideogame(data);
            }
        });
        return setVideogame({});
    }, [id]); //Se le pone el Array de dependencias al useEffect para que no haga llamadas infinitas a la API

    const { name, description, platforms, image, date, rating, Genres } = videogame;
    // const platformNames = parent_platforms.map((platform) => platform.name);
    // const genresNames = genres.map((genre) => genre.name);

    console.log(name)
    return (
        <>
            <Header />

            <div className="Detail">
                {
                    videogame && <div>
                        <div className="DetailImage">
                            <img src={image} alt={name} />
                        </div>
                        <h1 className="DetailName">{name}</h1>
                        <h2 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #e9c46a" }}>ID | {id}</h2>
                        <div className="detail-description" dangerouslySetInnerHTML={{ __html: description }} />
                        <br />
                        <h2 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #457b9d" }}>Platforms | {platforms?.join(', ')}</h2>
                        <h2 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #457b9d" }}>Released | {date}</h2>
                        <h2 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #457b9d" }}>Rating | {rating}</h2>
                        <h2 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #457b9d" }}>Genres | {Genres?.map((genre)=> genre.name).join(', ')}</h2>


                    {/* <h2>{character?.name}</h2>
                    <h2>{character?.status}</h2>
                    <h2>{character?.species}</h2>
                    <h2>{character?.gender}</h2>
                    <h2>{character?.origin?.name}</h2>
                    <img src={character?.image} alt={character?.name} /> */}

                    </div>
                }
            </div>
        </>
    )
}

export default Detail;  