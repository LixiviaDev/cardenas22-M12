import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";  //Para el react router
import './App.css';
import Home from './Routes/Home/Home';
import Info from "./Routes/Info/Info";
import Login from './Routes/Login/Login';
import Reader from "./Routes/Reader/Reader";
import { Languages } from "./TypeScript/Enums/Language.enum";
import { LanguageManager } from "./TypeScript/Managers/LanguageManager";

function App() {

  const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

  useEffect( () => componentDidMount(), [] );

	function componentDidMount() {
    languageManager.setAppLanguage();
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="info/:mangaId" element={<Info />} />
        <Route path="read/:mangaServerId/:mangaId/:chapterId" element={<Reader />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
