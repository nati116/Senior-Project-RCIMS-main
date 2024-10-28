import "./App.css";
import {Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard/dashboard";
import ProfessionalManagement from "./pages/AdminPages/ProfessionalManagement/ProfessionalManagement";
import { Toaster } from 'sonner';
function App() {
    return (
        <div>
         <Toaster richColors position="top-center" />
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route
                    path="/overview"
                    element={<ProfessionalManagement />}
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
