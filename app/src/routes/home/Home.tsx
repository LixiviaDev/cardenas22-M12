import React, { useState } from 'react'
import { Languages } from '../../TypeScript/Enums/Language.enum';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import SectionTitle from '../../WebComponents/Common/SectionTitle';
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';

import { MangaSection } from '../../WebComponents/Manga/MangaSection/MangaSection';
import { CardType } from '../../TypeScript/Enums/CardType.enum';
import { MangaCardData, IMangaCardData } from '../../TypeScript/Classes/MangaCardData';

export default function Home(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

  const [mangaCardsData] = useState<MangaCardData[]>([
    new MangaCardData({
      title: "A",
      img: "https://i.pinimg.com/originals/ca/c9/16/cac916910b6e44c8b4a8642c26d6e893.jpg",
      href: "/a",
    } as IMangaCardData),
    new MangaCardData({
      title: "B",
      img: "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088736013/1200/9784088736013.jpg",
      href: "/b",
      hoverDisabled: true,
    } as IMangaCardData),
    new MangaCardData({
      title: "C",
      img: "https://vignette.wikia.nocookie.net/made-in-abyss/images/6/65/161645l.jpg/revision/latest?cb=20171026173101&path-prefix=es",
      href: "/c",
      hoverDisabled: true,
    } as IMangaCardData),
    new MangaCardData({
      title: "D",
      img: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/5930/9781593074845.jpg",
      href: "/d",
    } as IMangaCardData)
  ]);

    return(
        <>
        <SharedInterface>
            <h1 hidden>Home</h1>
            {/* <Link to="/login">Login</Link> */}
            <MangaSection   sectionTitlePath="Home.READING_TITLE"
                            sectionHref="/reading"
                            cardType={CardType.Hover}
                            mangaCardData={mangaCardsData}/>

            <MangaSection   sectionTitlePath="Home.HOT_TITLE"
                            sectionHref="/hot"
                            cardType={CardType.Simple}
                            mangaCardData={mangaCardsData}/>
                            
            <SectionTitle title={languageManager.get("Home.NEW_TITLE")} href="/new" />
            <button onClick={() => languageManager.changeAppLanguage(Languages.ES)}>Español</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.EN)}>English</button>
            <button onClick={() => languageManager.changeAppLanguage(Languages.CA)}>Catala</button>
        </SharedInterface>
        </>
    );
}