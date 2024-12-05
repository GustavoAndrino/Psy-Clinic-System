import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navabar } from './layout/Navabar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Navabar />
          <Routes>
            <Route exact path="/" element={<Home />} />      
          </Routes>          
        </Router>
    </div>
  );
}

export default App;
