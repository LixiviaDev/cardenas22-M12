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
            generateChaptersData();
        }
    }, [currentChapterId]);

    useEffect(() => {
        if(chaptersData.length > 0){
            if(currentChapterId == undefined)
                setCurrentChapterId(chaptersData[0].chapterId);
    
            processChaptersData();
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
            if(item.chapterId == currentChapterId){
                newChapterButtonList.push(
                <>
                <option value={`/read/${mangaServerId}/${mangaId}/${item.chapterId}`} selected>{item.chapterId}</option>
                </>
                );
            }
            else {
                newChapterButtonList.push(
                <>
                <option value={`/read/${mangaServerId}/${mangaId}/${item.chapterId}`}>{item.chapterId}</option>
                </>
                );
            }
        }

        setChapterListItem(newChapterButtonList);
    }

    function setLastAndNextChapter() {
        let currentChapterIndex = chaptersData.findIndex(x => x.chapterId == currentChapterId);

        if(currentChapterIndex != -1){
            if(currentChapterIndex > 0)
                setLastChapter(chaptersData[currentChapterIndex - 1].chapterId);

            if(currentChapterIndex < chaptersData.length - 1)
                setNextChapter(chaptersData[currentChapterIndex + 1].chapterId);
        }
    }

    return(
        <>
            <div className="row m-0">
                <LinkButton mangaServerId={mangaServerId} mangaId={mangaId} chapterId={lastChapter} innerText="<"/>
                <div className="col-8 p-0">
                    <select className="form-select form-select-lg text-center" name="a" id="a" onChange={(event) => window.location.assign(event.target.value)} style={{borderRadius: 0}}>
                        {chapterListItem}
                    </select>
                </div>
                <LinkButton mangaServerId={mangaServerId} mangaId={mangaId} chapterId={nextChapter} innerText=">"/>
            </div>
        </>
    );
}

function LinkButton(props: any){
    return(
        <>
        <div className="col-2 p-0 d-grid">
        {(props.chapterId != undefined) ? 
        <a href={`/read/${props.mangaServerId}/${props.mangaId}/${props.chapterId}`}
                className="btn btn-primary d-flex justify-content-center align-items-center"
                style={{borderRadius: 0}}>
                    {props.innerText}
        </a>
        :
        <div
                className="btn btn-dark d-flex justify-content-center align-items-center"
                style={{borderRadius: 0}}>
                    {props.innerText}
        </div>}
        </div>
        </>
    )
}