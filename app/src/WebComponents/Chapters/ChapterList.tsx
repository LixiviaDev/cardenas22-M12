import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChapterData } from "../../TypeScript/Classes/Chapters/Chapter";
import configData from '../../config.json';
import { LanguageManager } from "../../TypeScript/Managers/LanguageManager";

export default function ChapterList(props: any) {
    const [mangaId] = useState(props.mangaId);
    const [mangaServerId] = useState(props.mangaServerId);
    const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
    const [chapterButtonList, setChapterButtonList] = useState<JSX.Element[]>();

    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(chaptersData.length > 0)
            processChaptersData();
    }, [chaptersData]);

    function componentDidMount() {
        generateChaptersData();
    }

    async function generateChaptersData()
    {
        let newChaptersData = await getChaptersData();

        setChaptersData(newChaptersData);

        // The hook of mangaCardsData
    }

    async function getChaptersData() : Promise<ChapterData[]>
    {
        let bodyData = {token: localStorage.getItem("token"),
        mangaId: mangaId,
        mangaServerId: mangaServerId}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHAPTER_LIST}`, body);
        let data: ChapterData[] = await res.json();

        return data;
    }

    function processChaptersData() {
        let newChapterButtonList: JSX.Element[] = [];

        for(let item of chaptersData){
            newChapterButtonList.push(
            <>
            <ChapterListButton chapterData={item}/>
            </>
            );
        }

        setChapterButtonList(newChapterButtonList);
    }
    
    return(
        <>
        {chapterButtonList}
        </>
    )
}

function ChapterListButton(props: any) {
    const [chapterData] = useState(props.chapterData);
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(
        <>
        <a href={`/read/${chapterData.mangaServerId}/${chapterData.mangaId}/${chapterData.chapterId}`} className="w-100 p-2 text-black d-flex justify-content-between align-items-middle">
            <p className="m-0">{!isNaN(Number(chapterData.chapterId)) && "Ch."} {chapterData.chapterId}</p>
            <p className="m-0">{languageManager.dateToShortLangString(chapterData.dateAdded)}</p>
        </a>
        </>
    )
}