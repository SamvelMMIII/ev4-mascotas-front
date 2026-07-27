import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasDetail from "./components/mascotas/MascotasDetail";

function App() {
  return (
    <>
    <Router> 
      <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
        <div className="container py-2">
          <NavLink className="navbar-brand fw-bold text-success" to={"/mascotas"}>MascotasApp</NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link fw-semibold" to={"/mascotas"}>Mascotas</NavLink>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<MascotasPage/>}/>
        <Route path="mascotas/" element={<MascotasPage/>}/>
        <Route path="mascotas/:id" element={<MascotasDetail/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App