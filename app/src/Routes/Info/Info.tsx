import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMangaInfoData, MangaInfoData } from "../../TypeScript/Classes/Manga/MangaInfoData";
import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";
import configData from '../../config.json';
import { LanguageManager } from "../../TypeScript/Managers/LanguageManager";

export default function Info(props: any) {

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const {mangaId} = useParams();
    const [mangaInfoData, setMangaInfoData] = useState<MangaInfoData>();

    useEffect(() => componentDidMount, []);

    // useEffect(() => processMangaCards(), [mangaInfoData]);

    function componentDidMount() {
        // let newMangaInfoData: MangaInfoData = new MangaInfoData({
        //     mangaId: mangaId,
        //     title: "Ameiro Koucha kan Kandan",
        //     mangaServerId: 1,
        //     image: "https://ww1.mangakakalot.tv/mangaimage/manga-xo956349.jpg",
        //     authors: ["paco1"] as string[],
        //     artists: ["paco2", "paco3"] as string[],
        //     tags: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"] as string[],
        //     sinopsis: "            Set at a shop called The Amber Teahouse, this is a very heartwarming story that focuses on Seriho, the proprietor of the teahouse, and Sarasa, the high school student who works there part-time. It&apos;ll set your heart aflutter!           ",
        //     statusId: 0,
        //     views:62556682,
        //     score:5,
        //     lastUpdateChapterDateAdded: "2022-05-15T16:11:37.559Z"
        // } as IMangaInfoData);

        // pushMangaInfoData(newMangaInfoData);

        generateMangaInfoData();
    }

    async function generateMangaInfoData()
    {
        let newMangaInfoData = await getMangaInfoData();

        setMangaInfoData(newMangaInfoData);

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

    return(
        <>
        <h1 hidden>Informacion del manga {mangaInfoData?.title}</h1>
        <SharedInterface>
            <div className="px-4">
                <div className="w-100 px-2 border border-secondary d-flex flex-column align-items-center">
                    <img src={mangaInfoData?.image} alt={`Portada de ${mangaInfoData?.title}`} style={{aspectRatio: "1/1.5", maxWidth: "70%"}}/>
                    <h2 className="h1 my-3 text-center">{mangaInfoData?.title}</h2>
                    <div className="row">
                        {/* <TitleDataRow title="Nombres alternativos" data={mangaInfoData?.lastUpdateChapterDateAdded}></TitleDataRow> */}
                        <TitleDataRow title="Guionistas" data={mangaInfoData?.authors}></TitleDataRow>
                        <TitleDataRow title="Artistas" data={mangaInfoData?.artists}></TitleDataRow>
                        <TitleDataRow title="Estado" data={mangaInfoData?.statusId}></TitleDataRow>
                        <TitleDataRow title="Tags" data={mangaInfoData?.tags}></TitleDataRow>
                        <TitleDataRow title="Actualizado" data={languageManager.dateToShortLangString(mangaInfoData?.lastUpdateChapterDateAdded)}></TitleDataRow>
                        <TitleDataRow title="Visitas" data={mangaInfoData?.views}></TitleDataRow>
                        <TitleDataRow title="Puntuacion" data={mangaInfoData?.score}></TitleDataRow>
                    </div>
                </div>
                <div className="w-100 px-2 border border-secondary d-flex flex-column align-items-center">
                    <h3 className="my-2">Sinopsis</h3>
                    <p className="w-100">
                        {mangaInfoData?.sinopsis}
                    </p>
                </div>
                <div className="w-100 px-2 border border-secondary d-flex flex-column align-items-center">

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

function TitleDataRow(props: any){

    let data: string = props.data;

    if(Array.isArray(props.data)){
        console.log(props.data.join(", "));
        data = props.data.join(", ");
        console.log(props.data);
    }

    return(
        <>
        <div className="col-12 d-flex flex-row">
            <h3 className="h6 mb-2 me-1 fw-bold">{props.title}:</h3>
            <p className="m-0">{data}</p>
        </div>
        </>
    );
}