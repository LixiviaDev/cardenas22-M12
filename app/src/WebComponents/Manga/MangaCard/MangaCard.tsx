import { useState } from "react";
import './MangaCard.css';

export function HoverMangaCard(props: any) {
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);
    const [hoverDisabled] = useState(props.hoverDisabled ?? false);

    return(<>
        <a href={link} className={`mangaCard ${hoverDisabled ? "" : "hover"} w-100`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <div className="bg-white position-relative">
                <img src={img} 
                    className="w-100"
                    style={{boxShadow: "3px 3px 9px #0000005e"}}
                    alt={`portada de ${title}`} />
                <div className="mangaName position-absolute bottom-0 w-100 bg-white">
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-cente border-dark" style={{border: "2px solid", minHeight: "60px"}}>
                            <div className="text-dark text-center m-auto p-2">{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}

export function SimpleMangaCard(props: any) {
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);

    return(<>
        <a href={link} className={`mangaCard w-100`}>
            <div hidden>Click aqui para ver la informacion de {title}</div>
            <div className="bg-white">
                <img src={img} 
                    className="w-100"
                    alt={`portada de ${title}`} />
                <div className="mangaName bottom-0 w-100 bg-white">
                    <div className="w-100 h-100 p-2">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-cente border-dark" style={{border: "2px solid", minHeight: "60px"}}>
                            <div className="text-dark text-center m-auto p-2">{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}

export function BriefInfoMangaCard(props: any){
    const [title] = useState(props.title);
    const [img] = useState(props.img);
    const [link] = useState(props.href);

    const [description] = useState<string>(`The Jewel accidentally shatters into many bits which are dispersed across Japan when a beast from that age attempts to take the magical Shikon Jewel embodied in Kagome. and Kagome begin traveling to regain it before all the shards are found by the strong demon Naraku. Inuyasha and Kagome develop several allies throughout their journey, as Miroku, Shippo, Sango and Kirara. In sharp contrast to the usually comedic nature of much of the previous work of Takahashi, Inuyasha deals with subject matter that is darker, utilizing the setting of the Sengoku period to readily show the content that is violent.The narrative starts on the fifteenth birthday of Kagome Higurashi, a girl who lives with her mom, grandpa and little brother on the property of her family&apos;s hereditary Shinto shrine in Tokyo. When she goes to the good house to retrieve her cat, a centipede demon pulls the girl into it and bursts out of the enshrined Bone Eater&apos;s Well. The centipede demon is shown to have been after a magic jewel before being slain with a priestess named Kikyo, called the Shikon Jewel. Animated by the power in our time of the Shikon Jewel and mistaking her for Kikyo, the devil tries to kill the jewel to be gained by Kagome.The youth is shown by the nearby villagers to be , a half-dog demon who had been sealed by way of a perishing Kikyo fifty years back after being seemingly betrayed by her and trying to take the Shikon Jewel (which allows any wish the bearer want) to be able to be a full demon. After his dad&apos;s sword Tetsusaiga is gained by Inuyasha and is subdued by a charming necklace to keep him in line, he helps Kagome in coping with all the hazards they cause and gathering the shards.The two are joined in their own pursuit the somewhat revived Kikyo and from the young fox demon Shippo while coping with third parties groups like Inuyasha&apos;s older brother Sesshomaru, whose own version of what occurred years past brings the occasions into question. When joined a perverted monk whose bloodline is cursed, by Miroku, Kagome and Inuyasha learn the truth: the first disagreement between Kikyo and Inuyasha, disclosed to initially be fans, was due to a devious half-demon named Naraku. The developing Naraku is disclosed to have been born from your spirit of an evil guy named Onigumo inhabiting a body made within a pact by innumerable devils and who additionally put the hex on the family of Miroku. Sango, a devil slayer whose family was killed when her younger brother Kohaku fell under Naraku&apos;s control shortly joins after Inuyasha&apos;s group. Over time, Tetsusaiga abilities are enhanced by Inuyasha as he competes with Naraku&apos;s minion avatars like Kagura as well as the reanimated Band of Seven. The team of Inuyasha is broadly allied by Sesshomaru, Kikyo, as well as Koga who desires to avenge his comrades while flirting with Kagome was named by a wolf demon.While his heart is briefly removed by Naraku in the type of the Infant, who after tries to overthrow Naraku through his boat Moryomaru, Kohaku recovers his freewill and memories, as he tries to help out of remorse for indirectly killing his dad. With , matters settle throughout that time to empower his brother to its best capabilities to perfect Tetsusaiga. Eventually, Koga is made to stand on the sidelines, Kikyo posthumously uses the last of her capacity to give a second chance at life to Kohaku, and the Shikon Jewel is eventually reassembled by Naraku. The gem means to have so Naraku and she is going to be immobilized in battle for perpetuity, Kagome make a selfish wish. But for the Shikon Jewel, Kagome wishes with Inuyasha by her side to vanish. The actions, though, causes Kagome to go back together with the Well sealed to her time, inducing Inuyasha and her to lose contact for 3 years.Because point, the Sengoku period changes dramatically: Miroku and Sango have three kids together; Kohaku restarts his journey to be a devil slayer that is powerful as his company with Kirara; and the seventh position is attained by Shippo as a fox demon. Kagome returns to the Sengoku period where she becomes his wife and remains with .Other manga:`);

    return(<>
        <a href={link} className="w-100 h-100 bg-white border border-dark briefInfoMangaCard">
            <div className="bg-white h-100">
                <div hidden>Click aqui para ver la informacion de {title}</div>
                <div className="d-flex h-100">
                    <img className="d-block d-sm-none m-auto ms-2 border border-dark" style={{width: "120px", height: "160px"}} src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/5930/9781593074845.jpg" alt="a" />
                    <img className="d-none d-sm-block h-100" src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/5930/9781593074845.jpg" alt="a" />
                    <div className="w-100 h-100 p-2 d-flex flex-column text-black">
                        <div className="sectionTitle bg-black text-white p-2">
                            <h2 className="m-0" style={{fontSize: "1.20rem"}}>SERIAL EXPERIMENTS LAIN: NIGHTMARE OF FABRICATION</h2>
                        </div>
                        <a className="w-100 py-2 ps-1 pe-2 text-dark d-flex justify-content-between grayBorderBottom" href="/a" style={{fontSize: "small"}}>
                            <p className="m-0">Ch. 0</p>
                            <p className="m-0">2022/5/15</p>
                            <p className="m-0 d-none d-sm-block">Ongoing</p>
                        </a>
                        <div className="h-100 m-0 p-2 ps-0 text-truncate text-wrap" style={{maxHeight: "9em"}}>
                            <p  className="fw-bold m-0 pb-1" 
                                style={{fontSize: "16px", lineHeight: "normal"}}>
                                    Sinopsis:
                            </p>
                            <p  style={{fontSize: "14px", lineHeight: "normal"}}
                                dangerouslySetInnerHTML={{__html: description}}></p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}