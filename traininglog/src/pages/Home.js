import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionPost from '../Components/SessionPost';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

function Home() {
    const [trainingSessions, setTrainingSessions] = useState([]);
    const { auth } = useAuth();
    const userId = auth.user_id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrainingSessions();
    }, []);

    const fetchTrainingSessions = async () => {
        try {
            const token = localStorage.getItem('token');
            // Set the authorization header with the token
            axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosPrivate.get(`/api/trainingsessions/user/${userId}`);
            setTrainingSessions(response.data);
        } catch (error) {
            console.error('Error fetching training sessions:', error);
        }
    };

    const handleNewSessionClick = () => {
        // Navigate to the '/trainingsession' route
        navigate('/trainingsession');
    };

    const handleSessionClick = (sessionId) => {
        console.log("handle session click," , sessionId);
        // Navigate to the HistoricTrainingSessions component with the session ID as a parameter
        navigate(`/historic/${sessionId}`);
    };

    return (
        <div className='app'>
            <div className='menu-container'>
                <button className='button' onClick={handleNewSessionClick}>Log New Session</button>
            </div>
            {trainingSessions.map(session => (
                <SessionPost 
                    key={session.id}
                    title={session.name}
                    date={session.date}
                    exercises={session.exercises}
                    onClick={() => handleSessionClick(session.id)}
                />
            ))}
        </div>
    );
}

export default Home;
