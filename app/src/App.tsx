import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";  //Para el react router
import './App.css';
import Home from './routes/home/Home';
import Login from './routes/login/Login';

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
