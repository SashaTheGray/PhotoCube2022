import React, { useEffect, useState } from "react";
import { Filter } from "../Filter";
import { createFilter } from "../Middle/BottomDock/TagsetFilter";
import '../../css/LeftDock/TagFilter.css';

/**
 * Component for adding a range query for Time tags.
 * Both the startTime and endTime must be filled for the 'Add filter' button to actually add the range filter.
 * To search for a distinct time, give a same value for both startTime and endTime text input field.
 */
export const TimeForm = (props: {
    activeFilters: Filter[],
    onFiltersChanged: (filter: Filter) => void
}) => {
    const initialValues = {
        startTime: "",
        endTime: ""
    };
    const [values, setValues] = useState(initialValues);

    // Ref: https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (values.startTime !== "" && values.endTime !== "") {
            const filter: Filter = createFilter(values.startTime + "-" + values.endTime, 0, "time", values.startTime, values.endTime);
            if (!props.activeFilters.some(af => af.startTime === filter.startTime && af.endTime === filter.endTime)) {
                props.onFiltersChanged(filter);
            }
        }
    }

    return (
        <div>
        <form>
            <p className="Header">Start:</p>
            <input className="start time field" type="text" placeholder="00:00"
                    value={values.startTime}
                    onChange={handleInputChange}
                    name="startTime">
            </input>
            <p className="Header">End:</p>
            <input className="end time field" type="text" placeholder="23:59"
                    value={values.endTime}
                    onChange={handleInputChange}
                    name="endTime">
            </input>
            <div>
                <button className="add time range filter button" onClick={(e) => onButtonClick(e)}>Add filter</button>
            </div>
        </form>
        </div>
    )
}