import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header"
import "./Form.css"
import { useEffect, useState } from "react";
import { getGenres, getPlatforms, postVideogames } from "../../Redux/Actions/actions";
import { useNavigate } from "react-router-dom";


const Form = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [])

    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        platforms: [],
        date: "",
        rating: 0,
        genres: [],
    });

    const [errors, setErrors] = useState({
        name: " ",
        image: " ",
        description: " ",
        platforms: " ",
        date: " ",
        rating: " ",
        genres: " ",
    })

    const validations = (form) => {
        const regexName = /^[A-Z][A-Za-z0-9 ]*$/;
        const regexUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


        if (!form.name || form.name === " ") {
            setErrors({...errors, name: "A name is required"});
        }
        if (!regexName.test(form.name)) {
            setErrors({...errors, name: "The name cannot have special characters or tildes and must start with an uppercase letter"})
        }
        if (form.name.length < 3) {
            setErrors({...errors, name: "The name cannot be less than 3 characters"});
        }
        if (form.name.length > 30) {
            setErrors({...errors, name: "The name cannot be longer than 30 characters"});
        }
        if (!form.image || form.image === " ") {
            setErrors({...errors, image: "The image field is required"});
        }
        if (!regexUrl.test(form.image)) {
            setErrors({...errors, image: "The image shield must be filled with a valid url"});
        }
        if (!form.description || form.description === " ") {
            setErrors({...errors, description: "The description shield must be filled"});
        }
        if (form.description.length < 30) {
            setErrors({...errors, description: "Not valid description, must contain at least 30 character"});
        }
        if (!form.platforms || form.platforms.length === " ") {
            setErrors({...errors, platforms: "Must select a platform"});
        }
        if (!form.date || form.date === " ") {
            setErrors({...errors, date: "Select the released date"});
        }
        if (form.rating === "Select Rating" || form.rating === " ") {
            setErrors({...errors, rating: "Select a rating number"});
        }
        if (!form.genres || form.genres.length === 0) {
            setErrors({...errors, genres: "Select Genres"});
        }
        if (Object.keys(form).length === 0) {
            setErrors({...errors, form: "Incomplete fields"});
        }

    };

    const handleChange = (event) => {
        if (event.target.name === "platforms") {
            if (form.platforms?.includes(event.target.value)) return
            setForm({
                ...form,
                [event.target.name]: [...form[event.target.name], event.target.value]
            })
        } else if (event.target.name === "genres") {
            setForm({
                ...form,
                [event.target.name]: [...form[event.target.name], event.target.value]
            })
        } else {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        }
        //re-rendering
        validations({
            ...form,
        })

    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postVideogames(form));
        navigate("/home");
        alert("Creating game... wait a sec")
    }




    return (
        <>
            <Header />
            <div className="create_videogames">
            <h1 style={{ color: "#f7f7f7", textShadow: "0px 0px 9px #e9c46a", marginRight: "300px" }}>CREATE {"YOUR"} OWN {"VIDEOGAME"}</h1>
                <form className="Form" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label > Name </label>
                    </div>
                    <input style={{width: "200px", height: "30px"}} type="text" name="name" id="name" placeholder="Videogame Name..." onChange={handleChange} />
                    <label className='form-error'>{errors.name}</label>
                    <div className='form-divisor'></div>
                    <div>
                        <label > Image </label>
                    </div>
                    <input style={{width: "200px", height: "30px"}} type="url" name="image" id="image" placeholder="Image_url" onChange={handleChange} />
                    <label className='form-error'>{errors.image}</label>
                    <div className='form-divisor'></div>
                    <div>
                        <label > Description </label>
                    </div>
                    <input style={{width: "200px", height: "40px"}} type="text" name="description" id="description" placeholder="Description" onChange={handleChange} />
                    <label className='form-error'>{errors.description}</label>
                    <div className='form-divisor'></div>
                    <div>
                        <label > Platforms </label>
                    </div>
                    <select style={{width: "200px"}} name="platforms" id="platforms" onChange={handleChange}>
                        {platforms.map((platform) => (<option key={platform.id} value={platform.name}>{platform?.name.toUpperCase()}</option>))}
                    </select>

                    <div>
                        {
                            form.platforms.map((platform) => <div className="form-platforms"><p>{platform}</p></div>)
                        }
                    </div>
                    <div className='form-divisor'></div>
                    <div>
                        <label > Released At </label>
                    </div>
                    <input style={{width: "200px"}} id="date" type="date" name="date" placeholder="Fecha de lanzamiento" onChange={handleChange} />
                    <div className='form-divisor'></div>
                    <div>
                        <label > Rating </label>
                    </div>
                    <select style={{width: "200px"}} type="number" name="rating" id="rating" onChange={handleChange}>
                        <option value="">Select Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <div className='form-divisor'></div>
                    <div>
                        <label > Genres </label>
                    </div>
                    <select style={{width: "200px"}} name="genres" id="genres" onChange={handleChange} >
                        {genres.map((genre) => (<option key={genre.id} value={genre.name}>{genre?.name.toUpperCase()}</option>))}
                    </select>
                    {/* {genres.map((genre) => (<div key={genre}>
                        <input type="checkbox" name="plataformas" value={genre} id={genre} />
                        <label htmlFor={genre}>{genre?.name}</label>
                </div>))} */}
                    <div>
                        {
                            form?.genres.map((genre) => <div className="form-genres"><p>{genre}</p></div>)
                        }
                    </div>
                    <div className='form-divisor'></div>
                    <button className="form-button" type="submit">CREAR</button>


                </form>

            </div>
        </>
    )
}

export default Form;