import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NoteState from "./ContextApi/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
// import { useLocation } from 'react-router-dom'

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="login" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="about" key="about" element={<About />} />
            <Route exact path="contact" key="contact" element={<Contact />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
