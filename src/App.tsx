import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth/LoginForm"
import RegistrationForm from "./components/auth/RegistrationForm"
import { ToastContainer } from "react-toastify"
import DashboardPage from "./pages/DashboardPage"
import WasteGeneratorOnboardingPage from "./pages/WasteGeneratorOnboardingPage"
import AggregatorOnboardingPage from "./pages/AggregatorOnboardingPage"
import UserTypeSelectionPage from "./pages/UserTypeSelectionPage"




function App() {


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
      />
      <Routes>
        {/* Define your routes here */}
        <Route path="/onboarding" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />


        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding/waste-generator" element={<WasteGeneratorOnboardingPage />} />
        <Route path="/onboarding/aggregator" element={<AggregatorOnboardingPage />} />
        <Route path="/onboarding/select-type" element={<UserTypeSelectionPage />} />
      </Routes>
    </>
  )
}

export default App
