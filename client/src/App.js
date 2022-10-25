import Header from './components/header/Header.jsx';
import Body from './components/body/Body.jsx'
import React from "react"
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Body/>} />
      </Routes>
    </div>
  );
}

export default App;
