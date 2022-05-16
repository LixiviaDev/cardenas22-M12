import { useEffect, useState } from "react";
import { IMangaPreviewCardData, MangaCardData } from "../../../TypeScript/Classes/MangaCardData";
import { CardType } from "../../../TypeScript/Enums/CardType.enum";
import { LanguageManager } from "../../../TypeScript/Managers/LanguageManager";
import SectionTitle from "../../Common/SectionTitle";
import { HoverMangaCard, SimpleMangaCard } from "../MangaCard/MangaCard";
import configData from '../../../config.json';

export function MangaSection(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [sectionTitlePath] = useState<string>(props.sectionTitlePath);
    const [sectionHref] = useState<string>(props.sectionHref);

    const [cardType] = useState<CardType>(props.cardType);
    const [mangaCardsData, setMangaCardsData] = useState<MangaCardData[]>([]);
    const [endPoint] = useState<string>(props.endPoint);

    const [cards, setCards] = useState<JSX.Element[]>();

    const [page, setPage] = useState<number>(0); // Pagination

    useEffect( () => componentDidMount, [] );

    useEffect(() => {
        processMangaCards();
    }, [mangaCardsData]);

    function componentDidMount() {
        generateMangaCards();
    }

    async function generateMangaCards()
    {
        let newCardsData = await getMangaPreviewCardData();

        pushNewCardsData(newCardsData);

        // The hook of mangaCardsData
    }

    async function getMangaPreviewCardData() : Promise<MangaCardData[]>
    {
        let bodyData = {token: localStorage.getItem("token")}

        let body = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${endPoint}/${page}`, body);
        let data: IMangaPreviewCardData[] = await res.json();

        let cardsData: MangaCardData[] = [];

        for(let item of data){
            let mangaCardData = new MangaCardData();
            mangaCardData.setFromMangaPreviewCardData(item);

            cardsData.push(new MangaCardData(mangaCardData));
        }

        setPage(page + 1);

        return cardsData;
    }

    function pushNewCardsData(newCardsData: MangaCardData[]){
        let newMangaCardData: MangaCardData[] = mangaCardsData;
        newMangaCardData = newMangaCardData.concat(...newCardsData as []);

        setMangaCardsData(newMangaCardData);
    }

    function processMangaCards(){
        let cards = [];

        for(let mangaCardData of mangaCardsData ?? []){
            switch(cardType){
                case CardType.Hover:
                    cards.push(
                        <>
                        <div className="col-6 col-md-1 mb-3">
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
        <button onClick={generateMangaCards}></button>
        </>
    );
}