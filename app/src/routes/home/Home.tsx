import React, { useState } from 'react'
import { Languages } from '../../TypeScript/Enums/Language.enum';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import SectionTitle from '../../WebComponents/Common/SectionTitle';
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';

import { MangaSection } from '../../WebComponents/Manga/MangaSection/MangaSection';
import { CardType } from '../../TypeScript/Enums/CardType.enum';

export default function Home(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(
        <>
        <SharedInterface>
            <h1 hidden>Home</h1>
            {/* <Link to="/login">Login</Link> */}
            <MangaSection   sectionTitlePath="Home.READING_TITLE"
                            sectionHref="/reading"
                            cardType={CardType.Hover}
                            endPoint="manga/testMangaPreviewCard"/>

            <MangaSection   sectionTitlePath="Home.HOT_TITLE"
                            sectionHref="/hot"
                            cardType={CardType.Simple}
                            endPoint="manga/testMangaPreviewCard"/>
                            
            <SectionTitle title={languageManager.get("Home.NEW_TITLE")} href="/new" />
            <button onClick={() => languageManager.changeAppLanguage(Languages.ES)}>Español</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.EN)}>English</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.CA)}>Catala</button>
        </SharedInterface>
        </>
    );
}