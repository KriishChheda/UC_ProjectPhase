import './App.css'
import { Routes, Route } from "react-router-dom";

import CivicSphereHomepage from './components/CivicSphereHomepage';
import NeedAHandForm from './components/NeedAHandForm';
import CivicSphereLanding from './components/CivicSphereLanding';
import WorkerHomePage from './components/WorkerHomePage';
import CivicSphereMessaging from './components/CivicSphereMessaging';
import CivicSphereWorkerMessaging from './components/CivicSphereWorkerMessage';
import UserProfilePage from './components/UserProfilePage';
import { User } from 'lucide-react';
function App() {
  return (
    <Routes>
      {/* <UserProfilePage/> */}
      <Route path="/" element={<UserProfilePage />} />
      <Route path="/needahand" element={<NeedAHandForm />} /> 
      <Route path="/usermessage" element={<CivicSphereMessaging />} /> 
      <Route path="/workermessage" element={<CivicSphereWorkerMessaging />} /> 
    </Routes>
  );
}

export default App;
