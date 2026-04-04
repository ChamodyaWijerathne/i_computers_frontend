import { Toaster } from "react-hot-toast";
import Test from "./components/test";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from "./pages/forgotPassword";

export default function App() {
    return (
      
      <div className="w-full h-screen bg-primary text-secondary">
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </div>
    )
}

