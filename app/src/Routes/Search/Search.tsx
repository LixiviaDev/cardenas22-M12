import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BriefInfoMangaCard } from "../../WebComponents/Manga/MangaCard/MangaCard";
import SharedInterface from "../../WebComponents/SharedInterface/SharedInterface";

export default function Search(props: any) {
    const [searchParams] = useSearchParams();

    const [search] = useState<string | null>(searchParams.get("search"));

    return(
        <>
        <SharedInterface>
            <div className="row m-0 p-2">
                <div className="col-12 col-lg-6 p-2 d-flex" style={{height: "275px"}}>
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    href="/a"/>
                </div>
                <div className="col-12 col-lg-6 p-2 d-flex" style={{height: "275px"}}>
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    href="/a"/>
                </div>
                <div className="col-12 col-lg-6 p-2 d-flex" style={{height: "275px"}}>
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    href="/a"/>
                </div>
            </div>
        </SharedInterface>
        </>
    );
}