import { useEffect, useState } from "react";
import { MangaCardData } from "../../../TypeScript/Classes/MangaCardData";
import { CardType } from "../../../TypeScript/Enums/CardType.enum";
import { LanguageManager } from "../../../TypeScript/Managers/LanguageManager";
import SectionTitle from "../../Common/SectionTitle";
import { HoverMangaCard, SimpleMangaCard } from "../MangaCard/MangaCard";

export function MangaSection(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [sectionTitlePath] = useState<string>(props.sectionTitlePath);
    const [sectionHref] = useState<string>(props.sectionHref);

    const [cardType] = useState<CardType>(props.cardType);
    const [mangaCardsData] = useState<MangaCardData[]>(props.mangaCardData);

    const [cards, setCards] = useState<JSX.Element[]>();

    useEffect( () => componentDidMount(), [] );

    function componentDidMount() {
        processMangaCards();
    }

    function processMangaCards(){
        let cards = [];

        for(let mangaCardData of mangaCardsData ?? []){
            switch(cardType){
                case CardType.Hover:
                    cards.push(
                        <>
                        <div className="col-6 mb-3">
                            <HoverMangaCard title={mangaCardData.title} 
                                            href={mangaCardData.href} 
                                            img={mangaCardData.img}
                                            hoverDisabled={mangaCardData.hoverDisabled}/>
                        </div>
                        </>
                    );
                    break;
                case CardType.Simple:
                    cards.push(
                        <>
                        <div className="col-6 mb-3">
                            <SimpleMangaCard title={mangaCardData.title} 
                                            href={mangaCardData.href} 
                                            img={mangaCardData.img}/>
                        </div>
                        </>
                    );
                    break;
            }

        setCards(cards);
    }}

    return(
        <>
        <SectionTitle title={languageManager.get(sectionTitlePath)} href={sectionHref} />
        <div className="row m-0">
            {cards}
        </div>
        </>
    );
}