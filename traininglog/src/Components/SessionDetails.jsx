import React from "react";

function SessionDetails({ sessionDetails }) {
    return (
        <div>
            <h2>Session Details</h2>
            {sessionDetails && (
                <div>
                    <p><strong>Name:</strong> {sessionDetails.name}</p>
                    <p><strong>Date:</strong> {new Date(sessionDetails.date).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {sessionDetails.duration?.hours} hours</p>
                    
                    <h3>Exercises:</h3>
                    
                    <ul>
                        {sessionDetails.exercises && sessionDetails.exercises.length > 0 ? (
                            sessionDetails.exercises.map(exercise => (
                                <li key={exercise.name}>
                                    <strong>Exercise Name:</strong> {exercise.name}
                                    {exercise.sets.map(set => (
                                        <li key={set.id}>
                                            <span>Reps: {set.reps}, Weight: {set.weight}</span>
                                        </li>
                                    ))}
                                    
                                    
                                </li>
                            ))
                        ) : (
                            <li>No exercises found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SessionDetails;
