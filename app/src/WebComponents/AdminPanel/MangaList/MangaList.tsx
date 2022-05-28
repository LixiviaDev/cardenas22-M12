import { InputHTMLAttributes, useEffect, useState } from 'react';
import { LanguageManager } from '../../../TypeScript/Managers/LanguageManager';
import configData from '../../../config.json';
import { MangaBriefInfoData } from '../../../TypeScript/Classes/Manga/MangaInfoData';
import { BriefInfoMangaCard } from '../../Manga/MangaCard/MangaCard';

export default function MangaList() {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const [mangasData, setMangasData] = useState<MangaBriefInfoData[]>([]);
    const [mangasCards, setMangasCards] = useState<JSX.Element[]>([]);

    useEffect(() => componentDidMount(), []);

    useEffect(() => generateMangaCards(), [mangasData])

    function componentDidMount() {
        generateAllMangasData();
    }

    async function generateAllMangasData(){
        setMangasData(await fetchMangas(""));
    }

    // async function fetchAllMangas(){
    //     let mangasData : MangaBriefInfoData[] = [];

    //     let bodyData = {token: localStorage.getItem("token")}

    //     let body = {
    //         method: 'POST',
    //         mode: "cors" as RequestMode,
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(bodyData)
    //     }
    //     try
    //     {
    //         let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_ALL_USERS}`, body);

    //         mangasData = await res.json();
    //     }
    //     catch(ex)
    //     {
    //         console.error(ex);
    //     }

    //     return mangasData;
    // }

    async function fetchMangas(search: string){
        let mangasData : MangaBriefInfoData[] = [];

        let bodyData = {token: localStorage.getItem("token"),
                        search: search}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }
        try
        {
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.SEARCH_MANGA}`, body);

            mangasData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return mangasData;
    }

    async function onSubmitForm(e: any) {
        e?.preventDefault();
        
        setMangasData([]);

        let input = e.target[0];

        setMangasData(await fetchMangas(input.value));
    }

    function generateMangaCards() {
        let newMangasData : JSX.Element[] = [];

        for(let mangaData of mangasData)
            newMangasData.push(<>
                <div className="col-12 col-xxl-6 p-2 d-flex">
                    <BriefInfoMangaCard href={`/AdminPanel/ManageMangas/${mangaData.mangaId}`}
                                        mangaId={mangaData.mangaId}
                                        mangaServerId={mangaData.mangaServerId}
                                        title={mangaData.title} 
                                        img={mangaData.image}
                                        sinopsis={mangaData.sinopsis} 
                                        statusId={mangaData.statusId}
                                        lastChapter={mangaData.lastChapter} 
                                        lastChapterDateAdded={mangaData.lastChapterDateAdded} />
                </div>
            </>);
        
        setMangasCards(newMangasData);
    }

    return(<>
        <div className="d-flex flex-column">
            <div className="d-flex py-3 justify-content-around">
                <h2 className='fs-1 text-uppercase'>{languageManager.get("AdminPanel.NAV.MANAGE_USERS")}</h2>
            </div>
            <div className="d-flex py-3 justify-content-around">
                <form className="d-flex w-50" action="/" onSubmit={onSubmitForm} method='get'>
                    <input className="form-control me-2" type="search" placeholder={languageManager.get("Shared.SEARCH")} name='search' aria-label="Search"/>
                </form>
            </div>
            <div className='row'>
                {mangasCards}
            </div>
        </div>
    </>)
}