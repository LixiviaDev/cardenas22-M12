import { useEffect, useState } from "react";
import { ChapterData } from "../../TypeScript/Classes/Chapters/Chapter";
import configData from '../../config.json';

export default function ChapterNav(props: any) {
    const [mangaId] = useState(props.mangaId);
    const [mangaServerId] = useState(props.mangaServerId);
    const [currentChapterId, setCurrentChapterId] = useState<number>(props.currentChapterId);

    const [chaptersData, setChaptersData] = useState<ChapterData[]>([]);
    const [chapterListItem, setChapterListItem] = useState<JSX.Element[]>();

    const [lastChapter, setLastChapter] = useState<number>();
    const [nextChapter, setNextChapter] = useState<number>();

    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(currentChapterId != undefined){
            processChaptersData();
        }
    }, [currentChapterId]);

    useEffect(() => {
        if(chaptersData.length > 0){
            if(currentChapterId == undefined)
                setCurrentChapterId(chaptersData[0].chapterId);
    
            setLastAndNextChapter();
        }
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
            <li><a className="dropdown-item" href={`/read/${mangaServerId}/${mangaId}/${item.chapterId}`}>{item.chapterId}</a></li>
            </>
            );
        }

        setChapterListItem(newChapterButtonList);
    }

    function setLastAndNextChapter() {
        let currentChapterIndex = chaptersData.findIndex(x => x.chapterId == currentChapterId);

        if(currentChapterIndex != -1){
            if(currentChapterIndex > 0)
                setLastChapter(chaptersData[+currentChapterId - 1].chapterId);

            if(currentChapterIndex < chaptersData.length - 1)
                setNextChapter(chaptersData[+currentChapterId + 1].chapterId);
        }
    }

    return(
        <>
            <div className="row">
                <div className="col-2 pe-0 ps-12 d-grid">
                    {(lastChapter != undefined) && 
                    <a  href={`/read/${mangaServerId}/${mangaId}/${lastChapter}`} 
                        className="btn btn-primary"
                        style={{borderRadius: 0}}>
                            {'<'}
                    </a>}
                </div>
                <div className="col-8 p-0">
                    <div className="dropdown w-100 d-grid">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{borderRadius: 0}}>
                            {currentChapterId}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {chapterListItem}
                        </ul>
                    </div>
                </div>
                <div className="col-2 pe-24 ps-0 d-grid">
                {(nextChapter != undefined) && 
                <a href={`/read/${mangaServerId}/${mangaId}/${nextChapter}`}
                        className="btn btn-primary"
                        style={{borderRadius: 0}}>
                            {'>'}
                </a>}
                </div>
            </div>
        </>
    );
}
