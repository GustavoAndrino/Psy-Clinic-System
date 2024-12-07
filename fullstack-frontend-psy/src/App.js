import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navabar } from './layout/Navabar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ViewPacients } from './requests/ViewPacients';


function App() {
  return (
    <div className="App">
      <Router>
        <Navabar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/viewPacient/:id" element={<ViewPacients />} />      
          </Routes>          
        </Router>
    </div>
  );
}

export default App;
