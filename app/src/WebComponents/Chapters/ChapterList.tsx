import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChapterData } from "../../TypeScript/Classes/Chapters/Chapter";
import configData from '../../config.json';

export default function ChapterList(props: any) {
    const [mangaId] = useState(props.mangaId);
    const [mangaServerId] = useState(props.mangaServerId);
    const [chaptersData, setChaptersData] = useState<ChapterData[]>();

    useEffect(() => componentDidMount, []);

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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHAPTER_LIST}`, body);
        let data: ChapterData[] = await res.json();

        return data;
    }
    
    return(
        <>
        
        </>
    )
}