import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Set from './Set.jsx';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';


function Exercise(props) {

    function handleChange(event) {
        const { name, value } = event.target;
        props.onUpdate({ ...props.exercise, [name]: value });
    }

    // Handles change in reps or weight
    function handleSetChange(updatedSet, index) {
        const updatedSets = props.exercise.sets.map((set, i) => (i === index ? updatedSet : set));
        props.onUpdate({ ...props.exercise, sets: updatedSets });
    }

    function addSet() {
        const newSet = { id: uuidv4(), reps: "", weight: "", markedDone: false };
        const updatedExercise = { ...props.exercise, sets: [...props.exercise.sets, newSet] };
        props.onUpdate(updatedExercise);
    }

    function deleteSet(id) {
        const updatedSets = props.exercise.sets.filter(set => set.id !== id);
        props.onUpdate({ ...props.exercise, sets: updatedSets });
    }

    function markSetAsDone(id) {
        const updatedSets = props.exercise.sets.map(set =>
          set.id === id ? { ...set, markedDone: !set.markedDone } : set
        );
        props.onUpdate({ ...props.exercise, sets: updatedSets });
    }

    return (
        <div className="exercise-container">
            <div className="exercise-header">
                <input value={props.exercise.name} placeholder="Exercise name" name="name" onChange={handleChange}></input>
                <div className="icon-group">
                    <HelpOutlineIcon />
                    <MoreVertIcon onClick={() => {props.onDeleteExercise(props.exerciseId)}}/>
                </div>
            </div>
            {props.exercise.sets.map((set, index) => {
                return (
                <Set 
                    key={set.id}
                    set={set}
                    index={index}
                    onChange={updatedSet => handleSetChange(updatedSet, index)}
                    onDelete={() => deleteSet(set.id)}
                    onMarkAsDone={() => markSetAsDone(set.id)}
                />
                )
            })}
            <div className="set-number" onClick={addSet}>
                <AddIcon />
            </div>
        </div>
    )
}

export default Exercise;