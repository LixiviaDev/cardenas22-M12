import React from "react";
import { Languages } from "../Enums/Language.enum";

import es from '../Languages/es.json';
import en from '../Languages/en.json';
import ca from '../Languages/ca.json';

export class LanguageManager {
    protected static instance: LanguageManager;
    private es: object = es;
    private en: object = en;
    private ca: object = ca;

    private currentLanguage : string = localStorage.getItem("lang") ?? Languages.ES;

    private dateTimeFormatOptions : Intl.DateTimeFormatOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

    private constructor() { }

    public static getInstance(): LanguageManager {
        if (!LanguageManager.instance) {
            LanguageManager.instance = new LanguageManager();
        }

        return LanguageManager.instance;
    }

    public changeAppLanguage(newLanguage : Languages) : void {
        localStorage.setItem("lang", newLanguage);
        window.location.reload();
    }

    public initAppLanguage() : void {
        document.documentElement.lang = this.currentLanguage;
    }

    public get(path : string) : string {
        let pathEval = `this.${this.currentLanguage}.${path}`;

        return eval(pathEval);
    }

    public dateToLangString(dateString: string | undefined) : string{
        let date = new Date(dateString ?? "");
        return date.toLocaleDateString(this.currentLanguage, this.dateTimeFormatOptions);
    }

    public dateToShortLangString(dateString: string | undefined) : string{
        let date = new Date(dateString ?? "");
        return date.toLocaleString(this.currentLanguage, {year: 'numeric', month: 'numeric', day: 'numeric'});
    }
}