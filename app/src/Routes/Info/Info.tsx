import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MangaInfoData } from "../../TypeScript/Classes/Manga/MangaInfoData";
import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";
import configData from '../../config.json';
import { LanguageManager } from "../../TypeScript/Managers/LanguageManager";
import ChapterList from "../../WebComponents/Chapters/ChapterList";
import "./Info.css"

export default function Info(props: any) {

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    const {mangaId} = useParams();
    const [mangaInfoData, setMangaInfoData] = useState<MangaInfoData>();

    const [chapterList, setchapterList] = useState<any>();

    useEffect(() => componentDidMount(), []);
    
    useEffect(() => {

        if(mangaInfoData?.mangaServerId != undefined)
            setchapterList(<ChapterList mangaId={mangaId} mangaServerId={mangaInfoData?.mangaServerId} />);

        }, [mangaInfoData]);

    // useEffect(() => processMangaCards(), [mangaInfoData]);

    function componentDidMount() {
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
        let bodyData = {token: localStorage.getItem("token"),
        mangaId: mangaId}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.INFO}`, body);
        let data: MangaInfoData = await res.json();

        return data;
    }

    return(
        <>
        <h1 hidden>Informacion del manga {mangaInfoData?.title}</h1>
        <SharedInterface>
            <div className="row mx-3 mt-2 border border-secondary infoPage">
                <div className="col-12 col-lg-5 px-2 border border-secondary d-flex flex-column align-items-center position-relative">
                    <img src={mangaInfoData?.image} alt={`Portada de ${mangaInfoData?.title}`} style={{aspectRatio: "1/1.5"}}/>
                    <div className="row mangaInfo">
                        <h2 className="h1 my-3 text-center">{mangaInfoData?.title}</h2>
                        <TitleDataRow title="Guionistas" data={mangaInfoData?.authors}></TitleDataRow>
                        <TitleDataRow title="Artistas" data={mangaInfoData?.artists}></TitleDataRow>
                        <TitleDataRow title="Estado" data={mangaInfoData?.statusId}></TitleDataRow>
                        <TitleDataRow title="Tags" data={mangaInfoData?.tags}></TitleDataRow>
                        <TitleDataRow title="Actualizado" data={languageManager.dateToShortLangString(mangaInfoData?.lastUpdateChapterDateAdded)}></TitleDataRow>
                        <TitleDataRow title="Visitas" data={mangaInfoData?.views}></TitleDataRow>
                        <TitleDataRow title="Puntuacion" data={mangaInfoData?.score}></TitleDataRow>
                    </div>
                </div>
                <div className="col-12 col-lg-7 p-0 d-flex flex-column">
                    <div className="w-100 px-2 d-flex border border-secondary flex-column align-items-center">
                        <h3 className="my-2">Sinopsis</h3>
                        <p className="w-100" style={{maxWidth: "50em"}}>
                            {mangaInfoData?.sinopsis}
                        </p>
                    </div>
                    <div className="w-100 h-100 row px-2 m-0 border border-secondary d-flex flex-column align-items-center chapterList">
                        <div className="col-12 col-md-8 d-flex flex-column">
                            {chapterList}
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

function TitleDataRow(props: any){

    let data: string = props.data;

    if(Array.isArray(props.data)){
        data = props.data.join(", ");
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