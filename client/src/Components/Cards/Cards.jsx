import Card from "./Card";
import "./Cards.css";


export default function Cards({ videogames }) {
    // Realizar la normalización
    const normalizedVideoGames = videogames.map((game) => {
        const id = game.id || game.ID;
        const genres = game.genres || game.Genres;
        return {
            ...game,
            id: id,
            genres: genres
        };
    });
    //const {characters} = props;

    return (
        <div className='cards-cont'>
            {
                normalizedVideoGames?.map((game) => {
                    let { id, name, description, platforms, image, date, rating, Genres  } = game;
                    console.log(game);

                    return  <Card
                        id={id}
                        key={id}
                        name={name}
                        description={description}
                        platforms={platforms}
                        image={image}
                        date={date}
                        rating={rating}
                        genres={Genres}
                    />
                })
            }
        </div>

    )
};