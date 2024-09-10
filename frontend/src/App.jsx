import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/AuthUser";
import { useEffect } from "react";

function App() {
  const { user, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, []);
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
