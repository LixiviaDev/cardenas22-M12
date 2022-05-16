import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMangaInfoData, MangaInfoData } from "../../TypeScript/Classes/Manga/MangaInfoData";
import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";
import configData from '../../config.json';

export default function Info(props: any) {

    const {mangaId} = useParams();
    const [mangaInfoData, setMangaInfoData] = useState<MangaInfoData>();

    useEffect(() => componentDidMount, []);

    // useEffect(() => processMangaCards(), [mangaInfoData]);

    function componentDidMount() {
        let newMangaInfoData: MangaInfoData = new MangaInfoData({
            mangaId: mangaId,
            title: "Ameiro Koucha kan Kandan",
            mangaServerId: 1,
            image: "https://ww1.mangakakalot.tv/mangaimage/manga-xo956349.jpg",
            lastChapter: 19,
            sinopsis: "            Set at a shop called The Amber Teahouse, this is a very heartwarming story that focuses on Seriho, the proprietor of the teahouse, and Sarasa, the high school student who works there part-time. It&apos;ll set your heart aflutter!           ",
            lastUpdateChapterId: 0,
            statusId: 0,
            lastUpdateChapterDateAdded: "2022-05-15T16:11:37.559Z"
        } as IMangaInfoData);
        pushMangaInfoData(newMangaInfoData);

        // generateMangaInfoData();
    }

    async function generateMangaInfoData()
    {
        let newMangaInfoData = await getMangaInfoData();

        pushMangaInfoData(newMangaInfoData);

        // The hook of mangaCardsData
    }

    async function getMangaInfoData() : Promise<MangaInfoData>
    {
        let bodyData = {token: localStorage.getItem("token")}

        let body = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.INFO}/${mangaId}`, body);
        let data: MangaInfoData = await res.json();

        return data;
    }

    function pushMangaInfoData(newMangaInfoData: MangaInfoData){
        setMangaInfoData(newMangaInfoData);
    }

    return(
        <>
        <h1 hidden>Informacion del manga {mangaInfoData?.title}</h1>
        <SharedInterface>
            <div className="px-4">
                <div className="w-100 border border-secondary">
                    <img src={mangaInfoData?.image} alt={`Portada de ${mangaInfoData?.title}`} />
                    <h1>{mangaInfoData?.title}</h1>
                    <div className="row">
                        <TitleDataColumn title="Guionistas" data={mangaInfoData?.lastUpdateChapterDateAdded}></TitleDataColumn>
                        <TitleDataColumn title="Artistas" data={mangaInfoData?.lastUpdateChapterDateAdded}></TitleDataColumn>
                        <TitleDataColumn title="Nombres alternativos" data={mangaInfoData?.lastUpdateChapterDateAdded}></TitleDataColumn>
                        <div className="col-4 d-flex flex-column">
                            <p>Title</p>
                            <p>{mangaInfoData?.lastUpdateChapterDateAdded}</p>
                        </div>
                        <div className="col-4 d-flex flex-column">
                        </div>
                        <div className="col-4 d-flex flex-column">
                            <p>Title</p>
                            <p>{mangaInfoData?.lastUpdateChapterDateAdded}</p>
                        </div>
                    </div>
                </div>
            </div>
        </SharedInterface>
        </>
    );
}

function TitleDataColumn(props: any){
    return(
        <>
        <div className="col-4 d-flex flex-column">
            <p className="fw-bold">{props.title}</p>
            <p>{props.data}</p>
        </div>
        </>
    );
}