import { useState } from "react";
import './SectionTitle.css'

export default function SectionTitle(props: any) {
    const [title] = useState(props.title);
    const [link] = useState(props.href);

    return(<>
        <a href={link} className="sectionTitle d-block mx-auto text-black text-center bg-black text-white" style={{width: "70%"}}>
            <h2 className="m-0">{title}</h2>
        </a>
    </>);
}