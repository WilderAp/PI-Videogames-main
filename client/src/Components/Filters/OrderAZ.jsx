import { useState } from "react"
import { useDispatch } from "react-redux"
import { orderByName } from "../../Redux/Actions/actions";
import "./styles/styles.css"

export default function OrderAZ() {
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");

    function handleSort(event) {
        const selectedSort = event.target.value;
        setSort(selectedSort);
        dispatch(orderByName(selectedSort));
        // setCurrentPage(1);
    }

    return (
        <div className="sort-container">
            <div class="select"/>
                <select value={sort} onChange={handleSort} name="alphabetical-sort" id="alphabetical-sort">
                    <option value="All">Order By Alphabetical</option>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </select>
            </div>
        )
}