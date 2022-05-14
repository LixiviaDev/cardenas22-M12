import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Languages } from '../../TypeScript/Enums/Language.enum';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import SectionTitle from '../../WebComponents/Common/SectionTitle';
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';
import { HoverMangaCard } from '../../WebComponents/Manga/MangaCard';

export default function Home(props: any) {
  const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(
        <>
        <SharedInterface>
            <h1 hidden>Home</h1>
            {/* <Link to="/login">Login</Link> */}
            <SectionTitle title={languageManager.get("Home.READING_TITLE")} href="/leyendo" />
            <div className="row">
                <div className="col-6">
                    <HoverMangaCard title="A" link="/a"/>
                </div>
                <div className="col-6">
                    <HoverMangaCard title="B" link="/b"/>
                </div>
                <div className="col-6">
                    <HoverMangaCard title="C" link="/c"/>
                </div>
                <div className="col-6">
                    <HoverMangaCard title="D" link="/d"/>
                </div>
            </div>
            <SectionTitle title={languageManager.get("Home.HOT_TITLE")} href="/hot" />
            <SectionTitle title={languageManager.get("Home.NEW_TITLE")} href="/new" />
            <button onClick={() => languageManager.changeAppLanguage(Languages.ES)}>Español</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.EN)}>English</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.CA)}>Catala</button>
        </SharedInterface>
        </>
    );
}