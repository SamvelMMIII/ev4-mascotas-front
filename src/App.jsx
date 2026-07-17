import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<MascotasPage />} />
        </Routes>
      </Router>
  );
}

export default App