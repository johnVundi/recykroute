import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth/LoginForm"
import RegistrationForm from "./components/auth/RegistrationForm"




function App() {


  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </>
  )
}

export default App
