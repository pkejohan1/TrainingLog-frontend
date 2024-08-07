import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SessionDetails from '../Components/SessionDetails';
import { axiosPrivate } from '../api/axios';
import useAuth from '../hooks/useAuth';

function HistoricTrainingSessions() {
    const { auth } = useAuth();
    const [sessionDetails, setSessionDetails] = useState(null);
    const { sessionId } = useParams();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const token = auth?.token;
                console.log('Token retrieved from context:', token);
                if (!token) {
                    console.error('Token not found');
                    return;
                }
                axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axiosPrivate.get(`/api/trainingsessions/${sessionId}`);
                setSessionDetails(response.data);
            } catch (error) {
                console.error('Error fetching session details:', error);
            }
        };

        fetchSessionDetails();
    }, [sessionId, auth]);

    const token = auth?.token;
    if (!token) {
        console.error('Token not found');
        return <Navigate to="/login" />;
    }

    return (
        <div className="app">
            <div className="exercise-container">
                <SessionDetails sessionDetails={sessionDetails} />
            </div>
        </div>
    );
}

export default HistoricTrainingSessions;
