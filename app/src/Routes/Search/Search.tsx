import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MangaBriefInfoData } from "../../TypeScript/Classes/Manga/MangaInfoData";
import { BriefInfoMangaCard } from "../../WebComponents/Manga/MangaCard/MangaCard";
import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";
import configData from '../../config.json';

export default function Search(props: any) {
    const [searchParams] = useSearchParams();

    const [search] = useState<string | null>(searchParams.get("search"));

    const [searchResultsData, setSearchResultsData] = useState<MangaBriefInfoData[]>([]);

    const [searchResults, setSearchResults] = useState<JSX.Element[]>([]);

    useEffect(() => componentDidMount(), []);

    useEffect(() => {
                    if(searchResultsData.length > 0)
                        generateSearchResults()
                    }, [searchResultsData]);

    function componentDidMount() {
        if(search != null)
            getChapterImagesData();
    }

    async function getChapterImagesData() {
        setSearchResultsData(await fetchChapterImagesData());
    }

    async function fetchChapterImagesData(): Promise<MangaBriefInfoData[]>{
        let bodyData = {
                            token: localStorage.getItem("token"),
                            search: search
                        }

        let body = {
            method: 'POST',
            mode: "cors" as RequestMode,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData)
        }

        let res = await fetch(`${configData.API_URL}/${configData.ENDPOINTS.SEARCH_MANGA}`, body);
        let data: MangaBriefInfoData[] = await res.json();

        return data;
    }

    function generateSearchResults() {
        let newSearchResults : JSX.Element[] = [];

        for(let searchResultData of searchResultsData)
            newSearchResults.push(<>
                <div className="col-12 col-lg-6 p-2 d-flex" style={{height: "275px"}}>
                    <BriefInfoMangaCard href={`/Info/${searchResultData.mangaId}`}
                                        mangaId={searchResultData.mangaId}
                                        mangaServerId={searchResultData.mangaServerId}
                                        title={searchResultData.title}
                                        img={searchResultData.image}
                                        sinopsis={searchResultData.sinopsis}
                                        statusId={searchResultData.statusId}
                                        lastChapter={searchResultData.lastChapter}
                                        lastChapterDateAdded={searchResultData.lastChapterDateAdded} />
                </div>
            </>);
        
        setSearchResults(newSearchResults);
    }

    return(
        <>
        <SharedInterface>
            <div className="row m-0 p-2">
                {searchResults}
            </div>
        </SharedInterface>
        </>
    );
}