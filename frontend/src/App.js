import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Overview from "./routes/Overview";

function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/overview" element={<Overview/>} />
        </Routes>
      </>
  );
}

export default App;
