import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChapterImageData } from "../../TypeScript/Classes/Chapters/Chapter";
import configData from '../../config.json';
import ReaderInterface from "../../WebComponents/ReaderInterface/ReaderInterface";

export default function Reader(props: any) {
    const {mangaId, mangaServerId, chapterId} = useParams();

    const [chapterImagesData, setChapterImagesData] = useState<ChapterImageData[]>([]);
    const [chapterImages, setChapterImages] = useState<JSX.Element[]>([]);

    useEffect(() => generateChapterImagesData(), []);
    useEffect(() => {
        if(chapterImagesData.length > 0)
            generateChapterImages()
    }, [chapterImagesData]);

    function generateChapterImagesData(){
        getChapterImagesData();
    }

    async function getChapterImagesData() {
        setChapterImagesData(await fetchChapterImagesData());
    }

    async function fetchChapterImagesData(): Promise<ChapterImageData[]>{
        let bodyData = {
                            token: localStorage.getItem("token"),
                            mangaId: mangaId,
                            mangaServerId: mangaServerId,
                            chapterId: chapterId
                        }

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHAPTER_IMAGES}`, body);
        let data: ChapterImageData[] = await res.json();

        return data;
    }

    function generateChapterImages() {
        let newChapterImages: JSX.Element[] = [];

        for(let item of chapterImagesData){
            newChapterImages.push(
                <>
                <img className="d-block m-auto w-auto" src={item.image} alt={`Pagina nº${item.page}`} />
                </>
            );
        }

        setChapterImages(newChapterImages);
    }

    return(
        <>
        <ReaderInterface>
            {chapterImages}
        </ReaderInterface>
        </>
    );
}