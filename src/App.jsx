import './App.css'
import { Routes, Route } from "react-router-dom";
import CivicSphereHomepage from './components/CivicSphereHomepage';
import NeedAHandForm from './components/NeedAHandForm';
import CivicSphereLanding from './components/CivicSphereLanding';
import WorkerHomePage from './components/WorkerHomePage';
import CivicSphereMessaging from './components/CivicSphereMessaging';
import CivicSphereWorkerMessaging from './components/CivicSphereWorkerMessage';
import UserProfilePage from './components/UserProfilePage';
import AuthForm from './components/AuthForm';
import WorkerProfilePage from './components/WorkerProfilePage';
import CivicSphereJobs from './components/CivicSphereJobs';
import WorkerJobs from './components/WorkerJobs';
import { User } from 'lucide-react';
function App() {
  return (
    <Routes>
      <Route path="/" element={<CivicSphereLanding />} />
      <Route path="/usersignuplogin" element={<AuthForm />} />
      <Route path="/customer-homepage" element={<CivicSphereHomepage/>} /> 
      <Route path="/worker-homepage" element={<WorkerHomePage />} />
      <Route path="/needahand" element={<NeedAHandForm />} /> 
      <Route path="/usermessage" element={<CivicSphereMessaging />} /> 
      <Route path="/workermessage" element={<CivicSphereWorkerMessaging />} /> 
      <Route path="/userprofile" element={<UserProfilePage />} /> 
      <Route path="/workerprofile" element={<WorkerProfilePage />} /> 
      <Route path="/userjobs" element={<CivicSphereJobs />} /> 
      <Route path="/workerjobs" element={<WorkerJobs />} /> 
    </Routes>
  );
}

export default App;