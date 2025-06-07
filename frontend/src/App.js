import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Templates from "./pages/MyTemplates";
import PublicForm from "./pages/PublicForm";
import FormResponses from "./pages/FormResponse";
import SubmissionConfirmation from "./pages/SubmissionConfirmation";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/templates" element={<PrivateRoute><Templates/></PrivateRoute>} />
        <Route path="/public-form/:id" element={<PublicForm />} />           
        <Route path="/form-responses/:id" element={<PrivateRoute><FormResponses /></PrivateRoute>} /> 
        <Route path="/submission-confirmation" element={<SubmissionConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;