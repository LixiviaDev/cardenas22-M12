import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { LanguageManager } from '../../../TypeScript/Managers/LanguageManager';
import configData from '../../../config.json';
import { Role } from "../../../TypeScript/Classes/Roles/Role";
import { MangaManagementData } from "../../../TypeScript/Classes/Manga/MangaInfoData";
import { BriefInfoMangaCard } from "../../Manga/MangaCard/MangaCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function MangaDataManagement() {
    const {mangaId} = useParams(); 
    
    const [mangaData, setMangaData] = useState<MangaManagementData>();
    const [mangaCard, setMangaCard] = useState<JSX.Element>();

    const [mangaCardRef] = useState<React.RefObject<JSX.Element>>(React.createRef());

    const [mangaTitle, setMangaTitle] = useState<string>("");
    const [mangaSinopsis, setMangaSinopsis] = useState<string>("");
    const [mangaWriters, setMangaWriters] = useState<string[]>([]);
    const [mangaArtists, setMangaArtists] = useState<string[]>([]);
    const [mangaState, setMangaState] = useState<string>("");
    const [mangaTags, setMangaTags] = useState<string[]>([]);

    const [mangaTitleInput] = useState<React.RefObject<HTMLInputElement>>(React.createRef());
    const [mangaSinopsisInput] = useState<React.RefObject<HTMLTextAreaElement>>(React.createRef());
    const [mangaWriterInput] = useState<React.RefObject<HTMLInputElement>>(React.createRef());
    const [mangaArtistInput] = useState<React.RefObject<HTMLInputElement>>(React.createRef());
    const [mangaStateInput] = useState<React.RefObject<HTMLSelectElement>>(React.createRef());
    const [mangaTagInput] = useState<React.RefObject<HTMLInputElement>>(React.createRef());

    const [writersList, setWritersList] = useState<JSX.Element[]>([]);
    const [artistsList, setArtistList] = useState<JSX.Element[]>([]);
    const [tagsList, setTagsList] = useState<JSX.Element[]>([]);

    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());
    
    useEffect(() => componentDidMount(), []);

    useEffect(() => {
        if(mangaData?.mangaId != null){
            setStateMangaData(mangaData);
        }
    }, [mangaData]);

    useEffect(() => {
        if(mangaTitle !== "")
            setMangaCard(<BriefInfoMangaCard    ref={mangaCardRef}
                                                href={`/Info/${mangaData?.mangaId}`}
                                                mangaId={mangaData?.mangaId}
                                                mangaServerId={mangaData?.mangaServerId}
                                                title={mangaTitle}
                                                img={mangaData?.image}
                                                sinopsis={mangaSinopsis}
                                                statusId={mangaState}
                                                lastChapter={mangaData?.lastChapter}
                                                lastChapterDateAdded={mangaData?.lastChapterDateAdded} />);
    }, [mangaTitle, mangaSinopsis, mangaState]);

    useEffect(() => {
        let newWritersList : JSX.Element[] = [];

        for(let writer of mangaWriters){
            newWritersList.push(<>
                <button className="btn btn-primary m-1" onClick={() => removeWriter(writer)}>
                    {writer}
                    <FontAwesomeIcon className="ms-2" icon={faXmark} />
                </button>
            </>);
        }

        setWritersList(newWritersList);
    }, [mangaWriters]);

    useEffect(() => {
        let newArtistList : JSX.Element[] = [];

        for(let artist of mangaArtists){
            newArtistList.push(<>
                <button className="btn btn-primary m-1" onClick={() => removeArtist(artist)}>
                    {artist}
                    <FontAwesomeIcon className="ms-2" icon={faXmark} />
                </button>
            </>);
        }

        setArtistList(newArtistList);
    }, [mangaArtists]);

    useEffect(() => {
        let newTagList : JSX.Element[] = [];

        for(let tag of mangaTags){
            newTagList.push(<>
                <button className="btn btn-primary m-1" onClick={() => removeTag(tag)}>
                    {tag}
                    <FontAwesomeIcon className="ms-2" icon={faXmark} />
                </button>
            </>);
        }

        setTagsList(newTagList);
    }, [mangaTags]);
    
    function componentDidMount() {
        getMangaData();
    }

    async function getMangaData(){
        setMangaData(await fetchManga());
    }

    function setStateMangaData(mangaData: MangaManagementData) {
        setMangaTitle(mangaData.title);
        setMangaSinopsis(mangaData.sinopsis);
        setMangaWriters(mangaData.authors ?? []);
        setMangaArtists(mangaData.artists ?? []);
        setMangaState(mangaData.statusId);
        setMangaTags(mangaData.tags ?? []);
    }

    async function fetchManga() : Promise<MangaManagementData>{
        let mangasData : MangaManagementData = new MangaManagementData({} as MangaManagementData);

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId}

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }
        try
        {
            let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.GET_MANGA_MANAGEMENT_DATA}`, body);

            mangasData = await res.json();
        }
        catch(ex)
        {
            console.error(ex);
        }

        return mangasData;
    }

    return(<>
        <div className="row">
            <div className="col-12 w-100 d-flex flex-column align-items-center">
                <h1>{languageManager.get("AdminPanel.NAV.MANAGE_MANGAS")}</h1>
            </div>
            <div className="col-12 w-100 d-flex flex-column align-items-center">
                {mangaCard}
            </div>
            <div className="col-12 d-flex flex-column align-items-center">
                <div className="row w-100 my-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 ps-0 pe-0 pe-lg-3">
                                        <label htmlFor="mangaTitle" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.TITLE_INPUT_LABEL")}</label>
                                    </div>
                                    <div className="col-12 ps-0 pe-0 pe-lg-3 d-flex">
                                        <input  className="form-control" 
                                            type="text" 
                                            name="mangaTitle"
                                            defaultValue={mangaTitle} 
                                            ref={mangaTitleInput}
                                            style={{borderRadius: 0}} />
                                        <button className="btn btn-primary" 
                                                onClick={changeMangaTitle}
                                                style={{borderRadius: 0}} >
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 m-0">
                                <div className="row">
                                    <div className="col-12 pe-0">
                                        <label htmlFor="mangaState" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.STATE_INPUT_LABEL")}</label>
                                    </div>
                                    <div className="col-12 pe-0 d-flex">
                                        <select ref={mangaStateInput}
                                                onChange={changeMangaState}
                                                className="form-select"
                                                name="mangaState"
                                                defaultValue={mangaState}
                                                style={{borderRadius: 0}} >
                                            <option value="-1" hidden selected>Select a state</option>
                                            <option value="0">Ongoing</option>
                                            <option value="1">Finished</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row w-100 my-2">
                    <div className="col-12 px-0">
                        <label htmlFor="mangaSinopsis" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.SINOPSIS_INPUT_LABEL")}</label>
                    </div>
                    <div className="col-12 px-0">
                        <textarea   ref={mangaSinopsisInput}
                                    className="form-control" 
                                    name="mangaSinopsis"
                                    defaultValue={mangaSinopsis} 
                                    style={{borderRadius: 0}} />
                    </div>
                    <div className="col-12 my-2 px-0 text-end">
                        <button className="btn btn-primary" 
                                onClick={changeMangaSinopsis}
                                style={{borderRadius: 0}} >
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                        </button>
                    </div>
                </div>

                <div className="row w-100 my-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 ps-0 pe-0 pe-lg-3">
                                        <label htmlFor="mangaWriter" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.ADD_WRITER_INPUT_LABEL")}</label>
                                    </div>
                                    <div className="col-12 ps-0 pe-0 pe-lg-3 d-flex">
                                        <input  ref={mangaWriterInput}
                                                className="form-control" 
                                                type="text" 
                                                name="mangaWriter"
                                                placeholder={languageManager.get("AdminPanel.MANAGE_MANGA.ADD_WRITER_INPUT_PLACEHOLDER")}
                                                style={{borderRadius: 0}} />
                                        <button className="btn btn-primary" 
                                                onClick={addWriter}
                                                style={{borderRadius: 0}} >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="col-12 ps-0 pe-0 pe-lg-3 d-flex flex-wrap">
                                        {writersList}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 ps-0 ps-lg-3 pe-0">
                                        <label htmlFor="mangaArtist" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.ADD_ARTIST_INPUT_LABEL")}</label>
                                    </div>
                                    <div className="col-12 ps-0 ps-lg-3 pe-0 d-flex">
                                        <input  ref={mangaArtistInput}
                                                className="form-control" 
                                                type="text" 
                                                name="mangaArtist"
                                                placeholder={languageManager.get("AdminPanel.MANAGE_MANGA.ADD_ARTIST_INPUT_PLACEHOLDER")}
                                                style={{borderRadius: 0}} />
                                        <button className="btn btn-primary" 
                                                onClick={addArtist}
                                                style={{borderRadius: 0}} >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="col-12 ps-0 ps-lg-3 pe-0 d-flex flex-wrap">
                                        {artistsList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row w-100 my-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div className="col-12 ps-0 pe-0 pe-lg-3">
                                        <label htmlFor="mangaTag" className="fs-3">{languageManager.get("AdminPanel.MANAGE_MANGA.ADD_TAG_INPUT_LABEL")}</label>
                                    </div>
                                    <div className="col-12 ps-0 pe-0 pe-lg-3 d-flex">
                                        <input  ref={mangaTagInput}
                                                className="form-control" 
                                                type="text" 
                                                name="mangaTag"
                                                placeholder={languageManager.get("AdminPanel.MANAGE_MANGA.ADD_TAG_INPUT_PLACEHOLDER")}
                                                style={{borderRadius: 0}} />
                                        <button className="btn btn-primary" 
                                                onClick={addTag}
                                                style={{borderRadius: 0}} >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="col-12 ps-0 pe-0 pe-lg-3 d-flex flex-wrap">
                                        {tagsList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

    function changeMangaTitle() { 
        let newTitle = mangaTitleInput.current?.value ?? "";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        title: newTitle}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHANGE_MANGA_TITLE}`, body);

        setMangaTitle(newTitle);
    }

    function changeMangaSinopsis() {
        let newSinopsis = mangaSinopsisInput.current?.value ?? "";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        mangaServerId: mangaData?.mangaServerId,
                        sinopsis: newSinopsis}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHANGE_MANGA_SINOPSIS}`, body);

        setMangaSinopsis(newSinopsis);
    }

    function changeMangaState() {
        let newState = mangaStateInput.current?.value ?? "0";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        mangaServerId: mangaData?.mangaServerId,
                        state: newState}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.CHANGE_MANGA_STATE}`, body);

        setMangaState(newState);
    }

    function addWriter() {
        let newWriter = mangaWriterInput.current?.value ?? "";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        name: newWriter}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.ADD_MANGA_WRITER}`, body);

        setMangaWriters([...mangaWriters, newWriter]);
    }

    function removeWriter(writer: string) {
        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        name: writer}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.REMOVE_MANGA_WRITER}`, body);

        setMangaWriters(mangaWriters.filter(x => x !== writer));
    }

    function addArtist() {
        let newArtist = mangaArtistInput.current?.value ?? "";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        name: newArtist}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.ADD_MANGA_ARTIST}`, body);

        setMangaArtists([...mangaArtists, newArtist]);
    }

    function removeArtist(artist: string) {
        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        name: artist}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.REMOVE_MANGA_ARTIST}`, body);

        setMangaArtists(mangaArtists.filter(x => x !== artist));
    }

    function addTag() {
        let newTag = mangaTagInput.current?.value ?? "";

        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        tagId: newTag}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.ADD_MANGA_TAG}`, body);

        setMangaTags([...mangaTags, newTag]);
    }

    function removeTag(tag: string) {
        let bodyData = {token: localStorage.getItem("token"),
                        mangaId: mangaId,
                        tagId: tag}

        let body = {
        method: 'POST',
        mode: "cors" as RequestMode,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyData)
        }

        fetch(`${configData.API_URL}/${configData.ENDPOINTS.REMOVE_MANGA_TAG}`, body);

        setMangaTags(mangaTags.filter(x => x !== tag));
    }
}