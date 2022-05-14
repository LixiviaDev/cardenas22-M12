import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";  //Para el react router
import './App.css';
import Home from './Routes/Home/Home';
import Login from './Routes/Login/Login';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
