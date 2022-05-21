import { useState } from "react";
import './SectionTitle.css'

export default function SectionTitle(props: any) {
    const [title] = useState(props.title);
    const [link] = useState(props.href);

    return(<>
        <a href={link} className="sectionTitle d-block w-100 text-black text-center">
            <h2 className="m-0">{title}</h2>
        </a>
    </>);
}