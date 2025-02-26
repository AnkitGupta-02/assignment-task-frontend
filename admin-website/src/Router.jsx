import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginForm from "./components/Form/LoginForm";

function Router() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default Router;