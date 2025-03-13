
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PerformLogin from "./auth/login";

export default function App() {
   return(
  <Router>
  <Routes>
    <Route path="/" element={<Home />} />  {/* Home Route */}
    <Route path="/login" element={<PerformLogin />} />  {/* Login Route */}
  </Routes>
</Router>
)
};