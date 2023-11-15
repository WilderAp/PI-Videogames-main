import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../Redux/Actions/actions";

export default function FilterOrigin() {
    const dispatch = useDispatch()
    const [origin, setOrigin] = useState("");


    function handleFilter(event) {
        event.preventDefault()
        const origin = event.target.value;
        // setCurrentPage(1);
        setOrigin(origin);
        dispatch(filterByOrigin(origin));
    }

    return (
        <div >
            <select style={{width: "140px", height:"35px"}} name="origin-filter" id="origin-filter" onChange={handleFilter} value={origin}>
                <option value="All">All Origins</option>
                <option value="API">From API</option>
                <option value="DB">From FORM</option>
            </select>


        </div>
    )

}