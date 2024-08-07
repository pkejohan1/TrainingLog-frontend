import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import Exercise from './Exercise';
import { v4 as uuidv4 } from 'uuid';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function App() {
  const [exercises, setExercises] = useState([]);
  const [timer, setTimer] = useState(0);
  const { auth } = useAuth();
  const { user_id } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function addExercise() {
    const newExercise = {
      id: uuidv4(),
      name: "",
      sets: [{ id: uuidv4(), weight: "", reps: "", markedDone: false, }]
    };
    setExercises(prevExercises => [...prevExercises, newExercise]);
  }

  function deleteExercise(id) {
    setExercises(prevExercises => exercises.filter(exercise => exercise.id !== id));
  }

  function updateExercise(updatedExercise) {
    setExercises(prevExercises =>
      prevExercises.map(exercise => (exercise.id === updatedExercise.id ? updatedExercise : exercise))
    );
  }

  async function saveTrainingSession() {

    try {
      const trainingSessionData = {
        name: "session", // fixa senare
        userId: user_id,
        date: new Date(),
        duration: "1 hour",
        exercises: exercises
        .filter(exercise => exercise.sets.some(set => set.markedDone)) // Filter exercises with at least one set
        .map(exercise => ({
          name: exercise.name,
          sets: exercise.sets
          .filter(set => set.markedDone) // Filter only the sets that are marked as done
          .map(set => ({
            weight: set.weight,
            reps: set.reps
          }))
        }))
      };
      const response = await axiosPrivate.post('/api/trainingsessions', trainingSessionData);
      console.log('Training session saved:', response.data);
      navigate("/home");
    } catch (error) {
      console.error('Error saving training session:', error);
    }
  }

  return (
    <div className="app">
      <header className='training-session-header'>
        <CloseIcon className='icon red' />
        <p>{formatTime(timer)}</p>
        <div className='icon-group'>
          <SettingsIcon className='icon'/>
          <CheckIcon className='icon green' onClick={saveTrainingSession} /> {/* Call saveTrainingSession when the check icon is clicked */}
        </div>
      </header>
      
      {exercises.map((exercise) => (
        <Exercise 
          key={exercise.id}
          exerciseId={exercise.id}
          exercise={exercise}
          onDelete={deleteExercise}
          onUpdate={updateExercise}
          onDeleteExercise={deleteExercise}
        />
      ))}

      <div className='two-col'>
        <div className='button' onClick={addExercise}>New Exercise</div>
      </div>
    </div>
  );
}

export default App;
