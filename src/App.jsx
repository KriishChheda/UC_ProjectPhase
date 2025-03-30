import './App.css'
import { Routes, Route } from "react-router-dom";

import CivicSphereHomepage from './components/CivicSphereHomepage';
import NeedAHandForm from './components/NeedAHandForm';
import CivicSphereLanding from './components/CivicSphereLanding';
import WorkerHomePage from './components/WorkerHomePage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<CivicSphereHomepage />} />
      <Route path="/needahand" element={<NeedAHandForm />} /> 
    </Routes>
  );
}

export default App;
