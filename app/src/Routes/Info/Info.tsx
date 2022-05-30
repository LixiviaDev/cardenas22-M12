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
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    
    useEffect(() => componentDidMount(), []);
    
    useEffect(() => {

        if(mangaInfoData?.mangaServerId != undefined)
            setchapterList(<ChapterList mangaId={mangaId} mangaServerId={mangaInfoData?.mangaServerId} />);

        }, [mangaInfoData]);

    function componentDidMount() {
        isUserAdmin()

        generateMangaInfoData();
    }

    async function generateMangaInfoData()
    {
        let newMangaInfoData = await getMangaInfoData();

        setMangaInfoData(newMangaInfoData);

        // The hook of mangaCardsData
    }async function isUserAdmin() {
        let isAdmin = false;

        try
        {
            let bodyData = {
                token: localStorage.getItem("token")
            }

            let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
            }

            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.IS_ADMIN}`, body);
            let data: any = await res.json();

            isAdmin = data?.isAdmin;
        }
        catch(ex)
        {
            console.error(ex);
        }

        setIsAdmin(isAdmin);
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
            <div className="row mx-3 mt-2 infoPage p-3">
                <div className="col-12 col-lg-5 col-xl-4 p-3 mangaCover border border-secondary d-flex flex-column align-items-center position-relative">
                    <div className="w-100 p-0" style={{height: "60%"}}>
                        <div className="border border-dark h-100 text-center" style={{backgroundColor: "var(--bs-white)"}}>
                            <img className="h-100" src={mangaInfoData?.image} alt={`Portada de ${mangaInfoData?.title}`} style={{aspectRatio: "1/1.5", maxWidth: "100%"}}/>
                        </div>
                    </div>
                    <div className="row mangaInfo w-100">
                        {
                            isAdmin
                            ?
                            <div className="w-100 py-3 px-0">
                                <a  className="d-block py-2 px-3 border bg-black text-white sectionTitle"
                                    href={`/AdminPanel/ManageMangas/${mangaId}`}>
                                    <h2 className="h1 my-3 text-center">{mangaInfoData?.title}</h2>
                                </a>
                            </div>
                            :
                            <div className="w-100 py-3 px-0">
                                <div  className="py-2 px-3 border bg-black text-white sectionTitle">
                                    <h2 className="h1 my-3 text-center">{mangaInfoData?.title}</h2>
                                </div>
                            </div>
                        }
                        <TitleDataRow title="Guionistas" data={mangaInfoData?.authors}></TitleDataRow>
                        <TitleDataRow title="Artistas" data={mangaInfoData?.artists}></TitleDataRow>
                        <TitleDataRow title="Estado" data={mangaInfoData?.statusId}></TitleDataRow>
                        <TitleDataRow title="Tags" data={mangaInfoData?.tags}></TitleDataRow>
                        <TitleDataRow title="Actualizado" data={languageManager.dateToShortLangString(mangaInfoData?.lastUpdateChapterDateAdded)}></TitleDataRow>
                        <TitleDataRow title="Visitas" data={mangaInfoData?.views}></TitleDataRow>
                        <TitleDataRow title="Puntuacion" data={mangaInfoData?.score}></TitleDataRow>
                    </div>
                </div>
                <div className="col-12 col-lg-7 col-xl-8 p-0 pt-3 pt-lg-0 ps-lg-3">
                    <div className="d-flex flex-column h-100">
                        <div className="w-100 p-3 mb-3 bg-white d-flex border border-secondary flex-column align-items-center">
                            <div className="sectionTitle bg-black text-white" style={{width: "16em"}}>
                                <h3 className="my-2">Sinopsis</h3>
                            </div>
                            <p className="w-100 m-0 mt-3 pe-1" style={{maxWidth: "50em", maxHeight: "13em", overflow: "auto"}}>
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
        <div className="col-12 p-0 d-flex flex-row">
            <h3 className="h6 mb-2 me-1 fw-bold">{props.title}:</h3>
            <p className="m-0">{data}</p>
        </div>
        </>
    );
}