import { useDispatch } from "react-redux";
import "./SearchBar.css"
import { useState } from "react";
import { getVideogamesName } from "../../Redux/Actions/actions";


export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');
   
   const handleChange = (event) => {
      const {  value  } = event.target;
      setName(value)
      dispatch(getVideogamesName(name));
   }

   return (
      <div className="container">
         <input className="search" placeholder="Search videogame..." type='search' onChange={handleChange} value={name} required/>
      </div>
   );
}