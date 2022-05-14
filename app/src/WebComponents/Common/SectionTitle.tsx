import { useState } from "react";

export default function SectionTitle(props: any) {
    const [title] = useState(props.title);
    const [link] = useState(props.href);

    return(<>
        <a href={link} className="d-block w-100">
            <h2>{title}</h2>
        </a>
    </>);
}