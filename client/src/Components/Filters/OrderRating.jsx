import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByRating } from "../../Redux/Actions/actions";

export default function OrderRating() {
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");

    function handleSort(event) {
        const selectedSort = event.target.value;
        setSort(selectedSort);
        dispatch(orderByRating(selectedSort))
    }


    return (
        <div>
            <select name="rating-order" id="rating-order" value={sort} onChange={handleSort}>
                <option value="All">Order Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="higher">Higher Rating</option>
            </select>

        </div>
    )
}