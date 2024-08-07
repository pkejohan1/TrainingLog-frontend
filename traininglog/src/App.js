import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrainingSession from './Components/TrainingSession';
import Login from './pages/Login';
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import Home from './pages/Home';
import HistoricTrainingSessions from './pages/HistoricTrainingSessions';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='trainingsession' element={<TrainingSession />} />
          <Route path='home' element={<Home />} />
          <Route path='historic/:sessionId' element={<HistoricTrainingSessions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
