import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

function Set(props) {

    function handleChange(event) {
        const { name, value } = event.target;
        props.onChange({ ...props.set, [name]: value }, props.index, name);
    };

    return (
        <div className="set">
            <div className={`set-number ${props.set.markedDone ? 'checked' : ''}`} onClick={() => {props.onMarkAsDone(props.id)}}>{props.index + 1}</div>
            <div className="set-unit">
                <input 
                    placeholder="0"
                    value={props.set.weight}
                    name="weight" 
                    onChange={handleChange}>
                </input>
                <p>kg</p>
            </div>
            <div className="set-unit">
                <input 
                    placeholder="0" 
                    value={props.set.reps} 
                    name="reps" 
                    onChange={handleChange}>
                </input>
                <p>reps</p>
            </div>
            <CloseIcon className="icon" onClick={() => {
                props.onDelete(props.id);
            }}/>
        </div>
    )
}

export default Set;