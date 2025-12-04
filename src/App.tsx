import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth/LoginForm"
import RegistrationForm from "./components/auth/RegistrationForm"
import { ToastContainer, toast } from "react-toastify"
import DashboardPage from "./pages/DashboardPage"




function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />


        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  )
}

export default App
