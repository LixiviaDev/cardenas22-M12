import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";  //Para el react router
import './App.css';
import AdminPanel from "./Routes/AdminPanel/AdminPanel";
import Home from './Routes/Home/Home';
import Info from "./Routes/Info/Info";
import Login from './Routes/Login/Login';
import Reader from "./Routes/Reader/Reader";
import Search from "./Routes/Search/Search";
import Signup from "./Routes/Signup/Signup";
import { LanguageManager } from "./TypeScript/Managers/LanguageManager";
import MangaDataManagement from "./WebComponents/AdminPanel/MangaDataManagement/MangaDataManagement";
import MangaList from "./WebComponents/AdminPanel/MangaList/MangaList";
import UserList from "./WebComponents/AdminPanel/UserList/UserList";
import UserRoleManagement from "./WebComponents/AdminPanel/UserRoleManagement/UserRoleManagement";

function App() {

  const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

  useEffect( () => componentDidMount(), [] );

	function componentDidMount() {
    languageManager.initAppLanguage();
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="search" element={<Search />} />
        <Route path="info/:mangaId" element={<Info />} />
        <Route path="read/:mangaServerId/:mangaId/:chapterId" element={<Reader />} />
        <Route path="adminPanel" element={<AdminPanel />} >
          <Route path="manageUsers" element={<UserList />} />
          <Route path="manageUsers/:userId" element={<UserRoleManagement />} />
          <Route path="manageMangas" element={<MangaList />} />
          <Route path="manageMangas/:mangaId" element={<MangaDataManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
