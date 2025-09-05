
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import NotificationCard from "./components/Notifications/NotificationCard";
import { SignupPage } from "./pages/SignupPage";
import InterviewInterfacePage from "./pages/InterviewInterfacePage";
import CodeEditor from "./components/CodeEdior/CodeEditor";
import { InterviewDetails } from "./pages/InterviewDetails";
import NotFound from "./pages/NotFound";


function App() {

  return (
    <div className="bg-[#212121] ">
      <NotificationCard/>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<CodeEditor />} />
          <Route
            path="/interviewinterface/:id"
            element={<InterviewInterfacePage/>}
          />
          <Route
            path="/interviewdetails/:id"
            element={<InterviewDetails/>}
          />
          <Route
            path="/*"
            element={<NotFound/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
