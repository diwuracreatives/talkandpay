import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PerformLogin from "./auth/login";
import PerformTransfer from "./commands/question_based/transfer_flow";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/login" element={<PerformLogin />} /> {/* Login Route */}
        <Route path="/transfer" element={<PerformTransfer />} />
      </Routes>
    </Router>
  );
}
