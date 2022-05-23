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
            <div className="row">
                <div className="col-12 col-sm-6">
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    link="/a"/>
                </div>
                <div className="col-12 col-sm-6">
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    link="/a"/>
                </div>
                <div className="col-12 col-sm-6">
                <BriefInfoMangaCard title="a"
                                    img="a"
                                    link="/a"/>
                </div>
            </div>
        </SharedInterface>
        </>
    );
}